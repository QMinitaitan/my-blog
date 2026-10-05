import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./42-code.js";
export const examples = [
	{
		label: "多个凹槽",
		height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
		note: "左右分别累计，已结算的柱子不会再处理。",
	},
	{
		label: "两侧围墙",
		height: [4, 2, 0, 3, 2, 5],
		note: "左侧最高墙决定中间每个位置的水量。",
	},
	{
		label: "单调上升",
		height: [1, 2, 3, 4],
		note: "没有凹槽，每次新增水量都为 0。",
	},
	{ label: "单柱", height: [2], note: "没有左右围墙，结果为 0。" },
];
export function buildTrace({ height }) {
	const { steps, push } = recorder();
	let left = 0,
		right = height.length - 1,
		left_max = null,
		right_max = null,
		water = null;
	const levels = height.map(() => null),
		completed = [];
	const save = (line, text) =>
		push(line, text, {
			values: height,
			left,
			right,
			left_max,
			right_max,
			water,
			pointers: { left, right },
			completed,
			waterLevels: levels,
			visualNote: `每柱已结算水量：${levels.map((v) => (v === null ? "—" : v)).join(" / ")}`,
			answer: water,
		});
	save("init", "设置左右指针。");
	left_max = right_max = water = 0;
	save("maxima", "最高墙与累计水量初始化为 0。");
	while (true) {
		save("check", `判断 left <= right → ${left <= right}。`);
		if (left > right) break;
		save(
			"compare",
			`比较两端，左端不高于右端 → ${height[left] <= height[right]}。`,
		);
		if (height[left] <= height[right]) {
			left_max = Math.max(left_max, height[left]);
			save("leftMax", "更新左侧最高墙。");
			levels[left] = left_max - height[left];
			water += levels[left];
			completed.push(left);
			save("leftWater", `下标 ${left} 接水 ${levels[left]}，累计 ${water}。`);
			left++;
			save("left", "左指针前进。");
		} else {
			right_max = Math.max(right_max, height[right]);
			save("rightMax", "更新右侧最高墙。");
			levels[right] = right_max - height[right];
			water += levels[right];
			completed.push(right);
			save(
				"rightWater",
				`下标 ${right} 接水 ${levels[right]}，累计 ${water}。`,
			);
			right--;
			save("right", "右指针后退。");
		}
	}
	save("result", `所有柱子已结算，返回 ${water}。`);
	return steps;
}
const card = sequenceCard({
	display: "bars",
	title: "42. 接雨水",
	difficulty: "困难",
	description: "每根柱子宽度为 1，计算下雨后柱子之间总共能存多少水。",
	idea: "从较低的一端结算。该端的历史最高墙决定当前水位，另一端足以提供围墙。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["left", "左边待结算位置"],
		["right", "右边待结算位置"],
		["left_max", "左侧最高墙"],
		["right_max", "右侧最高墙"],
		["water", "累计水量"],
	],
});
export const template = card.template;
export const mount = card.mount;
