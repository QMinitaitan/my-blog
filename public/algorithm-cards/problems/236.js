import { treeCard, decodeTree } from "../shared/tree-card.js";
import { treeTrace } from "../shared/tree-trace.js";
import { codes } from "./236-code.js";
export const examples = [
	{
		label: "分处两侧",
		input: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4],
		p: 5,
		q: 1,
		note: "左边返回 5，右边返回 1，两侧都非空时，3 是公共祖先。",
	},
	{
		label: "祖先本身是目标",
		input: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4],
		p: 5,
		q: 4,
		note: "遇到目标 5 直接返回它；5 也是自己和 4 的最近公共祖先。",
	},
	{
		label: "同一子树",
		input: [1, 2, 3, 4, 5],
		p: 4,
		q: 5,
		note: "节点 2 两侧分别找到目标，向上返回 2，根继续传递它。",
	},
];
export function buildTrace({ input, p, q }) {
	const tree = decodeTree(input),
		trace = treeTrace(tree);
	let answer = null;
	const save = (line, text, f, final = false) =>
		trace.save(
			line,
			text,
			{
				root: f?.node?.val ?? null,
				p,
				q,
				left: f?.left?.val ?? null,
				right: f?.right?.val ?? null,
				returned: f?.returned?.val ?? null,
			},
			{ current: f?.node?.id ?? null, answer, final },
		);
	function visit(node) {
		const f = { node, left: null, right: null, returned: null };
		trace.stack.push(f);
		const base = !node || node.val === p || node.val === q;
		save("base", `空节点或当前就是目标 → ${base}。`, f);
		if (base) {
			f.returned = node;
			save("direct", "返回当前节点；目标节点也可以是公共祖先。", f);
			trace.stack.pop();
			return node;
		}
		save("left", "先查左子树。", f);
		f.left = visit(node.left);
		save("left", "左侧调用返回。", f);
		save("right", "再查右子树。", f);
		f.right = visit(node.right);
		save("right", "右侧调用返回。", f);
		save("both", `两侧都非空 → ${!!f.left && !!f.right}。`, f);
		f.returned = f.left && f.right ? node : f.left || f.right;
		save(
			f.left && f.right ? "ancestor" : "result",
			f.left && f.right
				? "两侧各找到目标，当前节点是最近公共祖先。"
				: "把非空结果传给父节点，或返回 None。",
			f,
		);
		trace.stack.pop();
		return f.returned;
	}
	const result = visit(tree);
	answer = result.val;
	save("result", "最外层返回最近公共祖先的节点，画面显示其值。", null, true);
	return trace.steps;
}
const card = treeCard({
	title: "236. 二叉树的最近公共祖先",
	description:
		"给定树内两个不同节点 p、q，返回离它们最近的公共祖先节点。节点也可以是自己的祖先；题目保证节点值唯一、两个目标都存在。",
	idea: "遇到目标直接返回。左右各返回一个非空结果时，当前节点把两条查找路径汇合起来；只有一侧非空，就把那一侧结果继续向上交给父节点。",
	time: "O(n)",
	space: "O(h)，h 为树高",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
