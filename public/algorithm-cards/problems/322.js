import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./322-code.js";
export const examples = [
	{
		label: "普通找零",
		nums: [1, 2, 5],
		amount: 11,
		note: "11 = 5+5+1，共三枚；同种硬币可以重复使用。",
	},
	{
		label: "无法凑出",
		nums: [2],
		amount: 3,
		note: "所有可达金额为偶数，最终返回 -1。",
	},
	{ label: "零金额", nums: [1], amount: 0, note: "不需要硬币，dp[0] = 0。" },
	{
		label: "贪心会失败",
		nums: [1, 3, 4],
		amount: 6,
		note: "3+3 只需两枚，先选最大的 4 反而需三枚。",
	},
];
export function buildTrace({ nums: coins, amount }) {
	const dp = [0, ...Array(amount).fill(amount + 1)],
		{ steps, push } = recorder();
	let total = null,
		coin = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: dp,
			total,
			coin,
			amount,
			answer,
			pointers: {
				total,
				"total-coin": total === null || coin === null ? null : total - coin,
			},
			final: line === "fail",
			visualNote: `coins = ${JSON.stringify(coins)}；dp[x] = 凑出 x 所需最少硬币数，${amount + 1} 表示未凑出。`,
		});
	save("init", "dp[0] = 0，其余格初始化为 amount + 1。");
	for (total = 1; total <= amount; total++) {
		save("total", `计算金额 ${total}。`);
		for (coin of coins) {
			save("coin", `尝试最后一枚硬币 ${coin}。`);
			save("check", `coin <= total → ${coin <= total}。`);
			if (coin <= total) {
				const old = dp[total];
				dp[total] = Math.min(old, dp[total - coin] + 1);
				save(
					"update",
					`dp[${total}]：${old} → min(${old}, dp[${total - coin}] + 1) = ${dp[total]}。`,
				);
			}
		}
	}
	total = amount > 0 ? amount : null;
	save("reachable", `dp[amount] > amount → ${dp[amount] > amount}。`);
	if (dp[amount] > amount) {
		answer = -1;
		save("fail", "不能凑出目标金额，返回 -1。");
	} else {
		answer = dp[amount];
		save("result", `返回最少硬币数 ${answer}。`);
	}
	return steps;
}
const card = sequenceCard({
	title: "322. 零钱兑换",
	description: "每种硬币数量无限，用最少硬币凑出目标金额，凑不出返回 -1。",
	idea: "按金额从小到大计算，枚举最后一枚硬币 coin，把 dp[total-coin]+1 作为候选。",
	time: "O(amount·m)，m 为币种数",
	space: "O(amount)",
	codes,
	examples,
	buildTrace,
	variables: [
		["amount", "目标金额"],
		["total", "当前金额"],
		["coin", "本次硬币"],
	],
});
export const template = card.template;
export const mount = card.mount;
