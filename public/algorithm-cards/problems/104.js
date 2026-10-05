import { treeCard, decodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./104-code.js";
export const examples = [
	{
		label: "左右不等深",
		input: [3, 9, 20, null, null, 15, 7],
		note: "先求左右子树深度，再加上当前根节点这一层。",
	},
	{ label: "空树", input: [], note: "命中空节点分支，直接返回 0。" },
	{ label: "单节点", input: [1], note: "两个空孩子都返回 0，根返回 1。" },
	{
		label: "单边链",
		input: [1, null, 2, null, 3],
		note: "每一层都要等待唯一子树的深度返回。",
	},
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		{ steps, push } = recorder(),
		stack = [],
		visited = [];
	function visit(node) {
		const frame = { node: node?.val ?? null, left: null, right: null };
		stack.push(frame);
		const save = (line, text, answer) =>
			push(line, text, {
				tree,
				current: node?.id ?? null,
				visited,
				stack: stack.map((f) => f.node),
				stackLabel: "递归调用栈",
				answer,
				variables: [
					{ name: "root", label: "本次调用节点", value: frame.node },
					{ name: "left", label: "已返回的左子树深度", value: frame.left },
					{ name: "right", label: "已返回的右子树深度", value: frame.right },
				],
			});
		save("check", `进入 maxDepth(${node?.val ?? "None"})，判断是否为空。`);
		if (!node) {
			save("empty", "空子树返回 0。", 0);
			stack.pop();
			return 0;
		}
		save("left", "调用左子树，当前调用等待它返回。");
		frame.left = visit(node.left);
		save("left", `左子树已返回 ${frame.left}。`);
		save("right", "调用右子树，当前调用等待它返回。");
		frame.right = visit(node.right);
		save("right", `右子树已返回 ${frame.right}。`);
		const result = 1 + Math.max(frame.left, frame.right);
		visited.push(node.id);
		save(
			"result",
			`节点 ${node.val} 返回 1 + max(${frame.left}, ${frame.right}) = ${result}。`,
			result,
		);
		stack.pop();
		return result;
	}
	visit(tree);
	steps.at(-1).final = true;
	return steps;
}
const card = treeCard({
	title: "104. 二叉树的最大深度",
	description: "返回从根节点到最远叶节点路径上的节点数量，空树深度为 0。",
	idea: "每次递归求出左右子树深度，选较大的一个，再加上当前根节点这一层。",
	time: "O(n)",
	space: "O(h)，h 为树高",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
