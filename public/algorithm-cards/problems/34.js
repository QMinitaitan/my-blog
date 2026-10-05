import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./34-code.js";
export const examples = [
	{
		label: "重复目标",
		nums: [5, 7, 7, 8, 8, 10],
		target: 8,
		note: "找第一个 >=8 的位置，再找第一个 >=9 的位置减一。",
	},
	{
		label: "目标缺失",
		nums: [1, 3, 5],
		target: 4,
		note: "插入位置不等于目标，返回 [-1,-1]。",
	},
	{
		label: "全是目标",
		nums: [2, 2, 2],
		target: 2,
		note: "两个边界分别为 0 和数组末尾。",
	},
	{
		label: "空数组",
		nums: [],
		target: 0,
		note: "循环不进入，检查 start==len 后短路返回。",
	},
];
export function buildTrace({ nums, target }) {
	const { steps, push } = recorder();
	let left = null,
		right = null,
		mid = null,
		value = null,
		start = null,
		end = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			left,
			right,
			mid,
			value,
			start,
			end,
			answer,
			pointers: { left, right, mid },
			window: left !== null ? [left, right - 1] : null,
			final: line === "fail",
			visualNote: "搜索区间为 [left,right)，right 可以等于数组长度。",
		});
	const bound = (v) => {
		value = v;
		left = 0;
		right = nums.length;
		mid = null;
		save("init", `寻找第一个 >= ${v} 的下标。`);
		while (true) {
			save("loop", `left < right → ${left < right}。`);
			if (left >= right) break;
			mid = Math.floor((left + right) / 2);
			save("mid", `取中点 ${mid}。`);
			save("compare", `nums[mid] < ${v} → ${nums[mid] < v}。`);
			if (nums[mid] < v) {
				left = mid + 1;
				save("left", "中点太小，排除左半段。");
			} else {
				right = mid;
				save("right", "中点可能是边界，保留它并缩小右端。");
			}
		}
		save("bound", `本次边界返回 ${left}。`);
		return left;
	};
	start = bound(target);
	save("first", `第一个目标候选下标 ${start}。`);
	end = bound(target + 1) - 1;
	save("last", `严格大于目标的边界减一为 ${end}。`);
	save("found", "检查候选位置是否越界或不等于 target。");
	if (start === nums.length || nums[start] !== target) {
		answer = [-1, -1];
		save("fail", "没有目标，返回 [-1,-1]。");
	} else {
		answer = [start, end];
		save("result", "返回首次和末次出现位置。");
	}
	return steps;
}
const card = sequenceCard({
	title: "34. 在排序数组中查找元素的第一个和最后一个位置",
	description: "在非递减数组中找目标的首尾下标，不存在时返回 [-1,-1]。",
	idea: "两次查找左边界。第一次查 >=target，第二次查 >=target+1。整数目标的最后位置是第二个边界减一；Java/C++用更宽整数避免 target+1 溢出。",
	time: "O(log n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["value", "本次边界值"],
		["left", "包含的左端"],
		["right", "不包含的右端"],
		["mid", "中点"],
		["start", "首次位置"],
		["end", "末次位置"],
	],
});
export const template = card.template;
export const mount = card.mount;
