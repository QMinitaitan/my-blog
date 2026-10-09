import { sampleBounds, reserveSample } from "./sample-layout.js";
import { stateValue } from "./state-value.js";
import { cardTemplate, mountCard, escapeHtml, problemNotes, resolveNotes } from "./card-ui.js";
import { problemBadges } from "../problems/meta.js";

/** 保存不可变教学状态；算法本身留在题目模块，不由公共 UI 判断题号。 */
export function recorder() {
	const steps = [];
	const nodeCache = new WeakMap();
	return {
		steps,
		push(line, text, state) {
			// 大表只保存当前操作附近的展示快照；算法仍使用完整数组继续计算。
			// 原下标单独保留，省略格不会被错误地重新编号。
			let snapshot = state;
			if (state.vertices?.length > 64) {
				const active = [
					state.current,
					...(state.edge ?? []),
					state.queue?.[0],
					state.queue?.at(-1),
				].filter((id) => id !== null && id !== undefined);
				const vertices = [
					...new Set([state.vertices[0], state.vertices.at(-1), ...active]),
				];
				const edges = state.edges.filter(
					([a, b]) => vertices.includes(a) && vertices.includes(b),
				);
				snapshot = {
					...snapshot,
					vertices,
					vertexLength: state.vertices.length,
					edges,
					edgesOmitted: state.edges.length - edges.length,
					indegree: Object.fromEntries(
						vertices.map((id) => [id, state.indegree[id]]),
					),
					completedNodes: state.completedNodes?.filter((id) =>
						vertices.includes(id),
					),
				};
			}
			if (state.nodes?.length > 64) {
				let positions = nodeCache.get(state.nodes);
				if (!positions || positions.size !== state.nodes.length) {
					positions = new Map(state.nodes.map((n, i) => [n.id, i]));
					nodeCache.set(state.nodes, positions);
				}
				const active = Object.values(state.pointers ?? {}).filter((id) =>
					positions.has(id),
				);
				const related = active
					.flatMap((id) => {
						const index = positions.get(id),
							next = state.nodes[index].next;
						return [index - 1, index, index + 1, positions.get(next)];
					})
					.filter(
						(i) => Number.isInteger(i) && i >= 0 && i < state.nodes.length,
					);
				const indices = [
					...new Set([0, state.nodes.length - 1, ...related]),
				].sort((a, b) => a - b);
				snapshot = {
					...snapshot,
					nodes: indices.map((i) => state.nodes[i]),
					nodeLength: state.nodes.length,
				};
			}
			if (
				state.matrix?.length &&
				state.matrix.length * state.matrix[0].length > 64
			) {
				const focus = [state.current, ...(state.dependencies ?? [])].filter(
					Boolean,
				);
				const window = (length, axis) =>
					[
						...new Set([
							0,
							length - 1,
							...focus
								.flatMap((p) => [p[axis] - 1, p[axis], p[axis] + 1])
								.filter((i) => i >= 0 && i < length),
						]),
					].sort((a, b) => a - b);
				const rows = window(state.matrix.length, 0),
					columns = window(state.matrix[0].length, 1);
				const compact = (grid) =>
					rows.map((r) => columns.map((c) => grid[r][c]));
				snapshot = {
					...snapshot,
					matrixRowIndices: rows,
					matrixColumnIndices: columns,
					matrix: compact(state.matrix),
				};
				if (state.dp) snapshot.dp = compact(state.dp);
				if (state.rowLabels)
					snapshot.rowLabels = Object.fromEntries(
						rows.map((r) => [r, state.rowLabels[r]]),
					);
				if (state.columnLabels)
					snapshot.columnLabels = Object.fromEntries(
						columns.map((c) => [c, state.columnLabels[c]]),
					);
				if (state.visited)
					snapshot.visited = state.visited.filter(
						([r, c]) => rows.includes(r) && columns.includes(c),
					);
			}
			if (state.values?.length > 64) {
				const length = state.values.length;
				const focus = Object.values(state.pointers ?? {}).filter(
					(i) => Number.isInteger(i) && i >= 0 && i < length,
				);
				const indices = [
					...new Set([
						0,
						length - 1,
						...focus
							.flatMap((i) => [i - 1, i, i + 1])
							.filter((i) => i >= 0 && i < length),
					]),
				].sort((a, b) => a - b);
				snapshot = {
					...snapshot,
					valueIndices: indices,
					valueLength: length,
					values: indices.map((i) => state.values[i]),
				};
				if (state.auxiliary?.length > 64)
					snapshot.auxiliary = indices.map((i) => state.auxiliary[i]);
				if (state.waterLevels?.length === length)
					snapshot.waterLevels = indices.map((i) => state.waterLevels[i]);
				if (state.completed)
					snapshot.completed = indices.filter((i) =>
						state.completed.includes(i),
					);
			}
			for (const name of ["stack", "queue"])
				if (Array.isArray(snapshot[name]) && snapshot[name].length > 64) {
					const values = snapshot[name];
					snapshot = {
						...snapshot,
						[name]: [...values.slice(0, 4), ...values.slice(-4)],
						[`${name}Omitted`]: values.length - 8,
					};
				}
			// 结果或监控列表也只保留相关窗口；结束状态仍保存完整真实答案。
			if (
				Array.isArray(snapshot.answer) &&
				snapshot.answer.length > 64 &&
				!state.final &&
				state.line !== "result" &&
				line !== "result"
			)
				snapshot = {
					...snapshot,
					answer: snapshot.answer.slice(0, 8),
					answerOmitted: state.answer.length - 8,
				};
			steps.push(structuredClone({ line, stage: text, text, ...snapshot }));
		},
	};
}

