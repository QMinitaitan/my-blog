import { treeCard, decodeTree, encodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./114-code.js";
export const examples = [
	{
		label: "左右子树拼接",
		input: [1, 2, 5, 3, 4, null, 6],
		note: "先接 4.right=5，再把 2 移到 1.right，最后清空 1.left。中间的共享引用是真实状态。",
	},
	{
		label: "只有左链",
		input: [1, 2, null, 3],
		note: "每次把左孩子移到右指针，最终得到 1→2→3。",
	},
	{
		label: "已有右链",
		input: [1, null, 2],
		note: "不进入拼接分支，沿 right 移动即可。",
	},
	{ label: "空树", input: [], note: "不进入循环，原地修改结束，根仍为空。" },
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		{ steps, push } = recorder();
	let current = tree,
		previous = null,
		answer = null;
	const save = (line, text, final = false) =>
		push(line, text, {
			tree,
			current: current?.id ?? null,
			pointers: {
				current: current?.id ?? null,
				previous: previous?.id ?? null,
			},
			currentNodes: [current?.id, previous?.id].filter((v) => v !== undefined),
			stack: [],
			stackLabel: "迭代算法无递归栈",
			answer,
			final,
			variables: [
				{ name: "current", label: "处理节点", value: current?.val ?? null },
				{
					name: "previous",
					label: "左子树最右节点",
					value: previous?.val ?? null,
				},
			],
		});
	save("init", "current 从根开始。");
	while (true) {
		save("loop", `current 非空 → ${!!current}。`, !current);
		if (!current) break;
		save("hasLeft", `有左孩子 → ${!!current.left}。`);
		if (current.left) {
			previous = current.left;
			save("previous", "在左子树中查找最右节点。");
			while (true) {
				save("walk", `previous 有右孩子 → ${!!previous.right}。`);
				if (!previous.right) break;
				previous = previous.right;
				save("advance", "沿右指针移动。");
			}
			previous.right = current.right;
			save("bridge", "原右子树接到左子树最右节点。");
			current.right = current.left;
			save("moveLeft", "左子树移到当前右指针；这一刻左右指针指向同一节点。");
			current.left = null;
			save("clear", "清空左指针，保留前序顺序的右链。");
		}
		current = current.right;
		save("next", "沿调整后的 right 继续。");
	}
	answer = encodeTree(tree);
	Object.assign(steps.at(-1), { answer, final: true });
	return steps;
}
const card = treeCard({
	title: "114. 二叉树展开为链表",
	description:
		"原地把二叉树展开为前序遍历顺序的右链，所有 left 为 None。方法不返回新树。",
	idea: "当前节点有左子树时，找到左子树最右节点，把原右子树接到它后面，再把左子树移到 right 并清空 left。例如 1 的左侧 2→4 之后接上原右侧 5。",
	time: "O(n)",
	space: "O(1)，原地改指针",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
