import { treeCard, decodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./543-code.js";
export const examples = [
	{
		label: "经过根",
		input: [1, 2, 3, 4, 5],
		note: "左右子树高度 2、1，经过根的路径有 3 条边。",
	},
	{
		label: "不经过根",
		input: [1, 2, null, 3, 4, 5, null, null, 6],
		note: "最长路径可以完全位于左子树，不能只看根。",
	},
	{ label: "单节点", input: [1], note: "路径只有节点，没有边，直径为 0。" },
	{
		label: "链状树",
		input: [1, null, 2, null, 3],
		note: "高度为 3 个节点，直径为 2 条边。",
	},
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		stack = [],
		visited = [],
		{ steps, push } = recorder();
	let node = null,
		left = null,
		right = null,
		answer = 0,
		returned = null;
	const save = (line, text) =>
		push(line, text, {
			tree,
			current: node?.id ?? null,
			visited,
			stack: stack.map((f) => f.node?.val ?? null),
			stackLabel: "递归调用栈",
			answer,
			variables: [
				{ name: "node", label: "本次节点", value: node?.val ?? null },
				{ name: "left", label: "左侧高度", value: left },
				{ name: "right", label: "右侧高度", value: right },
				{ name: "answer", label: "当前最长边数", value: answer },
				{ name: "returned", label: "返回给父节点的高度", value: returned },
			],
		});
	save("init", "最长边数先设为 0。");
	save("start", "从根开始计算高度。");
	function height(current) {
		const frame = { node: current, left: null, right: null };
		stack.push(frame);
		node = current;
		left = null;
		right = null;
		returned = null;
		save("empty", `node 为空 → ${!current}。`);
		if (!current) {
			returned = 0;
			save("nil", "空树高度为 0。");
			stack.pop();
			return 0;
		}
		save("left", "进入左子树计算高度。");
		frame.left = height(current.left);
		node = current;
		left = frame.left;
		right = null;
		returned = null;
		save("left", `左侧调用返回高度 ${left}。`);
		save("right", "进入右子树计算高度。");
		frame.right = height(current.right);
		node = current;
		left = frame.left;
		right = frame.right;
		returned = null;
		save("right", `右侧调用返回高度 ${right}。`);
		answer = Math.max(answer, left + right);
		visited.push(current.id);
		save(
			"update",
			`经过当前节点的路径边数 ${left}+${right}，更新最长边数为 ${answer}。`,
		);
		returned = Math.max(left, right) + 1;
		save("height", `只取较高的一侧接给父节点，返回高度 ${returned}。`);
		stack.pop();
		return returned;
	}
	height(tree);
	node = tree;
	left = null;
	right = null;
	returned = null;
	save("result", "所有节点都比较过，返回全局最长边数。");
	steps.at(-1).final = true;
	return steps;
}
const card = treeCard({
	title: "543. 二叉树的直径",
	description: "求任意两个节点之间最长路径的边数，路径不一定经过根节点。",
	idea: "每个节点比较“左侧高度 + 右侧高度”。向父节点返回单侧高度，整条路径长度保存在全局 answer 中；两者含义不同。",
	time: "O(n)",
	space: "O(h)",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
