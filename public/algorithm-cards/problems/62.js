import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./62-code.js";
export const examples = [
	{ label: "三乘三", m: 3, n: 3, note: "中间格路径数 = 上方 1 + 左方 1 = 2。" },
	{ label: "单行", m: 1, n: 4, note: "只能一直向右，结果为 1。" },
	{ label: "单列", m: 4, n: 1, note: "只能一直向下，结果为 1。" },
	{ label: "单格", m: 1, n: 1, note: "起点就是终点，结果为 1。" },
];
export function buildTrace({ m, n }) {
	const dp = Array.from({ length: m }, () => Array(n).fill(1)),
		{ steps, push } = recorder();
	let row = null,
		column = null,
		answer = null,
		dependencies = [];
	const save = (line, text) =>
		push(line, text, {
			matrix: dp,
			row,
			column,
			m,
			n,
			answer,
			current: row !== null && column !== null ? [row, column] : null,
			dependencies,
		});
	save("init", "全部初始化为 1，内部格稍后覆盖；边界保留 1。");
	for (row = 1; row < m; row++) {
		column = null;
		dependencies = [];
		save("row", `进入第 ${row} 行。`);
		for (column = 1; column < n; column++) {
			dependencies = [
				[row - 1, column],
				[row, column - 1],
			];
			save("column", `计算格 (${row},${column})，读取上方和左方。`);
			const old = dp[row][column];
			dp[row][column] = dp[row - 1][column] + dp[row][column - 1];
			save(
				"update",
				`${old} → ${dp[row - 1][column]} + ${dp[row][column - 1]} = ${dp[row][column]}。`,
			);
		}
	}
	row = m > 1 ? m - 1 : null;
	column = m > 1 && n > 1 ? n - 1 : null;
	answer = dp[m - 1][n - 1];
	save("result", "返回右下角的路径数。");
	return steps;
}
const card = matrixCard({
	title: "62. 不同路径",
	description:
		"从 m×n 网格左上角出发，每次只能向右或向下，求到右下角的路径数。",
	idea: "到一个内部格的最后一步只能来自上方或左方，把两者路径数相加。网格显示的数字就是实际 dp 数组。",
	time: "O(mn)",
	space: "O(mn)",
	codes,
	examples,
	buildTrace,
	variables: [
		["row", "当前行"],
		["column", "当前列"],
	],
});
export const template = card.template;
export const mount = card.mount;
