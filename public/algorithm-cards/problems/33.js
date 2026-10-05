import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./33-code.js";
export const examples = [
	{
		label: "旋转后找到",
		nums: [4, 5, 6, 7, 0, 1, 2],
		target: 0,
		note: "先识别左半有序但目标不在其中，保留右半。",
	},
	{
		label: "目标缺失",
		nums: [4, 5, 6, 7, 0, 1, 2],
		target: 3,
		note: "区间逐渐变空，返回 -1。",
	},
	{
		label: "右半有序",
		nums: [6, 7, 0, 1, 2, 4, 5],
		target: 7,
		note: "右半有序，但目标在另一半。",
	},
	{ label: "单元素", nums: [1], target: 1, note: "第一次比较就命中。" },
];
export function buildTrace({ nums, target }) {
	const { steps, push } = recorder();
	let left = 0,
		right = nums.length - 1,
		mid = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			left,
			right,
			mid,
			target,
			answer,
			pointers: { left, right, mid },
			window: [left, right],
			final: line === "hit",
		});
	save("init", "搜索闭区间 [left,right]。");
	while (true) {
		save("loop", `left <= right → ${left <= right}。`);
		if (left > right) break;
		mid = Math.floor((left + right) / 2);
		save("mid", `中点值 ${nums[mid]}。`);
		save("match", `nums[mid] == target → ${nums[mid] === target}。`);
		if (nums[mid] === target) {
			answer = mid;
			save("hit", "命中目标，立即返回下标。");
			return steps;
		}
		const sortedLeft = nums[left] <= nums[mid];
		save("side", `左半段有序 → ${sortedLeft}。`);
		if (sortedLeft) {
			const inside = nums[left] <= target && target < nums[mid];
			save("inLeft", `target 在左半有序范围 → ${inside}。`);
			if (inside) {
				right = mid - 1;
				save("keepLeft", "保留左半。");
			} else {
				left = mid + 1;
				save("discardLeft", "排除左半。");
			}
		} else {
			const inside = nums[mid] < target && target <= nums[right];
			save("inRight", `target 在右半有序范围 → ${inside}。`);
			if (inside) {
				left = mid + 1;
				save("keepRight", "保留右半。");
			} else {
				right = mid - 1;
				save("discardRight", "排除右半。");
			}
		}
	}
	answer = -1;
	save("result", "搜索区间为空，没有找到目标。");
	return steps;
}
const card = sequenceCard({
	title: "33. 搜索旋转排序数组",
	description: "互不相同的升序数组旋转后，找 target 下标，找不到返回 -1。",
	idea: "每次中点把区间分成两半，至少一半仍有序。先判断目标是否在有序半段的值域，再决定保留哪一半。",
	time: "O(log n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["target", "目标"],
		["left", "左端"],
		["right", "右端"],
		["mid", "中点"],
	],
});
export const template = card.template;
export const mount = card.mount;
