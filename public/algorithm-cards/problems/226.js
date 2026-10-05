import { treeCard, decodeTree, encodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./226-code.js";
export const examples = [
	{
		label: "完整树",
		input: [4, 2, 7, 1, 3, 6, 9],
		note: "先交换根的左右子树，再递归交换每个节点的孩子。",
	},
	{
		label: "单边树",
		input: [1, 2, null, 3],
		note: "空孩子也随交换移动到另一侧。",
	},
	{ label: "空树", input: [], note: "空树直接返回 None。" },
	{ label: "单节点", input: [1], note: "交换两个空孩子后仍是同一个节点。" },
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		stack = [],
		visited = [],
		{ steps, push } = recorder();
	let current = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			tree,
			current: current?.id ?? null,
			visited,
			stack,
			stackLabel: "递归调用栈",
			answer,
			variables: [
				{ name: "root", label: "本次调用的根", value: current?.val ?? null },
			],
		});
	function visit(root) {
		current = root;
		stack.push(root?.val ?? null);
		save("empty", `本次 root 为空 → ${!root}。`);
		if (!root) {
			save("nil", "返回 None 给上层调用。");
			stack.pop();
			return;
		}
		[root.left, root.right] = [root.right, root.left];
		visited.push(root.id);
		save("swap", "交换当前节点左右孩子。");
		save("left", "进入交换后的左子树。");
		visit(root.left);
		current = root;
		save("right", "左侧调用已返回，进入右子树。");
		visit(root.right);
		current = root;
		answer = encodeTree(root);
		save("result", "两个孩子的调用均已返回，返回当前根节点。");
		stack.pop();
	}
	visit(tree);
	answer = encodeTree(tree);
	steps.at(-1).answer = answer;
	steps.at(-1).final = true;
	return steps;
}
const card = treeCard({
	title: "226. 翻转二叉树",
	description: "将二叉树中每个节点的左右子树交换，返回原根节点。",
	idea: "例如根 4 的孩子 2、7 先交换，再分别处理 7 和 2 的孩子。递归遇到空节点时直接返回。",
	time: "O(n)",
	space: "O(h)，最坏 O(n)",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
