import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./240-code.js";
export const examples = [
	{
		label: "阶梯搜索",
		matrix: [
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
		],
		target: 5,
		note: "7 太大向左，4 太小向下，找到 5。",
	},
	{
		label: "行间交错",
		matrix: [
			[1, 4],
			[2, 5],
		],
		target: 2,
		note: "本题不能用题 74 的扁平二分。",
	},
	{
		label: "不存在",
		matrix: [
			[1, 4],
			[2, 5],
		],
		target: 3,
		note: "沿阶梯走出边界时结束。",
	},
	{ label: "单格", matrix: [[1]], target: 0, note: "向左一步后 column=-1。" },
];
export function buildTrace({ matrix, target }) {
	const { steps, push } = recorder(),
		visited = [];
	let row = 0,
		column = matrix[0].length - 1,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			matrix,
			target,
			row,
			column,
			visited,
			current: [row, column],
			answer,
			final: line === "hit",
		});
	save("init", "从右上角开始：左边更小，下边更大。");
	while (true) {
		save("loop", `行列仍在边界内 → ${row < matrix.length && column >= 0}。`);
		if (row >= matrix.length || column < 0) break;
		visited.push([row, column]);
		save(
			"match",
			`当前值 ${matrix[row][column]} 等于 ${target} → ${matrix[row][column] === target}。`,
		);
		if (matrix[row][column] === target) {
			answer = true;
			save("hit", "找到目标，返回 true。");
			return steps;
		}
		save("compare", `当前值大于目标 → ${matrix[row][column] > target}。`);
		if (matrix[row][column] > target) {
			column--;
			save("left", "此列下面也太大，排除此列，向左。");
		} else {
			row++;
			save("down", "此行左边也太小，排除此行，向下。");
		}
	}
	answer = false;
	save("result", "走出矩阵，目标不存在。");
	return steps;
}
const card = matrixCard({
	title: "240. 搜索二维矩阵 II",
	description: "各行从左到右、各列从上到下非递减，判断目标是否存在。",
	idea: "右上角是分界点。比目标大就向左，比目标小就向下；每次排除整行或整列。",
	time: "O(m+n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["target", "目标"],
		["row", "当前行"],
		["column", "当前列"],
	],
});
export const template = card.template;
export const mount = card.mount;
