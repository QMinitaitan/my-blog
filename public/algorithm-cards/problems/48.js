import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./48-code.js";
export const examples = [
	{
		label: "三阶方阵",
		matrix: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		],
		note: "转置后第一行为 1,4,7，再反转成为 7,4,1。",
	},
	{
		label: "二阶方阵",
		matrix: [
			[1, 2],
			[3, 4],
		],
		note: "观察两个非对角格交换后，每行左右反转。",
	},
	{ label: "单格", matrix: [[5]], note: "没有需要交换的元素，原地保持 5。" },
	{
		label: "负数与重复",
		matrix: [
			[-1, 0],
			[0, -1],
		],
		note: "位置规则与数值大小无关。",
	},
];
export function buildTrace({ matrix: input }) {
	const matrix = structuredClone(input),
		n = matrix.length,
		{ steps, push } = recorder();
	let row = null,
		column = null,
		left = null,
		right = null,
		current = null,
		dependencies = [],
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			matrix,
			row,
			column,
			left,
			right,
			current,
			dependencies,
			answer,
		});
	save("init", "旋转 = 转置后反转各行，不分配新矩阵。");
	for (row = 0; row < n; row++) {
		column = null;
		current = null;
		dependencies = [];
		save("row", `转置第 ${row} 行的上三角部分。`);
		for (column = row + 1; column < n; column++) {
			current = [row, column];
			dependencies = [[column, row]];
			save("column", "对角线另一侧是交换对象。");
			[matrix[row][column], matrix[column][row]] = [
				matrix[column][row],
				matrix[row][column],
			];
			save("swap", "交换两个关于主对角线对称的位置。");
		}
	}
	for (row = 0; row < n; row++) {
		current = null;
		dependencies = [];
		save("reverseRow", `反转第 ${row} 行。`);
		left = 0;
		right = n - 1;
		save("ends", "左右端指向本行两侧。");
		while (true) {
			current = [row, left];
			dependencies = [[row, right]];
			save("check", `left < right → ${left < right}。`);
			if (left >= right) break;
			[matrix[row][left], matrix[row][right]] = [
				matrix[row][right],
				matrix[row][left],
			];
			save("flip", "交换本行左右端。");
			left++;
			right--;
			current = [row, left];
			dependencies = [[row, right]];
			save("move", "两端向中间靠拢。");
		}
	}
	row = n - 1;
	answer = structuredClone(matrix);
	save("result", "原地旋转完成，画面展示修改后的矩阵。");
	return steps;
}
const card = matrixCard({
	title: "48. 旋转图像",
	description: "将 n×n 方阵原地顺时针旋转 90°，不能用另一个矩阵存结果。",
	idea: "原位置 (row,column) 先转置到 (column,row)，再行内反转到 (column,n-1-row)，这正是顺时针旋转位置。",
	time: "O(n²)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["row", "当前行"],
		["column", "转置列"],
		["left", "反转左端"],
		["right", "反转右端"],
	],
});
export const template = card.template;
export const mount = card.mount;
