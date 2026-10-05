import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./64-code.js";
export const examples = [
	{
		label: "绕开大值",
		grid: [
			[1, 3, 1],
			[1, 5, 1],
			[4, 2, 1],
		],
		note: "到终点的最小和为 7，DP 逐格比较两条来源。",
	},
	{ label: "单行", grid: [[1, 2, 3]], note: "首行只能从左方进入。" },
	{ label: "单列", grid: [[1], [2], [3]], note: "首列只能从上方进入。" },
	{
		label: "零值",
		grid: [
			[0, 0],
			[0, 0],
		],
		note: "零是合法路径和，与尚未处理的格区分开。",
	},
];
export function buildTrace({ grid }) {
	const m = grid.length,
		n = grid[0].length,
		dp = Array.from({ length: m }, () => Array(n).fill(0)),
		{ steps, push } = recorder(),
		visited = [];
	let row = null,
		column = null,
		answer = null,
		dependencies = [];
	const save = (line, text) =>
		push(line, text, {
			matrix: grid,
			dp,
			row,
			column,
			answer,
			current: row !== null && column !== null ? [row, column] : null,
			dependencies,
			visited,
		});
	save("init", "分配 dp，每个格初值为 0；处理标记区分未处理的格。");
	for (row = 0; row < m; row++) {
		column = null;
		dependencies = [];
		save("row", `进入第 ${row} 行。`);
		for (column = 0; column < n; column++) {
			dependencies = [];
			save("column", `计算 (${row},${column})。`);
			save("start", `是否起点 → ${row === 0 && column === 0}。`);
			if (row === 0 && column === 0) {
				dp[row][column] = grid[row][column];
				visited.push([row, column]);
				save("origin", "起点最小和就是起点数值。");
			} else {
				save("top", `是否首行 → ${row === 0}。`);
				if (row === 0) {
					dependencies = [[row, column - 1]];
					dp[row][column] = dp[row][column - 1] + grid[row][column];
					visited.push([row, column]);
					save("fromLeft", "首行只能从左边进入，累加当前值。");
				} else {
					save("edge", `是否首列 → ${column === 0}。`);
					if (column === 0) {
						dependencies = [[row - 1, column]];
						dp[row][column] = dp[row - 1][column] + grid[row][column];
						visited.push([row, column]);
						save("fromTop", "首列只能从上方进入，累加当前值。");
					} else {
						dependencies = [
							[row - 1, column],
							[row, column - 1],
						];
						const old = dp[row][column];
						dp[row][column] =
							Math.min(dp[row - 1][column], dp[row][column - 1]) +
							grid[row][column];
						visited.push([row, column]);
						save(
							"update",
							`${old} → min(${dp[row - 1][column]},${dp[row][column - 1]})+${grid[row][column]} = ${dp[row][column]}。`,
						);
					}
				}
			}
		}
	}
	row = m - 1;
	column = n - 1;
	answer = dp[row][column];
	save("result", "返回右下角的最小路径和。");
	return steps;
}
const card = matrixCard({
	title: "64. 最小路径和",
	description:
		"非负整数网格中，只能向右或向下，求从左上到右下经过数字的最小总和。",
	idea: "dp[row][column] 表示走到当前格的最小和。内部格选上方、左方中较小的路径，再加当前值；首行首列单独处理。",
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
