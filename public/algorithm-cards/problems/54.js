import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./54-code.js";
export const examples = [
	{
		label: "三乘三",
		matrix: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		],
		note: "按右、下、左、上行走；遇边界或已访问格就右转。",
	},
	{
		label: "长方形",
		matrix: [
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 10, 11, 12],
		],
		note: "外圈结束后进入内圈，不重复访问。",
	},
	{
		label: "单行",
		matrix: [[1, 2, 3]],
		note: "最后一次移动可能指向无效位置，但已无下一次访问。",
	},
	{ label: "单列", matrix: [[1], [2], [3]], note: "一开始向右无路，转向下。" },
];
export function buildTrace({ matrix }) {
	const m = matrix.length,
		n = matrix[0].length,
		seen = Array.from({ length: m }, () => Array(n).fill(false)),
		directions = [
			[0, 1],
			[1, 0],
			[0, -1],
			[-1, 0],
		],
		visited = [],
		answer = [],
		{ steps, push } = recorder();
	let row = 0,
		column = 0,
		direction = 0,
		nextRow = null,
		nextColumn = null;
	const save = (line, text) =>
		push(line, text, {
			matrix,
			row,
			column,
			direction,
			nextRow,
			nextColumn,
			visited,
			answer,
			current: [row, column],
		});
	save("init", "方向顺序为右、下、左、上；初始在左上角。");
	for (let count = 0; count < m * n; count++) {
		save("scan", `访问第 ${count + 1} 个格。`);
		answer.push(matrix[row][column]);
		save("collect", "当前格数值加入答案。");
		seen[row][column] = true;
		visited.push([row, column]);
		save("mark", "标记当前格已访问，之后不能再次进入。");
		nextRow = row + directions[direction][0];
		save("nextRow", "计算保持方向时的下一行。");
		nextColumn = column + directions[direction][1];
		save("nextColumn", "计算下一列。");
		const blocked =
			nextRow < 0 ||
			nextRow >= m ||
			nextColumn < 0 ||
			nextColumn >= n ||
			seen[nextRow][nextColumn];
		save("check", `下一位置越界或已访问 → ${blocked}。`);
		if (blocked) {
			direction = (direction + 1) % 4;
			save("turn", `顺时针转向 ${["右", "下", "左", "上"][direction]}。`);
		}
		row += directions[direction][0];
		column += directions[direction][1];
		save("move", "沿确定方向移动；最后一次移动后不再访问。");
	}
	save("result", "已经读取恰好 m*n 个格，返回结果。");
	return steps;
}
const card = matrixCard({
	title: "54. 螺旋矩阵",
	description: "按顺时针螺旋顺序返回矩阵所有元素。",
	idea: "教学版记录 visited，并按右、下、左、上循环。每次先读取，再判断下一格是否可进入；遇阻就顺时针转向。",
	time: "O(mn)",
	space: "O(mn)，包括访问标记和结果",
	codes,
	examples,
	buildTrace,
	variables: [
		["row", "当前行"],
		["column", "当前列"],
		["direction", "0右1下2左3上"],
		["nextRow", "候选下一行"],
		["nextColumn", "候选下一列"],
	],
});
export const template = card.template;
export const mount = card.mount;
