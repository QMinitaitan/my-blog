import { treeCard, decodeTree } from "../shared/tree-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./101-code.js";
export const examples = [
	{
		label: "镜像对称",
		input: [1, 2, 2, 3, 4, 4, 3],
		note: "外侧比较左.left 与右.right，内侧比较左.right 与右.left。",
	},
	{
		label: "结构不同",
		input: [1, 2, 2, null, 3, null, 3],
		note: "值相同不够：一边有节点、另一边为空时就不对称。",
	},
	{
		label: "数值不同",
		input: [1, 2, 3],
		note: "第一对左右节点数值不同，立即返回 False。",
	},
	{ label: "单节点", input: [1], note: "两对空孩子都匹配，最后返回 True。" },
];
export function buildTrace({ input }) {
	const tree = decodeTree(input),
		queue = [[tree, tree]],
		{ steps, push } = recorder();
	let head = 0,
		a = null,
		b = null,
		answer = null;
	const save = (line, text, final = false) =>
		push(line, text, {
			tree,
			current: a?.id ?? b?.id ?? null,
			pointers: { a: a?.id ?? null, b: b?.id ?? null },
			currentNodes: [a?.id, b?.id].filter((n) => n !== undefined),
			stack: queue
				.slice(head, head + 16)
				.map((pair) => pair.map((n) => n?.val ?? null)),
			stackLabel: "待比较队列（首→尾）",
			answer,
			final,
			variables: [
				{ name: "a", label: "左侧节点", value: a?.val ?? null },
				{ name: "b", label: "右侧镜像节点", value: b?.val ?? null },
				{
					name: "queue",
					label: "剩余节点对",
					value: JSON.stringify(
						queue
							.slice(head, head + 16)
							.map((pair) => pair.map((n) => n?.val ?? null)),
					),
				},
			],
		});
	save("init", "从根与自身这一对开始。");
	while (true) {
		save("loop", `队列是否还有节点对 → ${head < queue.length}。`);
		if (head === queue.length) break;
		[a, b] = queue[head++];
		save("take", "取出下一对镜像位置。");
		save("both", `两边是否都空 → ${a === null && b === null}。`);
		if (a === null && b === null) {
			save("skip", "这一对匹配，继续下一对。");
			continue;
		}
		const mismatch = !a || !b || a.val !== b.val;
		save("mismatch", `有一边空或数值不等 → ${mismatch}。`);
		if (mismatch) {
			answer = false;
			save("false", "发现不匹配，立即返回 False。", true);
			return steps;
		}
		queue.push([a.left, b.right]);
		save("outer", "外侧孩子配成镜像对入队。");
		queue.push([a.right, b.left]);
		save("inner", "内侧孩子配成镜像对入队。");
	}
	answer = true;
	save("result", "所有节点对匹配，返回 True。", true);
	return steps;
}
const card = treeCard({
	title: "101. 对称二叉树",
	description:
		"判断二叉树是否关于根节点的竖直轴镜像对称。左右数值和空孩子的位置都需要镜像匹配。",
	idea: "每次比较镜像位置上的两个节点；外侧对外侧，内侧对内侧。两个都空可跳过，只有一个空或数值不同立即失败。",
	time: "O(n)",
	space: "O(n)，待比较队列；JS 已取出项也保留在数组中",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
