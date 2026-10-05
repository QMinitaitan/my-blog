import { stateValue } from "./state-value.js";
import { cardTemplate, mountCard, escapeHtml, problemNotes, resolveNotes } from "./card-ui.js";
import { problemBadges } from "../problems/meta.js";
/** 教学节点用稳定 id 表示对象身份，next 保存目标 id；相同值的节点也不会混淆。 */
export function makeList(values, prefix = "N") {
	const nodes = values.map((val, i) => ({
		id: `${prefix}${i}`,
		val,
		next: i + 1 < values.length ? `${prefix}${i + 1}` : null,
	}));
	return { nodes, head: nodes[0]?.id ?? null };
}
export function listValues(nodes, head) {
	const map = new Map(nodes.map((n) => [n.id, n])),
		values = [],
		seen = new Set();
	while (head !== null) {
		if (seen.has(head)) throw new Error("结果链表存在环");
		seen.add(head);
		const node = map.get(head);
		if (!node) throw new Error(`未知节点 ${head}`);
		values.push(node.val);
		head = node.next;
	}
	return values;
}
export function linkedListCard({
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
			'<p id="sample-note" class="hash-caption"></p><div id="list" style="overflow:auto"></div><p id="context"></p><p id="result" class="hash-caption"></p><p class="legend">紫框与指针标签：当前引用　箭头：next　Ø：空指针</p>',
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
					`${e.label} · ${JSON.stringify(e.input ?? e.lists ?? e.operations ?? [e.l1, e.l2])}${e.n !== undefined ? ` · n=${e.n}` : ""}`,
				getVariables: (s) =>
					variables.map(([name, label]) => ({
						name,
						label,
						value: stateValue(s, name),
						wide: typeof s[name] === "object" && s[name] !== null,
					})),
				renderAnimation(root, s, e) {
					root.getElementById("sample-note").textContent = e.note;
					const shown =
						s.nodes.length <= 16
							? s.nodes
							: s.nodes.filter(
									(n, i) =>
										i === 0 ||
										i === s.nodes.length - 1 ||
										Object.values(s.pointers ?? {}).includes(n.id),
								);
					const positions = new Map(
						shown.map((node, i) => [node.id, 60 + i * 105]),
					);
					const arrows = shown
						.map((node) => {
							if (!node.next) return "";
							const start = positions.get(node.id),
								end = positions.get(node.next);
							if (end === undefined)
								return `<text x="${start}" y="140" text-anchor="middle" fill="#a7b2c6">next → ${escapeHtml(node.next)}（省略）</text>`;
							const arc = Math.min(70, 20 + Math.abs(end - start) / 5),
								path =
									start === end
										? `M${start + 15},88 C${start + 65},145 ${start - 65},145 ${start - 15},88`
										: `M${start},88 Q${(start + end) / 2},${88 + arc} ${end},88`;
							return `<path d="${path}" stroke="#78b9ec" fill="none" marker-end="url(#next-arrow)"/>`;
						})
						.join("");
					root.getElementById("list").innerHTML =
						`${s.nodeLength || s.nodes.length > 16 ? "<p>仅显示当前相关节点，其余节点省略；编号保留节点身份。</p>" : ""}<svg role="img" aria-label="链表节点及 next 指向" width="${Math.max(210, shown.length * 105 + 30)}" height="185" style="display:block"><defs><marker id="next-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#78b9ec"/></marker></defs>${arrows}${shown
							.map((node) => {
								const x = positions.get(node.id),
									labels = Object.entries(s.pointers ?? {})
										.filter(([, id]) => id === node.id)
										.map(([name]) => name);
								return `<g><text x="${x}" y="20" text-anchor="middle" fill="#c6b1fc" font-size="12">${escapeHtml(labels.join("/"))}</text><rect x="${x - 27}" y="35" width="54" height="50" rx="8" fill="${labels.length ? "var(--primary)" : "#303848"}" stroke="#91a2bd"/><text x="${x}" y="54" text-anchor="middle" fill="#ccd5e4" font-size="10">${escapeHtml(node.id)}</text><text x="${x}" y="73" text-anchor="middle" fill="white">${escapeHtml(node.val)}</text>${node.next === null ? `<text x="${x}" y="115" text-anchor="middle" fill="#a7b2c6">next = Ø</text>` : ""}</g>`;
							})
							.join("")}</svg><p>空引用：${escapeHtml(
							Object.entries(s.pointers ?? {})
								.filter(([, id]) => id === null)
								.map(([name]) => name)
								.join("、") || "无",
						)}</p>`;
					root.getElementById("context").textContent = s.visualNote ?? "";
					const svg = root.getElementById("list").querySelector("svg");
					if (svg)
						for (const node of shown)
							if ("random" in node) {
								const x = positions.get(node.id),
									target = positions.get(node.random);
								svg.insertAdjacentHTML(
									"beforeend",
									`<text x="${x}" y="175" text-anchor="middle" fill="#e3ad69" font-size="10">random → ${escapeHtml(node.random ?? "Ø")}${node.random !== null && target === undefined ? "（省略）" : ""}</text>${target === undefined ? "" : `<path d="M${x},88 C${x + 35},170 ${target - 35},170 ${target},88" stroke="#e3ad69" stroke-dasharray="4 3" fill="none" marker-end="url(#random-arrow)"/>`}`,
								);
							}
					if (svg)
						svg
							.querySelector("defs")
							.insertAdjacentHTML(
								"beforeend",
								'<marker id="random-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#e3ad69"/></marker>',
							);
					root.getElementById("result").textContent =
						s.final || (s.line === "result" && s.answer !== null)
							? `最终结果：${JSON.stringify(s.answer)}`
							: "";
				},
			});
		},
	};
}
