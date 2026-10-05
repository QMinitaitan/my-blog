import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./300-code.js";
export const examples = [
	{
		label: "非连续子序列",
		nums: [10, 9, 2, 5, 3, 7, 101, 18],
		note: "可以跳过元素，最长长度为 4。",
	},
	{
		label: "全部相等",
		nums: [7, 7, 7],
		note: "必须严格递增，相同元素不能接在后面。",
	},
	{ label: "严格下降", nums: [3, 2, 1], note: "每个 dp 都保持 1。" },
	{ label: "单元素", nums: [0], note: "一个元素本身就是长度 1 的子序列。" },
];
export function buildTrace({ nums }) {
	const dp = nums.map(() => 1),
		{ steps, push } = recorder();
	let i = null,
		j = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			auxiliary: dp,
			auxiliaryName: "dp · 以该位置结尾的最长递增子序列长度",
			i,
			j,
			answer,
			pointers: { i, j },
		});
	save("init", "每个元素自己构成一个长度 1 的子序列。");
	for (i = 0; i < nums.length; i++) {
		save("item", `准备计算以 nums[${i}] 结尾的长度。`);
		for (j = 0; j < i; j++) {
			save("previous", `尝试把 nums[${i}] 接在下标 ${j} 的子序列后。`);
			save("compare", `${nums[j]} < ${nums[i]} → ${nums[j] < nums[i]}。`);
			if (nums[j] < nums[i]) {
				const old = dp[i];
				dp[i] = Math.max(dp[i], dp[j] + 1);
				save(
					"update",
					`dp[${i}]：${old} → max(${old}, ${dp[j]} + 1) = ${dp[i]}。`,
				);
			}
		}
	}
	i = nums.length - 1;
	j = i > 0 ? i - 1 : null;
	answer = Math.max(...dp);
	save(
		"result",
		`最长序列不一定结束在最后一格，返回整个 dp 表的最大值 ${answer}。`,
	);
	return steps;
}
const card = sequenceCard({
	title: "300. 最长递增子序列",
	description:
		"从数组中按原顺序挑选元素，求严格递增的最长子序列长度。选中的元素不必相邻。",
	idea: "dp[i] 是以 nums[i] 结尾的最长长度。遍历前面的 j，只有 nums[j] < nums[i] 才能接上。",
	time: "O(n²)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前末尾"],
		["j", "尝试连接的位置"],
	],
});
export const template = card.template;
export const mount = card.mount;
