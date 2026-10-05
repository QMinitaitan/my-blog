import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./70-code.js";
export const examples = [
	{ label: "五级台阶", input: 5, note: "每一格 dp[i] 由前面两格相加得到。" },
	{ label: "一级", input: 1, note: "直接使用基础状态 dp[1] = 1。" },
	{ label: "两级", input: 2, note: "两种走法：1+1 或 2。" },
	{ label: "八级", input: 8, note: "观察已经算过的状态被反复复用。" },
];
export function buildTrace({ input: n }) {
	const dp = Array(n + 1).fill(0),
		{ steps, push } = recorder();
	let i = null;
	const save = (line, text) =>
		push(line, text, {
			values: dp,
			n,
			i,
			pointers: {
				i,
				"i-1": i === null ? null : i - 1,
				"i-2": i === null ? null : i - 2,
			},
			visualNote: "dp[i] = 到达第 i 级台阶的走法数。",
			answer: dp[n],
		});
	save("init", "dp 表创建，每格先填 0。");
	dp[0] = dp[1] = 1;
	save("base", "dp[0] = 1 表示什么也不做的一种走法；dp[1] = 1。");
	for (i = 2; i <= n; i++) {
		save("item", `准备更新 dp[${i}]，依赖前两格。`);
		const old = dp[i];
		dp[i] = dp[i - 1] + dp[i - 2];
		save(
			"update",
			`dp[${i}]：${old} → ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}。`,
		);
	}
	i = n;
	save("result", `返回 dp[${n}] = ${dp[n]}。`);
	return steps;
}
const card = sequenceCard({
	title: "70. 爬楼梯",
	difficulty: "简单",
	description: "每次可以爬 1 或 2 级台阶，求爬到第 n 级的不同走法数。",
	idea: "按最后一步分类：从 i - 1 爬一级，或从 i - 2 爬两级，所以 dp[i] 是前两格之和。",
	time: "O(n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["n", "台阶数量"],
		["i", "当前 DP 下标"],
	],
});
export const template = card.template;
export const mount = card.mount;