/** 数组题共用索引布局，指针、区间与答案由题目明确提供。 */
export function sequenceCard({
	title,
	difficulty = "中等",
	description,
	idea,
	notes,
	time = "O(n)",
	space = "O(n)",
	codes,
	examples,
	buildTrace,
	variables,
	display = "array",
}) {
	const problemId = String(title).match(/^\s*(\d+)/)?.[1];
	const problem = `<div class="problem"><div class="title"><h2>${escapeHtml(title)}</h2>${problemBadges(title) || `<span class="badge">${escapeHtml(difficulty)}</span>`}</div><p>${escapeHtml(description)}</p>${problemNotes(resolveNotes(title, notes, `目标复杂度：时间 ${time}，空间 ${space}。`))}</div>`;
	const template = cardTemplate({
		problem,
		thought: idea,
		time,
		space,
		animation:
			'<p id="sample-note" class="hash-caption"></p><div id="sequence" class="array-row"></div><p id="auxiliary-title" class="hash-caption"></p><div id="auxiliary" class="array-row"></div><div id="extra" class="hash-caption"></div><p id="result" class="hash-caption"></p><p class="legend">紫框与标签：当前操作　绿框：已完成或答案　下标：数组位置</p>',
	});
	return {
		template,
		mount(root, signal) {
			let layoutBounds;
			return mountCard(root, signal, {
				id: problemId,
				codes,
				examples,
				buildTrace,
				prepareAnimation(root, steps) {
					const bounds = layoutBounds = sampleBounds(steps);
					return reserveSample(root, bounds, { rows: { sequence: { count: Math.min(24, bounds.rows.values ?? 0), rowHeight: display === "bars" ? 218 : 88 }, auxiliary: Math.min(24, bounds.rows.auxiliary ?? 0), extra: { count: (bounds.rows.stack ?? 0) + (bounds.rows.bucketEntries ?? 0), extraHeight: (bounds.rows.stack && bounds.rows.bucketEntries) ? 268 : (bounds.rows.stack || bounds.rows.bucketEntries) ? 180 : 0, textCharacters: (bounds.textCharacters.visualNote ?? 0) + (steps.some(s => s.answerOmitted) ? 90 : 0) } }, texts: { stage: "text", result: "answer", "auxiliary-title": 30 } });
				},
				formatExample: (e) =>
					`${e.label} · ${JSON.stringify(e.nums ?? e.height ?? e.input)}${e.target !== undefined ? ` · target = ${e.target}` : ""}${e.k !== undefined ? ` · k = ${e.k}` : ""}${e.amount !== undefined ? ` · amount = ${e.amount}` : ""}`,
				getVariables: (s) =>
					variables
						.filter(([, , phases]) => !phases || phases.includes(s.line))
						.map(([name, label]) => ({
							name,
							label,
							value: stateValue(s, name),
							wide: typeof s[name] === "object" && s[name] !== null,
						})),
				renderAnimation(root, s, e) {
					root.getElementById("sample-note").textContent = e.note;
					const values = s.values;
					const valueLength = s.valueLength ?? values.length;
					const at = (index) =>
						s.valueIndices
							? values[s.valueIndices.indexOf(index)]
							: values[index];
					const auxiliaryAt = (index) =>
						s.valueIndices
							? s.auxiliary?.[s.valueIndices.indexOf(index)]
							: s.auxiliary?.[index];
					const waterAt = (index) =>
						s.valueIndices
							? s.waterLevels?.[s.valueIndices.indexOf(index)]
							: s.waterLevels?.[index];
					const active = s.pointers ?? {};
					const scale = 110 / layoutBounds.maxValue;
					const focus = Object.values(active).filter(
						(i) => Number.isInteger(i) && i >= 0 && i < valueLength,
					);
					const indices =
						s.valueIndices ??
						(values.length <= 16
							? values.map((_, i) => i)
							: [
									...new Set([
										0,
										valueLength - 1,
										...focus
											.flatMap((i) => [i - 1, i, i + 1])
											.filter((i) => i >= 0 && i < valueLength),
									]),
								].sort((a, b) => a - b));
					root.getElementById("sequence").innerHTML =
						indices
							.map((i, p) => {
								const labels = Object.entries(active)
									.filter(([, v]) => v === i)
									.map(([k]) => k);
								const done =
									s.completed?.includes(i) ||
									(s.completedRange &&
										i >= s.completedRange[0] &&
										i < s.completedRange[1]);
								const bar =
									display === "bars"
										? `<div style="height:130px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center"><div style="width:28px;height:${(waterAt(i) ?? 0) * scale}px;background:#78b9ec88;border-top:1px solid #78b9ec">${waterAt(i) > 0 ? `<small>${waterAt(i)} 水</small>` : ""}</div><div style="width:28px;height:${at(i) * scale}px;background:${labels.length ? "var(--primary)" : "#8a93a9"};border-radius:3px 3px 0 0"></div></div>`
										: "";
								const inWindow =
									s.window && i >= s.window[0] && i <= s.window[1];
								return `${p && i > indices[p - 1] + 1 ? "<span>… 省略</span>" : ""}<div class="array-item${labels.length ? " current" : done ? " answer" : ""}"${inWindow ? ' style="border-bottom:2px solid #78b9ec;padding-bottom:4px"' : ""}><small>${i}${labels.length ? ` · ${escapeHtml(labels.join("/"))}` : done ? " · 完成" : ""}</small>${bar}<div class="array-value">${escapeHtml(at(i))}</div></div>`;
							})
							.join("") || "<span>空数组</span>";
					root.getElementById("auxiliary-title").textContent =
						s.auxiliaryName ?? "";
					root.getElementById("auxiliary").innerHTML = s.auxiliary
						? indices
								.filter((i) => auxiliaryAt(i) !== undefined)
								.map(
									(i, p) =>
										`${p && i > indices[p - 1] + 1 ? "<span>… 省略</span>" : ""}<div class="array-item${i === s.i ? " current" : ""}"><small>${i}</small><div class="array-value">${escapeHtml(auxiliaryAt(i) ?? "—")}</div></div>`,
								)
								.join("")
						: "";
					root.getElementById("extra").innerHTML =
						`${escapeHtml(s.visualNote ?? "")}${s.answerOmitted ? `<p>当前结果只展示前 8 项，省略 ${s.answerOmitted} 项；结束时显示完整答案。</p>` : ""}${s.stack ? `<div class="array-row" aria-label="栈从底到顶">${s.stack.map((value, i) => `${s.stackOmitted && i === 4 ? `<span>… 省略 ${s.stackOmitted} 项</span>` : ""}<div class="array-item${i === s.stack.length - 1 ? " current" : ""}"><small>${i === s.stack.length - 1 ? "栈顶" : "栈底 →"}</small><div class="array-value">${escapeHtml(typeof value === "object" ? JSON.stringify(value) : value)}</div></div>`).join("") || "<span>空栈</span>"}</div>` : ""}`;
					if (s.bucketEntries)
						root.getElementById("extra").innerHTML +=
							`<p>频率桶（空桶省略，紫框为当前桶）${s.bucketEntriesOmitted ? `，另 ${s.bucketEntriesOmitted} 个非空桶省略` : ""}</p><div class="array-row">${s.bucketEntries.map((b) => `<div class="array-item${b.frequency === s.frequency ? " current" : ""}"><small>频率 ${b.frequency}</small><div class="array-value">${escapeHtml(JSON.stringify(b.items))}${b.omitted ? ` …另 ${b.omitted} 项` : ""}</div></div>`).join("")}</div>`;
					root.getElementById("result").textContent =
						s.line === "result" || s.final
							? `最终结果：${JSON.stringify(s.answer)}`
							: "";
				},
			});
		},
	};
}
