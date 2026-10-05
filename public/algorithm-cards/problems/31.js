import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./31-code.js";
export const examples = [
	{
		label: "普通递增",
		nums: [1, 2, 3],
		note: "最后一个可增大的位置是 2，交换 2 和 3。",
	},
	{
		label: "最大排列",
		nums: [3, 2, 1],
		note: "没有可增大的位置，反转整段回到最小排列。",
	},
	{
		label: "重复值",
		nums: [1, 5, 5],
		note: "需要严格更大，不能只交换两个相同的 5。",
	},
	{
		label: "需要整理后缀",
		nums: [1, 3, 2],
		note: "先换成 2,3,1，再反转后缀得到 2,1,3。",
	},
];
export function buildTrace({ nums: input }) {
	const nums = [...input],
		{ steps, push } = recorder();
	let i = nums.length - 2,
		j = null,
		left = null,
		right = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			i,
			j,
			left,
			right,
			answer,
			pointers: { i, j, left, right },
		});
	save("init", "从右寻找第一个可以增大的位置。");
	while (true) {
		save(
			"check",
			`i 非负且 nums[i] >= nums[i+1] → ${i >= 0 && nums[i] >= nums[i + 1]}。`,
		);
		if (i < 0 || nums[i] < nums[i + 1]) break;
		i--;
		save("left", "当前位置不能增大，向左继续。");
	}
	save("pivot", `存在可增大的位置 → ${i >= 0}。`);
	if (i >= 0) {
		j = nums.length - 1;
		save("right", "从后缀最右端寻找刚好更大的值。");
		while (true) {
			save("greater", `nums[j] <= nums[i] → ${nums[j] <= nums[i]}。`);
			if (nums[j] > nums[i]) break;
			j--;
			save("find", "继续向左找严格更大的值。");
		}
		[nums[i], nums[j]] = [nums[j], nums[i]];
		save("swap", "交换枢轴与后缀中最小的更大值。");
	}
	left = i + 1;
	right = nums.length - 1;
	save("reverse", "反转后缀，将它变成最小升序排列。");
	while (true) {
		save("range", `left < right → ${left < right}。`);
		if (left >= right) break;
		[nums[left], nums[right]] = [nums[right], nums[left]];
		save("flip", "交换后缀两端。");
		left++;
		right--;
		save("move", "两端向中间靠拢。");
	}
	answer = [...nums];
	save("result", "原地修改完成；函数不返回数组，画面展示修改结果。");
	return steps;
}
const card = sequenceCard({
	title: "31. 下一个排列",
	description: "原地把数组改成字典序中紧邻的更大排列；最大排列则改为最小排列。",
	idea: "从右找上升位置，换成后缀中刚好更大的值，再把降序后缀反转。例 [1,3,2] → [2,3,1] → [2,1,3]。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "枢轴位置"],
		["j", "交换位置"],
		["left", "反转左端"],
		["right", "反转右端"],
	],
});
export const template = card.template;
export const mount = card.mount;
