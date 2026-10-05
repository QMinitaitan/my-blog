import { treeCard, decodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./98-code.js";
export const examples = [
	{ label: "合法搜索树", input: [2, 1, 3], note: "中序值严格递增 1,2,3。" },
	{
		label: "违反祖先范围",
		input: [5, 1, 6, null, null, 3, 7],
		note: "3 小于祖先 5，中序访问到 3 时失败。",
	},
	{
		label: "相等值",
		input: [2, 2, 3],
		note: "搜索树要求严格小于/大于，重复 2 不合法。",
	},
	{
		label: "整数边界",
		input: [-2147483648, null, 2147483647],
		note: "使用未赋值状态或更宽哨兵，不能误判最小整数。",
	},
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		stack = [],
		visited = [],
		order = [],
		{ steps, push } = recorder();
	let node = tree,
		previous = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			tree,
			current: node?.id ?? null,
			visited,
			stack: stack.map((n) => n.val),
			answer,
			final: line === "fail",
			variables: [
				{ name: "node", label: "当前节点", value: node?.val ?? null },
				{ name: "previous", label: "上个中序值", value: previous },
				{ name: "order", label: "访问顺序", value: JSON.stringify(order) },
			],
		});
	save("init", "初始化栈，previous 尚未赋值。");
	while (true) {
		save("loop", `栈非空或 node 非空 → ${!!stack.length || !!node}。`);
		if (!stack.length && !node) break;
		while (true) {
			save("descend", `node 非空 → ${!!node}。`);
			if (!node) break;
			stack.push(node);
			save("push", "保存当前节点，先处理左子树。");
			node = node.left;
			save("left", "移动到左孩子。");
		}
		node = stack.pop();
		visited.push(node.id);
		order.push(node.val);
		save("pop", "左侧已处理，访问栈顶节点。");
		save(
			"check",
			`previous 已赋值且当前值 <= previous → ${previous !== null && node.val <= previous}。`,
		);
		if (previous !== null && node.val <= previous) {
			answer = false;
			save("fail", "中序不再严格递增，返回 false。");
			return steps;
		}
		previous = node.val;
		save("update", "记录刚访问的值。");
		node = node.right;
		save("right", "接着处理右子树。");
	}
	answer = true;
	save("result", "所有相邻中序值严格递增，返回 true。");
	return steps;
}
const card = treeCard({
	title: "98. 验证二叉搜索树",
	description:
		"每个节点左子树所有值严格更小，右子树所有值严格更大，判断整棵树是否合法。",
	idea: "搜索树的中序序列严格递增。用栈按左、根、右访问，与 previous 比较就同时检查了所有祖先范围。",
	time: "O(n)",
	space: "O(h)，最坏 O(n)",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
