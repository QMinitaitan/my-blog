import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./994-code.js";
export const examples = [
	{
		label: "四分钟扩散",
		grid: [
			[2, 1, 1],
			[1, 1, 0],
			[0, 1, 1],
		],
		note: "固定本层 size，每分钟只处理上一分钟已腐烂的橘子。",
	},
	{
		label: "无法到达",
		grid: [
			[2, 1, 1],
			[0, 1, 1],
			[1, 0, 1],
		],
		note: "左下角被空格隔开，最终 fresh>0，返回 -1。",
	},
	{ label: "没有新鲜橘子", grid: [[0, 2]], note: "不需要扩散，分钟数为 0。" },
	{
		label: "多个起点",
		grid: [[2, 1, 1, 2]],
		note: "两端同时扩散，中间两格在同一分钟变腐烂。",
	},
];
export function buildTrace({ grid: input }) {
	const grid = structuredClone(input),
		m = grid.length,
		n = grid[0].length,
		queue = [],
		visited = [],
		{ steps, push } = recorder();
	let fresh = 0,
		minutes = 0,
		r = null,
		c = null,
		row = null,
		column = null,
		nr = null,
		nc = null,
		size = null,
		current = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			matrix: grid,
			visitedLabel: "已感染",
			queue,
			visited,
			fresh,
			minutes,
			size,
			r,
			c,
			row,
			column,
			nr,
			nc,
			current,
			answer,
			final: line === "fail",
		});
	save("init", "队列收集所有初始腐烂橘子，fresh 记录新鲜数量。");
	for (r = 0; r < m; r++) {
		current = null;
		save("row", `扫描行 ${r}。`);
		for (c = 0; c < n; c++) {
			current = [r, c];
			save("column", `扫描 (${r},${c})。`);
			save("rotten", `该格为腐烂橘子 2 → ${grid[r][c] === 2}。`);
			if (grid[r][c] === 2) {
				queue.push([r, c]);
				save("seed", "腐烂起点入队。");
			} else {
				save("freshCheck", `该格为新鲜橘子 1 → ${grid[r][c] === 1}。`);
				if (grid[r][c] === 1) {
					fresh++;
					save("fresh", "新鲜数量加一。");
				}
			}
		}
		c = n - 1;
	}
	r = m - 1;
	current = null;
	while (true) {
		save("loop", `队列非空且仍有新鲜橘子 → ${queue.length > 0 && fresh > 0}。`);
		if (!queue.length || fresh === 0) break;
		size = queue.length;
		save("size", `固定本分钟原有 ${size} 个传播起点。`);
		minutes++;
		save("minute", `开始第 ${minutes} 分钟，同一分钟感染依次展示。`);
		for (let count = 0; count < size; count++) {
			save("scan", `处理本层第 ${count + 1} 个起点。`);
			[row, column] = queue.shift();
			current = [row, column];
			save("pop", "队首传播起点出队。");
			for (const [dr, dc] of [
				[0, 1],
				[1, 0],
				[0, -1],
				[-1, 0],
			]) {
				nr = row + dr;
				nc = column + dc;
				save("neighbor", `检查邻居 (${nr},${nc})。`);
				const valid =
					nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1;
				save("check", `边界内且新鲜 → ${valid}。`);
				if (valid) {
					grid[nr][nc] = 2;
					visited.push([nr, nc]);
					current = [nr, nc];
					save("infect", "邻居变为腐烂，避免重复感染。");
					fresh--;
					save("decrease", "新鲜橘子数减一。");
					queue.push([nr, nc]);
					save("push", "新感染格加入下一分钟的传播队列。");
					current = [row, column];
				}
			}
		}
	}
	save("remaining", `仍有新鲜橘子 → ${fresh > 0}。`);
	if (fresh > 0) {
		answer = -1;
		save("fail", "队列已无法传播，但仍有新鲜橘子。");
	} else {
		answer = minutes;
		save("result", "所有新鲜橘子已腐烂，返回分钟数。");
	}
	return steps;
}
const card = matrixCard({
	title: "994. 腐烂的橘子",
	description:
		"0 为空格、1 为新鲜、2 为腐烂；每分钟腐烂橘子使上下左右新鲜邻居腐烂，求最少分钟或 -1。",
	idea: "把全部初始腐烂格同时加入 BFS。每分钟先固定队列长度，新感染格留给下一分钟；入队立即标记为 2，防止重复计数。JavaScript 用 head 跳过已处理项，避免 shift 的线性开销。",
	time: "O(mn)",
	space: "O(mn)",
	codes,
	examples,
	buildTrace,
	variables: [
		["minutes", "已开始的分钟"],
		["fresh", "剩余新鲜数"],
		["size", "本分钟传播起点数"],
		["queue", "待处理队列（头在左）"],
	],
});
export const template = card.template;
export const mount = card.mount;
