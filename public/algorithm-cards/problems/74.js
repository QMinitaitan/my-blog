import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./74-code.js";
export const examples = [
	{
		label: "跨行找到",
		matrix: [
			[1, 3, 5],
			[7, 9, 11],
		],
		target: 9,
		note: "一维下标 4 对应第 1 行第 1 列。",
	},
	{
		label: "数值缺失",
		matrix: [
			[1, 3, 5],
			[7, 9, 11],
		],
		target: 6,
		note: "最后区间为空，返回 false。",
	},
	{ label: "单格命中", matrix: [[2]], target: 2, note: "只执行一次中点比较。" },
	{
		label: "目标在范围外",
		matrix: [[2, 4]],
		target: 9,
		note: "不断排除左侧，最终 left > right。",
	},
];
export function buildTrace({ matrix, target }) {
	const { steps, push } = recorder(),
		columns = matrix[0].length;
	let left = 0,
		right = matrix.length * columns - 1,
		mid = null,
		row = null,
		column = null,
		answer = null;
	const visited = [];
	const save = (line, text) =>
		push(line, text, {
			matrix,
			target,
			left,
			right,
			mid,
			row,
			column,
			columns,
			visited,
			current: row === null ? null : [row, column],
			answer,
			final: line === "hit",
		});
	save("init", "将逐行读出的矩阵视为一段严格递增数组。");
	while (true) {
		save("loop", `left <= right → ${left <= right}。`);
		if (left > right) break;
		mid = Math.floor((left + right) / 2);
		save("mid", `一维中点下标 ${mid}。`);
		row = Math.floor(mid / columns);
		column = mid % columns;
		save(
			"coordinate",
			`${mid} / ${columns}：商为行 ${row}，余数为列 ${column}。`,
		);
		visited.push([row, column]);
		save("match", `当前值等于 target → ${matrix[row][column] === target}。`);
		if (matrix[row][column] === target) {
			answer = true;
			save("hit", "找到目标，返回 true。");
			return steps;
		}
		save("compare", `当前值小于 target → ${matrix[row][column] < target}。`);
		if (matrix[row][column] < target) {
			left = mid + 1;
			save("left", "目标更大，排除中点及左半。");
		} else {
			right = mid - 1;
			save("right", "目标更小，排除中点及右半。");
		}
	}
	answer = false;
	save("result", "区间为空，返回 false。");
	return steps;
}
const card = matrixCard({
	title: "74. 搜索二维矩阵",
	description: "每行递增且下一行首元素大于上一行末元素，判断 target 是否存在。",
	idea: "矩阵按行读就是有序数组。下标 mid 用 mid//列数、mid%列数定位，不必复制扁平数组。",
	time: "O(log(mn))",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["target", "目标"],
		["left", "一维左端"],
		["right", "一维右端"],
		["mid", "一维中点"],
		["row", "行"],
		["column", "列"],
	],
});
export const template = card.template;
export const mount = card.mount;
