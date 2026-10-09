import { sampleBounds, reserveSample } from "./sample-layout.js";
import { stateValue } from "./state-value.js";
import { cardTemplate, mountCard, escapeHtml, problemNotes, resolveNotes } from "./card-ui.js";
import { problemBadges } from "../problems/meta.js";
/** 有向图视图不执行算法；边、入度和待处理队列均由题目快照提供。 */
export function graphCard({
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
			'<p id="sample-note" class="hash-caption"></p><div id="graph" style="overflow:auto"></div><p id="queue" class="hash-caption"></p><p id="result" class="hash-caption"></p><p class="legend">紫框：当前课程　绿框与“已修”：已处理课程　入度：仍需完成的先修数量</p>',
	});
	return {
		template,
		mount(root, signal) {
			let graphHeight, anchors;
			return mountCard(root, signal, {
				id: problemId,
				codes,
				examples,
				buildTrace,
				prepareAnimation(root, steps) {
					const max = Math.max(...steps.map(s => s.vertices.length));
					graphHeight = Math.ceil(max / 4) * 100 + 55;
					const vertices = steps.find(s => s.vertices.length === max).vertices;
					anchors = new Map(vertices.map((id, i) => [id, { x: 60 + (i % 4) * 110, y: 50 + Math.floor(i / 4) * 100 }]));
					root.getElementById("graph").style.minHeight = `${graphHeight}px`;
					return reserveSample(root, sampleBounds(steps), { texts: { stage: "text", queue: "queue", result: "answer" } });
				},
				formatExample: (e) =>
					`${e.label} · numCourses=${e.numCourses} · prerequisites=${JSON.stringify(e.prerequisites)}`,
				getVariables: (s) =>
					variables.map(([name, label]) => ({
						name,
						label,
						value: stateValue(s, name),
						wide: typeof s[name] === "object" && s[name] !== null,
					})),
				renderAnimation(root, s, e) {
					root.getElementById("sample-note").textContent = e.note;
					const positions = new Map(
						s.vertices.map((id, i) => [
							id,
							anchors.get(id) ?? { x: 60 + (i % 4) * 110, y: 50 + Math.floor(i / 4) * 100 },
						]),
					);
					const edges = s.edges
						.map(([from, to]) => {
							const a = positions.get(from),
								b = positions.get(to),
								active = s.edge?.[0] === from && s.edge?.[1] === to;
							const path =
								from === to
									? `M${a.x + 20},${a.y} C${a.x + 65},${a.y - 50} ${a.x - 65},${a.y - 50} ${a.x - 20},${a.y}`
									: `M${a.x},${a.y + 23} Q${(a.x + b.x) / 2},${Math.max(a.y, b.y) + 65} ${b.x},${b.y + 23}`;
							return `<path d="${path}" stroke="${active ? "#c6b1fc" : "#78b9ec"}" stroke-width="${active ? 3 : 1.5}" fill="none" marker-end="url(#edge-arrow)"/>`;
						})
						.join("");
					root.getElementById("graph").innerHTML =
						` ${s.vertexLength ? `<p>共 ${s.vertexLength} 个节点，仅显示当前相关节点；${s.edgesOmitted} 条其他边省略。</p>` : ""}<svg role="img" aria-label="课程依赖有向图" width="470" height="${graphHeight}"><defs><marker id="edge-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#78b9ec"/></marker></defs>${edges}${s.vertices
							.map((id) => {
								const p = positions.get(id),
									done = s.completedNodes?.includes(id);
								return `<circle cx="${p.x}" cy="${p.y}" r="24" fill="${id === s.current ? "var(--primary)" : done ? "#25614a" : "#303848"}" stroke="#91a2bd"/><text x="${p.x}" y="${p.y + 5}" text-anchor="middle" fill="white">${id}</text><text x="${p.x}" y="${p.y - 30}" text-anchor="middle" fill="#a7b2c6" font-size="11">${id === s.current ? "当前" : done ? "已修" : ""} 入度 ${s.indegree[id]}</text>`;
							})
							.join("")}</svg>`;
					root.getElementById("queue").textContent =
						`待处理队列（头 → 尾）：${s.queue === null ? "尚未创建" : JSON.stringify(s.queue)}${s.queueOmitted ? `（省略 ${s.queueOmitted} 项）` : ""}`;
					root.getElementById("result").textContent = s.final
						? `最终结果：${JSON.stringify(s.answer)}`
						: "";
				},
			});
		},
	};
}
