import { treeCard, decodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./230-code.js";
export const examples = [
	{
		label: "第一个",
		input: [3, 1, 4, null, 2],
		k: 1,
		note: "最左侧节点 1 是第一个访问的值。",
	},
	{
		label: "中间名次",
		input: [5, 3, 6, 2, 4, null, null, 1],
		k: 3,
		note: "中序访问 1、2、3，到第三个就停止。",
	},
	{
		label: "最后一个",
		input: [2, 1, 3],
		k: 3,
		note: "访问到最大节点 3 后返回。",
	},
	{ label: "单节点", input: [7], k: 1, note: "弹出根节点后 k 变为 0。" },
];
export function buildTrace({ input, k }) {
	const tree = decodeTree(input),
		stack = [],
		visited = [],
		{ steps, push } = recorder();
	let node = tree,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			tree,
			current: node?.id ?? null,
			visited,
			stack: stack.map((n) => n.val),
			answer,
			final: line === "hit",
			variables: [
				{ name: "node", label: "当前节点", value: node?.val ?? null },
				{ name: "k", label: "还需访问数量", value: k },
			],
		});
	save("init", "中序按升序访问，每访问一个节点就把 k 减一。");
	while (true) {
		save("loop", `栈或节点非空 → ${!!stack.length || !!node}。`);
		if (!stack.length && !node) break;
		while (true) {
			save("descend", `node 非空 → ${!!node}。`);
			if (!node) break;
			stack.push(node);
			save("push", "节点入栈，先处理更小的左侧。");
			node = node.left;
			save("left", "移到左孩子。");
		}
		node = stack.pop();
		visited.push(node.id);
		save("pop", "访问栈顶节点。");
		k--;
		save("count", "名次计数减一。");
		save("check", `k == 0 → ${k === 0}。`);
		if (k === 0) {
			answer = node.val;
			save("hit", "已经访问第 k 个最小值，立即返回。");
			return steps;
		}
		node = node.right;
		save("right", "继续处理右子树。");
	}
	throw new Error("教学样本 k 超出节点数量");
}
const card = treeCard({
	title: "230. 二叉搜索树中第 K 小的元素",
	description: "给定合法二叉搜索树和有效名次 k（从 1 开始），返回第 k 小的值。",
	idea: "搜索树中序遍历按升序输出。栈模拟左、根、右顺序，访问第 k 个节点时提前返回，无需排序。",
	time: "O(h+k)，最坏 O(n)",
	space: "O(h)",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
