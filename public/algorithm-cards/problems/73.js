import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./73-code.js";
export const examples = [
	{
		label: "中心零",
		matrix: [
			[1, 1, 1],
			[1, 0, 1],
			[1, 1, 1],
		],
		note: "仅中心所在的行、列置零，角落保持 1。",
	},
	{
		label: "多个零",
		matrix: [
			[0, 1, 2],
			[3, 4, 0],
		],
		note: "记录两行和两列后，再统一修改。",
	},
	{
		label: "没有零",
		matrix: [
			[1, 2],
			[3, 4],
		],
		note: "行列集合为空，不修改矩阵。",
	},
	{ label: "单格零", matrix: [[0]], note: "记录第 0 行第 0 列，置零仍为 0。" },
];
export function buildTrace({ matrix: input }) {
	const matrix = structuredClone(input),
		rows = new Set(),
		columns = new Set(),
		{ steps, push } = recorder();
	let row = null,
		column = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			matrix,
			row,
			column,
			rows: [...rows],
			columns: [...columns],
			current: row !== null && column !== null ? [row, column] : null,
			answer,
		});
	save("init", "两个集合记录原始零所在的行和列。");
	for (row = 0; row < matrix.length; row++) {
		column = null;
		save("scanRow", `扫描第 ${row} 行。`);
		for (column = 0; column < matrix[0].length; column++) {
			save("scanColumn", `读取 (${row},${column})。`);
			save("zero", `此格为 0 → ${matrix[row][column] === 0}。`);
			if (matrix[row][column] === 0) {
				rows.add(row);
				columns.add(column);
				save("mark", "将原始零所在行、列加入集合。");
			}
		}
	}
	for (row = 0; row < matrix.length; row++) {
		column = null;
		save("writeRow", `修改第 ${row} 行。`);
		for (column = 0; column < matrix[0].length; column++) {
			save("writeColumn", `检查 (${row},${column}) 是否需要置零。`);
			save("check", `行或列被标记 → ${rows.has(row) || columns.has(column)}。`);
			if (rows.has(row) || columns.has(column)) {
				matrix[row][column] = 0;
				save("clear", "仅按原始标记写入 0。");
			}
		}
	}
	row = matrix.length - 1;
	column = matrix[0].length - 1;
	answer = structuredClone(matrix);
	save("result", "原地修改完成。");
	return steps;
}
const card = matrixCard({
	title: "73. 矩阵置零",
	description: "原矩阵某个元素为 0 时，将它所在整行和整列设为 0，原地修改。",
	idea: "教学版使用行列集合：先只读原矩阵，记录零的位置；第二轮写入，避免把新写的零当成原始零继续扩散。",
	time: "O(mn)",
	space: "O(m+n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["row", "当前行"],
		["column", "当前列"],
		["rows", "需要置零的行"],
		["columns", "需要置零的列"],
	],
});
export const template = card.template;
export const mount = card.mount;
