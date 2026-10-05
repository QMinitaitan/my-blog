import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./11-code.js";
export const examples = [
	{
		label: "典型短板选择",
		height: [1, 8, 6, 2, 5, 4, 8, 3, 7],
		note: "观察短板移动，最优面积来自下标 1 与 8。",
	},
	{
		label: "相等高度",
		height: [4, 4, 4, 4],
		note: "高度相等时移动左边，宽度缩小。",
	},
	{ label: "最小输入", height: [1, 1], note: "只计算一个容器。" },
	{
		label: "零高度",
		height: [0, 2, 0, 3, 0],
		note: "端点为 0 时面积为 0，先离开零高度。",
	},
];
export function buildTrace({ height }) {
	const { steps, push } = recorder();
	let left = 0,
		right = height.length - 1,
		best = 0,
		area = null,
		bestPair = [];
	const save = (line, text) =>
		push(line, text, {
			values: height,
			left,
			right,
			best,
			area,
			pointers: { left, right },
			completed: line === "result" ? bestPair : [],
			visualNote:
				area === null
					? "尚未计算容器面积"
					: `当前已计算面积 ${area}；最大面积 ${best}`,
			answer: best,
		});
	save("init", "从最左与最右两根柱子开始。");
	while (true) {
		save("check", `判断 left < right → ${left < right}。`);
		if (left >= right) break;
		area = Math.min(height[left], height[right]) * (right - left);
		save(
			"area",
			`宽度 ${right - left} × 短板高度 ${Math.min(height[left], height[right])} = ${area}。`,
		);
		if (area > best) bestPair = [left, right];
		best = Math.max(best, area);
		save("best", "更新目前最大的面积。");
		save("compare", `左柱是否不高于右柱 → ${height[left] <= height[right]}。`);
		if (height[left] <= height[right]) {
			left++;
			save("left", "移动左边短板，寻找可能更高的柱子。");
		} else {
			right--;
			save("right", "移动右边短板，寻找可能更高的柱子。");
		}
	}
	save("result", `两指针相遇，返回最大面积 ${best}。`);
	return steps;
}
const card = sequenceCard({
	display: "bars",
	title: "11. 盛最多水的容器",
	description: "选择两根竖线和横轴形成容器，返回可容纳的最大水量。",
	idea: "面积由短板高度与两柱距离决定，每次移动较短的一侧。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["left", "左柱下标"],
		["right", "右柱下标"],
		["area", "刚计算的面积"],
		["best", "最大面积"],
	],
});
export const template = card.template;
export const mount = card.mount;
