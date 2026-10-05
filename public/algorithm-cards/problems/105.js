import { treeCard, encodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./105-code.js";
export const examples = [
	{
		label: "经典重建",
		preorder: [3, 9, 20, 15, 7],
		inorder: [9, 3, 15, 20, 7],
		note: "前序依次提供根，中序给根的左右范围。画面显示正在构建的子树。",
	},
	{
		label: "只有右子树",
		preorder: [1, 2, 3],
		inorder: [1, 2, 3],
		note: "每次左范围为空，前序游标继续消耗右链。",
	},
	{
		label: "单节点",
		preorder: [-1],
		inorder: [-1],
		note: "创建一个根后，左右空范围都返回 None。",
	},
];
export function buildTrace({ preorder, inorder }) {
	const { steps, push } = recorder(),
		pos = new Map(inorder.map((v, i) => [v, i])),
		stack = [];
	let next_index = 0,
		id = 0,
		answer = null;
	const save = (line, text, f, tree = f?.node ?? null, final = false) =>
		push(line, text, {
			tree,
			current: f?.node?.id ?? null,
			stack: stack.map((f) => `[${f.left},${f.right}]`),
			stackLabel: "中序区间调用栈",
			answer,
			final,
			variables: [
				{
					name: "preorder",
					label: "前序数组",
					value: JSON.stringify(preorder),
				},
				{ name: "inorder", label: "中序数组", value: JSON.stringify(inorder) },
				{ name: "next_index", label: "下一个前序下标", value: next_index },
				{ name: "left", label: "中序左端", value: f?.left ?? null },
				{ name: "right", label: "中序右端", value: f?.right ?? null },
				{ name: "value", label: "当前根值", value: f?.value ?? null },
				{ name: "middle", label: "根的中序位置", value: f?.middle ?? null },
			],
		});
	save("init", "建立中序位置字典，前序游标从 0 开始。");
	save("start", "从完整中序范围开始重建。");
	function build(left, right) {
		const f = { left, right, value: null, middle: null, node: null };
		stack.push(f);
		save("empty", `left > right → ${left > right}。`, f);
		if (left > right) {
			save("nil", "空范围返回 None。", f);
			stack.pop();
			return null;
		}
		f.value = preorder[next_index];
		save("value", `前序当前位置提供根 ${f.value}。`, f);
		next_index++;
		save("advance", "游标前移，下次递归读取下一根。", f);
		f.middle = pos.get(f.value);
		save("middle", "查询该根在中序中的位置。", f);
		f.node = { id: id++, val: f.value, left: null, right: null };
		save("node", "创建当前根。", f);
		save("left", "先消耗左子树的前序节点。", f);
		f.node.left = build(left, f.middle - 1);
		save("left", "返回的左子树接到根。", f);
		save("right", "然后消耗右子树。", f);
		f.node.right = build(f.middle + 1, right);
		save("right", "返回的右子树接到根。", f);
		save("result", "返回当前子树。", f);
		stack.pop();
		return f.node;
	}
	const tree = build(0, inorder.length - 1);
	answer = encodeTree(tree);
	save("start", "全部节点重建完成。", null, tree, true);
	return steps;
}
const card = treeCard({
	title: "105. 从前序与中序遍历序列构造二叉树",
	description:
		"给定同一棵树的前序和中序遍历，节点值互不相同，重建这棵树。前序是根→左→右，中序是左→根→右。",
	idea: "前序游标读根，中序字典找分界。例如根 3 在中序 [9,3,15,20,7] 的下标 1，左边只有 9。必须先建左侧，再建右侧，与前序消耗顺序一致。",
	time: "O(n)，字典查询平均 O(1)",
	space: "O(n)，位置字典与递归栈，不计输出树",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
