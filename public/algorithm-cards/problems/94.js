import { treeCard, decodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./94-code.js";
export const examples = [
	{
		label: "右子树有左孩子",
		input: [1, null, 2, 3],
		note: "访问顺序是 1、3、2，不是按数组顺序读取。",
	},
	{ label: "平衡树", input: [2, 1, 3], note: "先左子树，再根，再右子树。" },
	{ label: "空树", input: [], note: "外层循环不进入，返回空列表。" },
	{
		label: "左链",
		input: [3, 2, null, 1],
		note: "先压栈到最左，再一个一个弹出。",
	},
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		{ steps, push } = recorder();
	let stack = [],
		answer = null,
		node = null;
	const visited = [];
	const save = (line, text) =>
		push(line, text, {
			tree,
			current: node?.id ?? null,
			visited,
			stack: stack.map((n) => n.val),
			answer,
			variables: [
				{ name: "node", label: "当前节点", value: node?.val ?? null },
				{
					name: "stack",
					label: "等待访问的节点（底→顶）",
					value: JSON.stringify(stack.map((n) => n.val)),
					wide: true,
				},
				{
					name: "answer",
					label: "已访问结果",
					value: answer === null ? null : JSON.stringify(answer),
					wide: true,
				},
			],
		});
	save("init", "初始化栈。");
	answer = [];
	save("answer", "初始化访问结果。");
	node = tree;
	save("root", "node 从根节点开始。");
	while (true) {
		save("outer", `node 非空或栈非空 → ${node !== null || stack.length > 0}。`);
		if (!node && !stack.length) break;
		while (true) {
			save("inner", `node 非空 → ${node !== null}。`);
			if (!node) break;
			stack.push(node);
			save("push", "当前节点压栈，先等待左子树。");
			node = node.left;
			save("left", "沿左孩子继续。");
		}
		node = stack.pop();
		save("pop", "弹出栈顶，左子树已经处理完。");
		answer.push(node.val);
		visited.push(node.id);
		save("visit", `访问节点 ${node.val}。`);
		node = node.right;
		save("right", "转向右子树。");
	}
	save("result", `返回中序遍历 ${JSON.stringify(answer)}。`);
	return steps;
}
const card = treeCard({
	title: "94. 二叉树的中序遍历",
	description: "按左子树、根、右子树的顺序访问二叉树，返回访问值列表。",
	idea: "用栈保存暂时等待的节点，先走到最左，弹出访问后再去右子树。",
	time: "O(n)",
	space: "O(h)，不含输出",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
