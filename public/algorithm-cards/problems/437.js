import { treeCard, decodeTree } from "../shared/tree-card.js";
import { treeTrace } from "../shared/tree-trace.js";
import { codes } from "./437-code.js";
export const examples = [
	{
		label: "从中间开始的路径",
		input: [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1],
		targetSum: 8,
		note: "可从 5 开始，5→3 和 5→2→1 都计入；路径只能向下。",
	},
	{
		label: "重复前缀",
		input: [0, 0, 0],
		targetSum: 0,
		note: "相同前缀保存次数；每个单节点和两个根子路径共 5 条。",
	},
	{
		label: "兄弟分支隔离",
		input: [1, 2, 2],
		targetSum: 0,
		note: "退出左侧时回退计数，不能跨左右孩子拼路径。",
	},
	{
		label: "空树",
		input: [],
		targetSum: 1,
		note: "返回 0，初始前缀 {0:1} 表示根前的空路径。",
	},
];
export function buildTrace({ input, targetSum }) {
	const tree = decodeTree(input),
		trace = treeTrace(tree),
		prefix = new Map([[0, 1]]);
	let answer = null;
	const save = (line, text, f, final = false) =>
		trace.save(
			line,
			text,
			{
				node: f?.node?.val ?? null,
				curr: f?.curr ?? null,
				targetSum,
				count: f?.count ?? null,
				prefix: Object.fromEntries(prefix),
			},
			{ current: f?.node?.id ?? null, answer, final },
		);
	save("init", "空路径前缀 0 先计一次。");
	save("start", "从根以 curr=0 开始。");
	function dfs(node, curr) {
		const f = { node, curr, count: null };
		trace.stack.push(f);
		save("empty", `node 为空 → ${!node}。`, f);
		if (!node) {
			save("nil", "空子树贡献 0 条路径。", f);
			trace.stack.pop();
			return 0;
		}
		f.curr += node.val;
		save("sum", "累加当前节点得到当前根路径前缀。", f);
		f.count = prefix.get(f.curr - targetSum) || 0;
		save(
			"query",
			`查询前缀 ${f.curr - targetSum} 的次数，得到 ${f.count} 条以当前节点结尾的路径。`,
			f,
		);
		prefix.set(f.curr, (prefix.get(f.curr) || 0) + 1);
		save("insert", "当前前缀进入活动路径。", f);
		save("left", "递归左子树。", f);
		f.count += dfs(node.left, f.curr);
		save("left", "累加左子树返回路径数。", f);
		save("right", "递归右子树。", f);
		f.count += dfs(node.right, f.curr);
		save("right", "累加右子树返回路径数。", f);
		prefix.set(f.curr, prefix.get(f.curr) - 1);
		save("undo", "离开当前节点，前缀次数减一。", f);
		save("result", `当前子树合计 ${f.count} 条路径，返回。`, f);
		trace.stack.pop();
		return f.count;
	}
	answer = dfs(tree, 0);
	save("start", "最外层调用返回总路径数。", null, true);
	return trace.steps;
}
const card = treeCard({
	title: "437. 路径总和 III",
	description:
		"统计树中节点值之和等于 targetSum 的路径条数。起点和终点任意，但路径只能从父节点向孩子向下走。",
	idea: "当前前缀 curr 减去某个祖先之前的前缀，等于这段向下路径之和；因此查询 curr-targetSum 的出现次数。prefix 只包含当前根路径，递归退出时必须减回。",
	time: "O(n)，哈希查询平均 O(1)",
	space: "O(n)，前缀字典与递归栈",
	codes,
	examples,
	buildTrace,
});
export const template = card.template;
export const mount = card.mount;
