import { stateValue } from "./state-value.js";
import { cardTemplate, mountCard, escapeHtml, problemNotes, resolveNotes } from "./card-ui.js";
import { problemBadges } from "../problems/meta.js";
/** 选择与撤销是独立步骤；path 和调用栈来自不可变快照，回看不受后续 pop 影响。 */
export function backtrackingCard({
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
			'<p id="sample-note" class="hash-caption"></p><p>候选项（标注“已选”表示当前路径使用）</p><div id="choices" class="array-row"></div><p>path：当前路径</p><div id="path" class="array-row"></div><p id="calls" class="hash-caption"></p><p id="answers" class="hash-caption"></p><p id="result" class="hash-caption"></p>',
	});
	return {
		template,
		mount(root, signal) {
			return mountCard(root, signal, {
				id: problemId,
				codes,
				examples,
				buildTrace,
				formatExample: (e) =>
					`${e.label} · ${JSON.stringify(e.nums ?? e.candidates ?? e.input ?? e.digits ?? e.s ?? e.n)}${e.target !== undefined ? ` · target=${e.target}` : ""}`,
				getVariables: (s) =>
					variables.map(([name, label]) => ({
						name,
						label,
						value: stateValue(s, name),
						wide: typeof s[name] === "object" && s[name] !== null,
					})),
				renderAnimation(root, s, e) {
					root.getElementById("sample-note").textContent = e.note;
					root.getElementById("choices").innerHTML = (s.candidates ?? [])
						.map(
							(v, i) =>
								`<div class="array-item${i === s.i ? " current" : s.used?.[i] ? " answer" : ""}"><small>${i}${s.used?.[i] ? " · 已选" : ""}${i === s.i ? " · 当前" : ""}</small><div class="array-value">${escapeHtml(v)}</div></div>`,
						)
						.join("");
					root.getElementById("path").innerHTML =
						s.path
							.map(
								(v, i) =>
									`<div class="array-item"><small>${i}</small><div class="array-value">${escapeHtml(v)}</div></div>`,
							)
							.join("") || "空路径 []";
					root.getElementById("calls").textContent =
						`递归调用栈（底 → 顶）：${JSON.stringify(s.calls ?? [])}`;
					root.getElementById("answers").textContent =
						`已保存的独立结果：${JSON.stringify(s.answer)}`;
					root.getElementById("result").textContent = s.final
						? `最终结果：${JSON.stringify(s.answer)}`
						: "";
				},
			});
		},
	};
}
