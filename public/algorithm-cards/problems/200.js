import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./200-code.js";
export const examples = [
	{
		label: "三个岛",
		grid: [
			["1", "1", "0"],
			["0", "0", "1"],
			["1", "0", "1"],
		],
		note: "只认上下左右，斜对角的陆地不相连。",
	},
	{
		label: "全陆地",
		grid: [
			["1", "1"],
			["1", "1"],
		],
		note: "第一次发现岛后，DFS 把整块陆地标记完。",
	},
	{
		label: "全水",
		grid: [
			["0", "0"],
			["0", "0"],
		],
		note: "没有启动过 DFS，结果为 0。",
	},
	{ label: "单格岛", grid: [["1"]], note: "四个邻居都越界，只有一个岛。" },
];
export function buildTrace({ grid: input }) {
	const grid = structuredClone(input),
		m = grid.length,
		n = grid[0].length,
		{ steps, push } = recorder(),
		visited = [];
	let answer = 0,
		r = null,
		c = null,
		row = null,
		column = null,
		nr = null,
		nc = null,
		stack = null,
		cell = null;
	const save = (line, text) =>
		push(line, text, {
			matrix: grid,
			visitedLabel: "已发现",
			r,
			c,
			row,
			column,
			nr,
			nc,
			stack,
			visited,
			current: cell,
			answer,
		});
	save("init", "按格扫描，发现未访问的陆地就启动一个岛的搜索。");
	for (r = 0; r < m; r++) {
		cell = null;
		save("scanRow", `扫描第 ${r} 行。`);
		for (c = 0; c < n; c++) {
			cell = [r, c];
			save("scanColumn", `读取 (${r},${c})。`);
			save("land", `当前格为未访问陆地 '1' → ${grid[r][c] === "1"}。`);
			if (grid[r][c] === "1") {
				answer++;
				save("island", `发现新岛，计数变为 ${answer}。`);
				grid[r][c] = "0";
				visited.push([r, c]);
				save("markStart", "将起点改为 0 标记已发现，绿框与原始水区别。");
				stack = [[r, c]];
				save("initStack", "起点加入待访问栈。");
				while (true) {
					save("loop", `栈非空 → ${stack.length > 0}。`);
					if (!stack.length) break;
					[row, column] = stack.pop();
					cell = [row, column];
					save("pop", "弹出一个待访问格，搜索它的邻居。");
					for (const [dr, dc] of [
						[0, 1],
						[1, 0],
						[0, -1],
						[-1, 0],
					]) {
						nr = row + dr;
						nc = column + dc;
						save("neighbor", `候选邻居 (${nr},${nc})。`);
						const valid =
							nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === "1";
						save("check", `在边界内且是未访问陆地 → ${valid}。`);
						if (valid) {
							grid[nr][nc] = "0";
							visited.push([nr, nc]);
							cell = [nr, nc];
							save("mark", "入栈前立即标记，避免同一格重复加入。");
							stack.push([nr, nc]);
							save("push", "邻居入栈，稍后继续搜索。");
							cell = [row, column];
						}
					}
				}
			}
		}
		c = n - 1;
	}
	r = m - 1;
	c = n - 1;
	cell = null;
	save("result", "所有格已扫描，返回岛屿数。");
	return steps;
}
const card = matrixCard({
	title: "200. 岛屿数量",
	description:
		"字符网格中 1 为陆地、0 为水，上下左右相连的陆地构成岛屿，求数量。",
	idea: "扫描发现一个未访问的 1 就计一个岛，用显式栈把整块连通陆地改为 0。入栈前标记，避免重复搜索；不使用递归，长条岛也不会耗尽调用栈。",
	time: "O(mn)",
	space: "O(mn)，最坏待访问栈",
	codes,
	examples,
	buildTrace,
	variables: [
		["r", "扫描行"],
		["c", "扫描列"],
		["row", "正在搜索的行"],
		["column", "正在搜索的列"],
		["stack", "DFS 栈（底到顶）"],
		["answer", "已发现岛数"],
	],
});
export const template = card.template;
export const mount = card.mount;
