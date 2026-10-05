import { treeCard, encodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./108-code.js";
export const examples = [
	{
		label: "奇数长度",
		nums: [-10, -3, 0, 5, 9],
		note: "画面显示当前递归正在构建的子树，返回后再接到父节点。中点 0 作根。",
	},
	{
		label: "两个元素",
		nums: [1, 3],
		note: "取下中点 1 作根，右子树为 3，左右高度差不超过一。",
	},
	{ label: "单元素", nums: [0], note: "左右两次调用都遇到空区间，返回 None。" },
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder(),
		stack = [];
	let nextId = 0,
		answer = null;
	const save = (line, text, f, tree = f?.node ?? null, final = false) =>
		push(line, text, {
			tree,
			current: f?.node?.id ?? null,
			stack: stack.map((f) => `[${f.left},${f.right}]`),
			stackLabel: "递归区间栈",
			answer,
			final,
			variables: [
				{ name: "nums", label: "原有序数组", value: JSON.stringify(nums) },
				{ name: "left", label: "区间左端", value: f?.left ?? null },
				{ name: "right", label: "区间右端", value: f?.right ?? null },
				{ name: "middle", label: "中点", value: f?.middle ?? null },
				{ name: "node", label: "本次新节点", value: f?.node?.val ?? null },
			],
		});
	save("start", "从整个有序数组开始构建。");
	function build(left, right) {
		const f = { left, right, middle: null, node: null };
		stack.push(f);
		save("empty", `left > right → ${left > right}。`, f);
		if (left > right) {
			save("nil", "空区间不创建节点。", f);
			stack.pop();
			return null;
		}
		f.middle = Math.floor((left + right) / 2);
		save("middle", `选中点 nums[${f.middle}]=${nums[f.middle]}。`, f);
		f.node = { id: nextId++, val: nums[f.middle], left: null, right: null };
		save("node", "只创建当前根，孩子尚未连接。", f);
		save("left", "先构建左半区。", f);
		f.node.left = build(left, f.middle - 1);
		save("left", "左子树返回并接到 node.left。", f);
		save("right", "再构建右半区。", f);
		f.node.right = build(f.middle + 1, right);
		save("right", "右子树返回并接到 node.right。", f);
		save("result", "返回这棵子树给上层。", f);
		stack.pop();
		return f.node;
	}
	const tree = build(0, nums.length - 1);
	answer = encodeTree(tree);
	save("start", "最外层构建结束，返回完整平衡搜索树。", null, tree, true);
	return steps;
}
const card = treeCard({
	title: "108. 将有序数组转换为二叉搜索树",
	description:
		"把严格递增数组转换成高度平衡的二叉搜索树。每个节点的左右子树高度差最多为 1；答案允许不唯一。",
	idea: "中点作根，较小数在左半区，较大数在右半区。每次按中点分割，区间长度大致减半。例如 [-10,-3,0,5,9] 先选 0，递归创建两侧。",
	time: "O(n)",
	space: "O(log n)，不计输出树",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
