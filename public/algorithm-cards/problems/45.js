import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./45-code.js";
export const examples = [
	{
		label: "两跳到达",
		nums: [2, 3, 1, 1, 4],
		note: "第一层覆盖到 2，第二层能覆盖终点。",
	},
	{ label: "单元素", nums: [0], note: "不进入循环，跳数为 0。" },
	{
		label: "一步一步",
		nums: [1, 1, 1, 1],
		note: "每个位置都是本层边界，都需要增加一跳。",
	},
	{
		label: "起点直达",
		nums: [5, 0, 0, 0],
		note: "只在起点增加一次跳数，之后不再到达层边界。",
	},
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let end = 0,
		farthest = 0,
		jumps = 0,
		i = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			end,
			farthest,
			jumps,
			i,
			pointers: { i, end, farthest },
			visualNote: `本层覆盖到 ${end}；下一层最远到 ${farthest}`,
			answer: jumps,
		});
	save("init", "从第 0 跳的起点层开始。");
	for (i = 0; i < nums.length - 1; i++) {
		save("item", `扫描下标 ${i}，终点无需再次起跳。`);
		farthest = Math.max(farthest, i + nums[i]);
		save("extend", "扩展下一跳的最远覆盖位置。");
		save("boundary", `是否到达本层边界 → ${i === end}。`);
		if (i === end) {
			jumps++;
			save("count", "跨入下一层，跳数加 1。");
			end = farthest;
			save("end", "更新本层边界。");
		}
	}
	i = nums.length > 1 ? nums.length - 2 : null;
	save("result", `返回最少跳数 ${jumps}。`);
	return steps;
}
const card = sequenceCard({
	title: "45. 跳跃游戏 II",
	description: "从下标 0 到最后一个位置，求最少跳跃次数。题目保证终点可达。",
	idea: "把一跳可达范围看作一层。扫完本层再进入下一层，能得到最少跳数。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "扫描位置"],
		["end", "本层边界"],
		["farthest", "下一层最远位置"],
		["jumps", "已使用跳数"],
	],
});
export const template = card.template;
export const mount = card.mount;
