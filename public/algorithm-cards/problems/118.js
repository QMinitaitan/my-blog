import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./118-code.js";
export const examples = [
	{
		label: "五行",
		numRows: 5,
		input: 5,
		note: "第四行内部 3 = 上一行的 1+2，边缘保持 1。",
	},
	{ label: "一行", numRows: 1, input: 1, note: "最小合法行数，返回 [[1]]。" },
	{
		label: "两行",
		numRows: 2,
		input: 2,
		note: "两行都没有内部格，只需要边缘 1。",
	},
	{
		label: "三行",
		numRows: 3,
		input: 3,
		note: "首次出现内部格，更新为 1+1=2。",
	},
];
export function buildTrace({ numRows }) {
	const triangle = [],
		{ steps, push } = recorder();
	let r = null,
		c = null,
		rowValues = null,
		attached = true,
		dependencies = [];
	const save = (line, text) =>
		push(line, text, {
			matrix: attached ? triangle : [...triangle, rowValues],
			r,
			c,
			rowValues,
			dependencies,
			current: r !== null && c !== null ? [r, c] : null,
			answer: triangle,
		});
	save("init", "triangle 初始为空。");
	for (r = 0; r < numRows; r++) {
		c = null;
		dependencies = [];
		save("row", `构造下标 ${r} 的行，共 ${r + 1} 个格。`);
		rowValues = Array(r + 1).fill(1);
		attached = false;
		save("create", "本行先填 1，边缘不再修改；内部稍后覆盖。");
		for (c = 1; c < r; c++) {
			dependencies = [
				[r - 1, c - 1],
				[r - 1, c],
			];
			save("column", `内部格 ${c} 依赖上一行相邻两个值。`);
			rowValues[c] = triangle[r - 1][c - 1] + triangle[r - 1][c];
			save(
				"update",
				`rowValues[${c}] = ${triangle[r - 1][c - 1]}+${triangle[r - 1][c]} = ${rowValues[c]}。`,
			);
		}
		c = r > 1 ? r - 1 : null;
		triangle.push(rowValues);
		attached = true;
		save("append", "本行构造完成，加入 triangle。");
	}
	r = numRows - 1;
	save("result", "返回前 numRows 行。");
	return steps;
}
const card = matrixCard({
	title: "118. 杨辉三角",
	description:
		"生成杨辉三角的前 numRows 行：两边为 1，内部等于上一行相邻两个数字之和。",
	idea: "第 r 行有 r+1 个格。先填 1，再只更新内部下标 1～r-1；如 [1,2,1] 的下一行内部是 1+2、2+1。",
	time: "O(numRows²)",
	space: "O(numRows²)，包括结果",
	codes,
	examples,
	buildTrace,
	variables: [
		["r", "当前行下标"],
		["c", "内部列下标"],
		["rowValues", "尚在构造的行"],
	],
});
export const template = card.template;
export const mount = card.mount;
