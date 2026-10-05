import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./279-code.js";
export const examples = [
	{
		label: "三个平方数",
		input: 12,
		note: "12 = 4+4+4；考虑 1、4、9 作为最后一项。",
	},
	{ label: "两个平方数", input: 13, note: "13 = 4+9，比用十三个 1 更少。" },
	{
		label: "本身为平方数",
		input: 9,
		note: "选平方数 9 时依赖 dp[0]，只需一个数。",
	},
	{ label: "最小输入", input: 1, note: "1 本身就是平方数。" },
];
export function buildTrace({ input: n }) {
	const dp = [0, ...Array(n).fill(n + 1)],
		{ steps, push } = recorder();
	let amount = null,
		root = null,
		square = null;
	const save = (line, text) =>
		push(line, text, {
			values: dp,
			n,
			amount,
			root,
			square,
			pointers: {
				amount,
				"amount-square":
					amount === null || square === null ? null : amount - square,
			},
			visualNote: `dp[x] 表示组成 x 最少需要几个平方数；${n + 1} 暂时表示未算出的上界。`,
			answer: dp[n],
		});
	save("init", "dp[0] = 0，其余格使用 n + 1 作为初始上界。");
	for (amount = 1; amount <= n; amount++) {
		save("amount", `计算总和 ${amount}。`);
		root = 1;
		save("root", "从平方根 1 开始枚举。");
		while (true) {
			save("check", `root² <= amount → ${root * root <= amount}。`);
			if (root * root > amount) break;
			square = root * root;
			save("square", `当前平方数 ${square}。`);
			const old = dp[amount];
			dp[amount] = Math.min(old, dp[amount - square] + 1);
			save(
				"update",
				`dp[${amount}]：${old} → min(${old}, dp[${amount - square}] + 1) = ${dp[amount]}。`,
			);
			root++;
			save("advance", "尝试下一个平方根。");
		}
	}
	amount = n;
	save("result", `返回 dp[${n}] = ${dp[n]}。`);
	return steps;
}
const card = sequenceCard({
	title: "279. 完全平方数",
	description:
		"用若干个正的完全平方数相加得到 n，平方数可以重复使用，返回最少数量。",
	idea: "枚举最后加上的平方数 square，候选数量是 dp[amount-square]+1，再取最小值。",
	time: "O(n√n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["amount", "当前目标和"],
		["root", "正在枚举的平方根"],
		["square", "本次平方数"],
	],
});
export const template = card.template;
export const mount = card.mount;
