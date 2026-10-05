import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./35-code.js";
export const examples = [
	{
		label: "找到目标",
		nums: [1, 3, 5, 6],
		target: 5,
		note: "找第一个不小于 target 的下标。",
	},
	{
		label: "插入中间",
		nums: [1, 3, 5, 6],
		target: 2,
		note: "即使目标不存在，收缩后的 left 仍是插入位置。",
	},
	{
		label: "插入末尾",
		nums: [1, 3, 5, 6],
		target: 7,
		note: "right 是半开边界，可以等于数组长度。",
	},
	{ label: "插入开头", nums: [1], target: 0, note: "最小输入返回 0。" },
];
export function buildTrace({ nums, target }) {
	const { steps, push } = recorder();
	let left = 0,
		right = nums.length,
		mid = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			left,
			right,
			mid,
			target,
			pointers: { left, mid, right },
			visualNote: `待查区间 [${left}, ${right})；右边界不包含在内。`,
			answer: left,
		});
	save("init", "设置半开区间 [0, n)。");
	while (true) {
		save("check", `left < right → ${left < right}。`);
		if (left >= right) break;
		mid = Math.floor((left + right) / 2);
		save("mid", `中点下标 ${mid}。`);
		save("compare", `nums[mid] < target → ${nums[mid] < target}。`);
		if (nums[mid] < target) {
			left = mid + 1;
			save("left", "目标位置一定在中点右边，排除中点。");
		} else {
			right = mid;
			save("right", "中点可能是答案，保留它作为右边界。");
		}
	}
	save("result", `返回插入位置 ${left}。`);
	return steps;
}
const card = sequenceCard({
	title: "35. 搜索插入位置",
	difficulty: "简单",
	description:
		"在严格递增数组中找目标下标；目标不存在时，返回保持排序的插入下标。",
	idea: "用半开区间寻找第一个不小于 target 的元素，循环结束时 left 就是插入位置。",
	time: "O(log n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["left", "左边界"],
		["right", "不包含的右边界"],
		["mid", "当前中点"],
		["target", "目标值"],
	],
});
export const template = card.template;
export const mount = card.mount;
