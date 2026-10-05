import { treeCard, decodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./199-code.js";
export const examples = [
	{
		label: "右侧可见",
		input: [1, 2, 3, null, 5, null, 4],
		note: "每层最后出队的节点依次为 1、3、4。",
	},
	{
		label: "左侧补位",
		input: [1, 2, 3, 4],
		note: "第三层只有左子树的 4，它也能从右侧看到。",
	},
	{ label: "空树", input: [], note: "没有任何可见节点。" },
	{ label: "单节点", input: [1], note: "根节点本身就是第一层最后一个。" },
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		{ steps, push } = recorder(),
		visited = [];
	let queue = null,
		answer = null,
		size = null,
		i = null,
		node = null;
	const save = (line, text) =>
		push(line, text, {
			tree,
			current: node?.id ?? null,
			visited,
			stack: queue?.map((n) => n.val) ?? [],
			stackLabel: "队列（左为队首）",
			answer,
			final: line === "fail",
			variables: [
				{ name: "i", label: "层内位置", value: i },
				{ name: "size", label: "本层节点数", value: size },
				{
					name: "answer",
					label: "右视图",
					value: answer ? JSON.stringify(answer) : null,
				},
			],
		});
	save("empty", `root 为空 → ${tree === null}。`);
	if (!tree) {
		answer = [];
		save("fail", "空树返回 []。");
		return steps;
	}
	queue = [tree];
	answer = [];
	save("init", "根节点入队。");
	while (true) {
		save("loop", `队列非空 → ${queue.length > 0}。`);
		if (!queue.length) break;
		size = queue.length;
		save("size", `固定本层数量为 ${size}。`);
		for (i = 0; i < size; i++) {
			save("scan", `处理层内下标 ${i}。`);
			node = queue.shift();
			visited.push(node.id);
			save("pop", `节点 ${node.val} 出队。`);
			save("last", `i == size-1 → ${i === size - 1}。`);
			if (i === size - 1) {
				answer.push(node.val);
				save("collect", "本层最右侧节点加入右视图。");
			}
			save("left", `存在左孩子 → ${!!node.left}。`);
			if (node.left) {
				queue.push(node.left);
				save("pushLeft", "左孩子入队。");
			}
			save("right", `存在右孩子 → ${!!node.right}。`);
			if (node.right) {
				queue.push(node.right);
				save("pushRight", "右孩子入队。");
			}
		}
		i = size - 1;
	}
	save("result", "返回每层最后访问的节点。");
	return steps;
}
const card = treeCard({
	title: "199. 二叉树的右视图",
	description: "站在二叉树右侧，返回从上到下可以看见的节点值。",
	idea: "层序遍历从左到右出队，每层最后一个就是可见节点。右子树缺少更深节点时，左子树也可能出现在右视图。",
	time: "O(n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
