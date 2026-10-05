import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./198-code.js";
export const examples = [
	{
		label: "交替选择",
		nums: [2, 7, 9, 3, 1],
		note: "偷 2、9、1 共 12，不能同时偷相邻房屋。",
	},
	{
		label: "选择前后两间",
		nums: [2, 1, 1, 2],
		note: "不必固定奇偶位置，最优选择是第一间和最后一间。",
	},
	{ label: "单房屋", nums: [5], note: "基础状态 dp[1] 直接给出答案。" },
	{ label: "没有金额", nums: [0, 0], note: "零是合法金额，答案为 0。" },
];
export function buildTrace({ nums }) {
	const dp = Array(nums.length + 1).fill(0),
		{ steps, push } = recorder();
	let i = null;
	const save = (line, text) =>
		push(line, text, {
			values: dp,
			auxiliary: nums,
			auxiliaryName: "nums · 各房屋金额（房屋下标比 dp 下标小 1）",
			i,
			pointers: {
				i,
				"i-1": i === null ? null : i - 1,
				"i-2": i === null ? null : i - 2,
			},
			visualNote: "dp[i] = 前 i 间房屋能得到的最大金额。",
			answer: dp.at(-1),
		});
	save("init", "dp[0] = 0，前 0 间房屋没有收入。");
	dp[1] = nums[0];
	save("base", "前 1 间房屋的最优金额是 nums[0]。");
	for (i = 2; i <= nums.length; i++) {
		save("item", `处理前 ${i} 间房屋。`);
		const old = dp[i],
			skip = dp[i - 1],
			take = dp[i - 2] + nums[i - 1];
		dp[i] = Math.max(skip, take);
		save(
			"update",
			`dp[${i}]：${old} → max(不偷 ${skip}, 偷 ${take}) = ${dp[i]}。`,
		);
	}
	i = nums.length;
	save("result", `返回最大金额 ${dp.at(-1)}。`);
	return steps;
}
const card = sequenceCard({
	title: "198. 打家劫舍",
	description: "每间房屋有一定金额，不能选择相邻房屋，求能获得的最大总金额。",
	idea: "每间房屋有偷和不偷两种选择。偷当前房屋加 dp[i-2]，不偷则沿用 dp[i-1]。",
	time: "O(n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [["i", "考虑前 i 间房屋"]],
});
export const template = card.template;
export const mount = card.mount;
