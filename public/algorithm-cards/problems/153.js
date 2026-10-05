import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./153-code.js";
export const examples = [
	{
		label: "转折在中间",
		nums: [3, 4, 5, 1, 2],
		note: "中点比右端大，最小值在右边。",
	},
	{
		label: "未发生变化",
		nums: [1, 2, 3, 4],
		note: "中点比右端小，可以保留左侧。",
	},
	{
		label: "最小值在末尾",
		nums: [2, 3, 4, 1],
		note: "不断排除左段，最终落在最后一个元素。",
	},
	{ label: "单元素", nums: [5], note: "不进入循环，直接返回唯一元素。" },
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let left = 0,
		right = nums.length - 1,
		mid = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			left,
			right,
			mid,
			pointers: { left, mid, right },
			answer: nums[left],
			completed: line === "result" ? [left] : [],
			visualNote: `候选区间 [${left}, ${right}]，两端都包含。`,
		});
	save("init", "最小值在整个数组范围内。");
	while (true) {
		save("check", `left < right → ${left < right}。`);
		if (left >= right) break;
		mid = Math.floor((left + right) / 2);
		save("mid", `计算中点 ${mid}。`);
		save("compare", `nums[mid] > nums[right] → ${nums[mid] > nums[right]}。`);
		if (nums[mid] > nums[right]) {
			left = mid + 1;
			save("left", "中点在较大的左段，最小值在它右边。");
		} else {
			right = mid;
			save("right", "中点在较小的右段，最小值可能就是中点。");
		}
	}
	save("result", `返回 nums[${left}] = ${nums[left]}。`);
	return steps;
}
const card = sequenceCard({
	title: "153. 寻找旋转排序数组中的最小值",
	description: "一个没有重复值的递增数组经过旋转，找出其中最小元素。",
	idea: "比较中点和右端，判断中点位于转折的哪一侧，每次保留仍可能包含最小值的半区。",
	time: "O(log n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["left", "左边界"],
		["right", "右边界"],
		["mid", "当前中点"],
	],
});
export const template = card.template;
export const mount = card.mount;
