import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./53-code.js";
export const examples = [
	{
		label: "混合正负",
		nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
		note: "最优区间是 4、-1、2、1。",
	},
	{
		label: "全负数",
		nums: [-3, -1, -2],
		note: "必须选至少一个元素，不能把空子数组的 0 当成答案。",
	},
	{ label: "单元素", nums: [5], note: "不进入循环，返回元素本身。" },
	{
		label: "重新开始",
		nums: [-5, 4, -1, 2],
		note: "负前缀被丢弃，在 4 处重新开始。",
	},
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let current = nums[0],
		best = null,
		i = 0,
		start = 0,
		bestRange = [0, 0];
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			current,
			best,
			i,
			pointers: { i, start },
			completed:
				line === "result"
					? Array.from(
							{ length: bestRange[1] - bestRange[0] + 1 },
							(_, j) => j + bestRange[0],
						)
					: [],
			visualNote: `当前连续区间：[${start}, ${i}]`,
			answer: best,
		});
	save("init", "current 是以第 0 个元素结尾的最大和。");
	best = current;
	save("bestInit", "best 保存全局最大和。");
	for (i = 1; i < nums.length; i++) {
		save("item", `考察 nums[${i}] = ${nums[i]}。`);
		const old = current;
		if (old < 0) start = i;
		current = Math.max(nums[i], old + nums[i]);
		save(
			"current",
			old < 0 ? "前缀和为负，从当前元素重新开始。" : "接上之前的连续区间。",
		);
		if (current > best) bestRange = [start, i];
		best = Math.max(best, current);
		save("best", "更新全局最大和。");
	}
	i = nums.length - 1;
	save("result", `返回 ${best}。`);
	return steps;
}
const card = sequenceCard({
	title: "53. 最大子数组和",
	description:
		"找出至少包含一个元素的连续子数组，使它的元素和最大，返回最大和。",
	idea: "current 表示必须以当前位置结尾的最大和；比较重新开始和接上前缀这两种选择。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前下标"],
		["current", "以当前位置结尾的最大和"],
		["best", "全局最大和"],
	],
});
export const template = card.template;
export const mount = card.mount;
