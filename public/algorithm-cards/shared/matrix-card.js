import { terminalValue } from "./monitor-terminal.js";
import { sampleBounds, reserveSample } from "./sample-layout.js";
import { stateValue } from "./state-value.js";
import { cardTemplate, mountCard, escapeHtml, problemNotes, resolveNotes } from "./card-ui.js";
import { problemBadges } from "../problems/meta.js";
/** 网格只负责显示坐标。当前格、依赖格、访问路径由各题的真实轨迹指定。 */
export function matrixCard({
	title,
	description,
	idea,
	notes,
	time = "O(n)",
	space = "O(n)",
	codes,
	examples,
	buildTrace,
	variables,
}) {
	const problemId = String(title).match(/^\s*(\d+)/)?.[1];
	const problem = `<div class="problem"><div class="title"><h2>${escapeHtml(title)}</h2>${problemBadges(title)}</div><p>${escapeHtml(description)}</p>${problemNotes(resolveNotes(title, notes, `目标复杂度：时间 ${time}，空间 ${space}。`))}</div>`;
	const template = cardTemplate({
		problem,
		thought: idea,
		time,
		space,
		animation:
			'<p id="sample-note" class="hash-caption"></p><div id="grid" style="overflow:auto"></div><p id="dp-title" class="hash-caption"></p><div id="dp-grid" style="overflow:auto"></div><p id="result" class="hash-caption"></p><p class="legend">紫框与“当前”：本次操作　蓝框与“依赖”：读取的状态　绿色与“已处理”：已访问格</p>',
	});
	const grid = (values, s) =>
		`${s.matrixRowIndices ? "<p>大网格仅显示当前相关行列；跳号处有省略，坐标保持原编号。</p>" : ""}<table style="border-collapse:separate;border-spacing:5px;margin:0"><thead><tr><th></th>${Array.from({ length: Math.max(0, ...values.map((row) => row.length)) }, (_, c) => `<th>${s.matrixColumnIndices?.[c] ?? c} ${escapeHtml(s.columnLabels?.[s.matrixColumnIndices?.[c] ?? c] ?? "")}</th>`).join("")}</tr></thead><tbody>${values
			.map((row, ri) => {
				const r = s.matrixRowIndices?.[ri] ?? ri;
				return `<tr><th>${r} ${escapeHtml(s.rowLabels?.[r] ?? "")}</th>${row
					.map((v, ci) => {
						const c = s.matrixColumnIndices?.[ci] ?? ci,
							current = s.current?.[0] === r && s.current?.[1] === c,
							dependency = (s.dependencies ?? []).some(
								(p) => p[0] === r && p[1] === c,
							),
							visited = (s.visited ?? []).some((p) => p[0] === r && p[1] === c);
						return `<td style="min-width:40px;padding:7px;text-align:center;border:2px solid ${current ? "var(--primary)" : dependency ? "#78b9ec" : visited ? "#65b98c" : "#8b94a344"};border-radius:7px"><small style="display:block;font-size:10px">${current ? "当前" : dependency ? "依赖" : visited ? escapeHtml(s.visitedLabel ?? "已处理") : ""}</small>${escapeHtml(v === null ? "—" : v)}</td>`;
					})
					.join("")}</tr>`;
			})
			.join("")}</tbody></table>`;
	return {
		template,
		mount(root, signal) {
			return mountCard(root, signal, {
				id: problemId,
				codes,
				examples,
				buildTrace,
				prepareAnimation(root, steps) {
					return reserveSample(root, sampleBounds(steps), { grids: { grid: "matrix", "dp-grid": "dp" }, texts: { stage: "text", result: "answer", "dp-title": 70 } });
				},
				formatExample: (e) =>
					`${e.label} · ${JSON.stringify(e.matrix ?? e.grid ?? e.board ?? e.input ?? [e.m, e.n])}${e.target !== undefined ? ` · target=${e.target}` : ""}`,
				getVariables: (s) =>
					variables.map(([name, label]) => ({
						name,
						label,
						value: stateValue(s, name),
						wide: typeof s[name] === "object" && s[name] !== null,
					})),
				renderAnimation(root, s, e) {
					root.getElementById("sample-note").textContent = e.note;
					root.getElementById("grid").innerHTML = grid(s.matrix, s);
					root.getElementById("dp-title").textContent = s.dp
						? "dp：到达当前格的最小和；已处理标记区分初始的 0 与真实结果"
						: "";
					root.getElementById("dp-grid").innerHTML = s.dp ? grid(s.dp, s) : "";
					root.getElementById("result").textContent =
						s.final || s.line === "result"
							? `最终结果：${terminalValue(s.answer)}`
							: Array.isArray(s.answer)
								? `当前结果：${terminalValue(s.answer)}${s.answerOmitted ? `（另省略 ${s.answerOmitted} 项）` : ""}`
								: "";
				},
			});
		},
	};
}
