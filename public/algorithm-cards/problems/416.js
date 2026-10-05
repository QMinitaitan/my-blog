import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./416-code.js";
export const examples = [
	{
		label: "可等分",
		nums: [1, 5, 11, 5],
		note: "目标和 11 可以直接用 11，也可以用 1+5+5。",
	},
	{
		label: "总和为奇数",
		nums: [1, 2, 3, 5],
		note: "总和 11，无法等分，直接返回 false。",
	},
	{
		label: "偶数总和但不可等分",
		nums: [1, 2, 5],
		note: "目标和 4，任意子集都无法得到它。",
	},
	{
		label: "相同数各使用一次",
		nums: [2, 2],
		note: "相同数来自不同位置，属于两件独立的物品。",
	},
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let total = nums.reduce((a, b) => a + b, 0),
		target = null,
		dp = null,
		num = null,
		j = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: dp ?? nums,
			total,
			target,
			num,
			j,
			answer,
			pointers: dp
				? { j, "j-num": j === null || num === null ? null : j - num }
				: {},
			final: line === "fail",
			visualNote: dp
				? "dp[j] 表示已处理的数能否选出总和 j。true = 可以，false = 尚不能。"
				: "尚未建立 DP 表。",
		});
	save("sum", `总和 total = ${total}。`);
	save("odd", `总和为奇数 → ${total % 2 !== 0}。`);
	if (total % 2) {
		answer = false;
		save("fail", "无法把奇数总和分成两个相等整数，返回 false。");
		return steps;
	}
	target = total / 2;
	save("target", `目标和 target = ${target}。`);
	dp = Array(target + 1).fill(false);
	save("init", "创建 dp 表，所有和暂时不可达。");
	dp[0] = true;
	save("base", "不选任何数，就能得到总和 0。");
	for (num of nums) {
		j = null;
		save("item", `处理 num = ${num}，每个位置最多使用一次。`);
		for (j = target; j >= num; j--) {
			save("capacity", `倒序检查 j = ${j}，候选依赖 j-num = ${j - num}。`);
			const old = dp[j],
				dependency = old ? null : dp[j - num];
			dp[j] = old || dependency;
			save(
				"update",
				old
					? `dp[${j}] 已经为 true；or 短路，不读取 dp[${j - num}]，结果保持 true。`
					: `dp[${j}]：false → false or dp[${j - num}](${dependency}) = ${dp[j]}。`,
			);
		}
	}
	answer = dp[target];
	j = target;
	save("result", `返回 dp[${target}] = ${answer}。`);
	return steps;
}
const card = sequenceCard({
	title: "416. 分割等和子集",
	description: "给定正整数数组，判断能否把所有元素分为两组，使两组的和相等。",
	idea: "先把问题转为选出总和一半的子集。dp[j] 记录能否凑出 j，倒序更新防止同一个数被重复使用。",
	time: "O(n·target)",
	space: "O(target)",
	codes,
	examples,
	buildTrace,
	variables: [
		["total", "总和"],
		["target", "目标和"],
		["num", "本轮数字"],
		["j", "当前 DP 下标"],
	],
});
export const template = card.template;
export const mount = card.mount;
