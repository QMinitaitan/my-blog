import { cardTemplate, mountCard, escapeHtml, problemNotes, resolveNotes } from "./card-ui.js";
import { problemBadges } from "../problems/meta.js";

/** 力扣层序样本：只给非空节点分配孩子，不能把数组当作完全二叉树下标。 */
export function decodeTree(values) {
	if (!values.length || values[0] === null) return null;
	const root = { id: 0, val: values[0], left: null, right: null },
		queue = [root];
	let index = 1,
		id = 1;
	for (let head = 0; head < queue.length && index < values.length; head++)
		for (const side of ["left", "right"]) {
			const value = values[index++];
			if (value !== null && value !== undefined) {
				const child = { id: id++, val: value, left: null, right: null };
				queue[head][side] = child;
				queue.push(child);
			}
		}
	return root;
}

/** 将结果树编码为力扣层序形式；裁掉尾部空孩子，不改变内部 null 位置。 */
export function encodeTree(root) {
	if (!root) return [];
	const queue = [root],
		values = [];
	for (let i = 0; i < queue.length; i++) {
		const node = queue[i];
		values.push(node?.val ?? null);
		if (node) queue.push(node.left, node.right);
	}
	while (values.at(-1) === null) values.pop();
	return values;
}

export function treeCard({
	title,
	description,
	idea,
	notes,
	time = "O(n)",
	space = "O(n)",
	codes,
	examples,
	buildTrace,
}) {
	const problemId = String(title).match(/^\s*(\d+)/)?.[1];
	const problem = `<div class="problem"><div class="title"><h2>${escapeHtml(title)}</h2>${problemBadges(title)}</div><p>${escapeHtml(description)}</p>${problemNotes(resolveNotes(title, notes, `目标复杂度：时间 ${time}，空间 ${space}。`))}</div>`;
	const template = cardTemplate({
		problem,
		thought: idea,
		time,
		space,
		animation:
			'<p id="sample-note" class="hash-caption"></p><div id="tree"></div><p id="stack" class="hash-caption"></p><p id="result" class="hash-caption"></p><p class="legend">紫框：当前节点　绿框：已访问　连线标记左右孩子</p>',
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
					`${e.label} · ${JSON.stringify(e.input ?? e.nums ?? e.preorder)}`,
				getVariables: (s) => s.variables,
				renderAnimation(root, s, e) {
					root.getElementById("sample-note").textContent = e.note;
					const nodes = [],
						edges = [];
					const laidOut = new Set();
					let position = 0,
						maxDepth = 0;
					function layout(node, depth) {
						if (!node || laidOut.has(node.id)) return;
						laidOut.add(node.id);
						layout(node.left, depth + 1);
						const placed = { ...node, x: ++position * 56, y: depth * 70 + 30 };
						nodes.push(placed);
						maxDepth = Math.max(maxDepth, depth);
						layout(node.right, depth + 1);
					}
					layout(s.tree, 0);
					const byId = new Map(nodes.map((n) => [n.id, n]));
					const nodeLabel = (n) =>
						Object.entries(s.pointers ?? {})
							.filter(([, id]) => id === n.id)
							.map(([name]) => name)
							.join("/") || (n.id === s.current ? "当前节点" : "比较节点");
					for (const node of nodes)
						for (const side of ["left", "right"])
							if (node[side]) {
								const child = byId.get(node[side].id);
								edges.push(
									`<path d="M${node.x},${node.y + 16} L${child.x},${child.y - 16}" stroke="#7c869b" fill="none"/><text x="${(node.x + child.x) / 2}" y="${(node.y + child.y) / 2}" fill="#a7b2c6" font-size="10">${side === "left" ? "左" : "右"}</text>`,
								);
							}
					root.getElementById("tree").innerHTML = nodes.length
						? `<svg role="img" aria-label="二叉树当前执行状态" viewBox="0 0 ${(position + 1) * 56} ${(maxDepth + 1) * 70}" style="width:100%;max-height:320px">${edges.join("")}${nodes.map((n) => `<g><circle cx="${n.x}" cy="${n.y}" r="18" fill="${n.id === s.current || s.currentNodes?.includes(n.id) ? "var(--primary)" : s.visited?.includes(n.id) ? "#25614a" : "#303848"}" stroke="${n.id === s.current || s.currentNodes?.includes(n.id) ? "#c6b1fc" : "#91a2bd"}"/><text x="${n.x}" y="${n.y + 5}" text-anchor="middle" font-size="14" fill="white">${escapeHtml(n.val)}</text>${n.id === s.current || s.currentNodes?.includes(n.id) ? `<text x="${n.x}" y="${n.y - 23}" text-anchor="middle" font-size="10" fill="#c6b1fc">${escapeHtml(nodeLabel(n))}</text>` : ""}</g>`).join("")}</svg>`
						: "空树 root = None";
					root.getElementById("stack").textContent =
						`${s.stackLabel ?? "栈"}（底 → 顶）：${JSON.stringify(s.stack ?? [])}${s.stackOmitted ? `（中间省略 ${s.stackOmitted} 项）` : ""}`;
					root.getElementById("result").textContent =
						s.final || (s.line === "result" && s.stackLabel !== "递归调用栈")
							? `最终结果：${JSON.stringify(s.answer)}`
							: s.line === "result"
								? `本次调用返回：${s.answer}`
								: "";
				},
			});
		},
	};
}
