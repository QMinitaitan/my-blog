import { treeCard, decodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./102-code.js";
export const examples = [
	{
		label: "分层",
		input: [3, 9, 20, null, null, 15, 7],
		note: "固定本层 size，刚加入的孩子留到下一层处理。",
	},
	{ label: "空树", input: [], note: "返回空列表，不创建队列。" },
	{ label: "单节点", input: [1], note: "只有一层一个值。" },
	{
		label: "缺少左孩子",
		input: [1, null, 2, 3],
		note: "层序数组按非空节点分配孩子，3 是 2 的左孩子。",
	},
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		{ steps, push } = recorder(),
		visited = [];
	let queue = null,
		answer = null,
		size = null,
		level = null,
		count = null,
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
				{ name: "size", label: "本层节点数", value: size },
				{
					name: "level",
					label: "本层结果",
					value: level ? JSON.stringify(level) : null,
				},
				{
					name: "answer",
					label: "已完成层",
					value: answer ? JSON.stringify(answer) : null,
					wide: true,
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
		level = [];
		save("size", `固定本层数量为 ${size}。`);
		for (count = 0; count < size; count++) {
			save("scan", `处理本层第 ${count + 1} 个节点。`);
			node = queue.shift();
			visited.push(node.id);
			save("pop", `队首 ${node.val} 出队。`);
			level.push(node.val);
			save("collect", "将值写入本层列表。");
			save("left", `存在左孩子 → ${!!node.left}。`);
			if (node.left) {
				queue.push(node.left);
				save("pushLeft", "左孩子入队，留到下一层。");
			}
			save("right", `存在右孩子 → ${!!node.right}。`);
			if (node.right) {
				queue.push(node.right);
				save("pushRight", "右孩子入队，留到下一层。");
			}
		}
		answer.push([...level]);
		save("level", "本层处理完成，加入答案。");
	}
	save("result", "所有层完成，返回答案。");
	return steps;
}
const card = treeCard({
	title: "102. 二叉树的层序遍历",
	description: "从根开始，逐层、从左到右返回节点值。",
	idea: "队列记录待访问节点。每层开始先固定 size，避免把刚加入的下一层节点混进本层。",
	time: "O(n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
