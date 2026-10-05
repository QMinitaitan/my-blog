import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./84-code.js";
export const examples = [
	{
		label: "结算高度 5",
		heights: [2, 1, 5, 6, 2, 3],
		note: "遇到 2 时，先弹出 6，再弹出 5；高度 5 跨两根柱子，面积 10。",
	},
	{
		label: "递增序列",
		heights: [1, 2, 3],
		note: "扫描时不弹出，最后虚拟高度 0 统一结算。",
	},
	{
		label: "等高柱子",
		heights: [2, 2],
		note: "使用严格大于，保留等高下标，最后得到宽度 2。",
	},
	{
		label: "高度为零",
		heights: [0],
		note: "面积始终为 0，零高度符合题目约束。",
	},
];
export function buildTrace({ heights }) {
	const { steps, push } = recorder(),
		stack = [];
	let answer = 0,
		right = null,
		current = null,
		index = null,
		height = null,
		left = null,
		width = null;
	const save = (line, text) =>
		push(line, text, {
			values: heights,
			stack,
			answer,
			right,
			current,
			index,
			height,
			left,
			width,
			pointers: { right, 结算: index },
			window: line === "area" ? [left + 1, right - 1] : null,
			visualNote:
				right === heights.length
					? "right=n：虚拟高度 0，只用于结算，输入没有新增元素。"
					: "",
		});
	save("init", "单调栈存柱子下标，初始面积为 0。");
	for (right = 0; right <= heights.length; right++) {
		save("scan", `扫描 right=${right}。`);
		current = right < heights.length ? heights[right] : 0;
		save("height", `当前高度为 ${current}。`);
		while (true) {
			const lower = stack.length > 0 && heights[stack.at(-1)] > current;
			save("lower", `栈顶柱子高于当前高度 → ${lower}。`);
			if (!lower) break;
			index = stack.pop();
			save("pop", "弹出要结算的柱子下标。");
			height = heights[index];
			save("bar", "以弹出柱子高度作为矩形高度。");
			left = stack.at(-1) ?? -1;
			save("left", `左边界是 ${left}，-1 表示左侧没有更矮柱子。`);
			width = right - left - 1;
			save("width", `可用范围 (${left},${right})，宽度 ${width}。`);
			answer = Math.max(answer, height * width);
			save("area", `面积 ${height}×${width}，最大面积 ${answer}。`);
		}
		stack.push(right);
		save("append", "当前下标入栈。");
	}
	right = heights.length;
	save("result", "返回已结算的最大矩形面积。");
	return steps;
}
const card = sequenceCard({
	title: "84. 柱状图中最大的矩形",
	description:
		"每根柱子宽度为 1，选择连续柱子围成矩形，矩形高度不能超过其中最低的柱子。求最大面积。",
	idea: "高度递增栈保留尚未遇到右侧更矮柱子的下标。遇到矮柱子时弹栈：新栈顶给左边界，当前 right 给右边界。例如高度 5、6 遇到 2，可以结算 5×2=10。",
	time: "O(n)，每个下标最多入栈出栈一次",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	display: "bars",
	variables: [
		["right", "扫描位置"],
		["current", "当前/虚拟高度"],
		["stack", "待结算下标"],
		["height", "结算高度"],
		["left", "左侧边界"],
		["width", "可用宽度"],
		["answer", "最大面积"],
	],
});
export const template = card.template;
export const mount = card.mount;
