import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./51-code.js";
export const examples = [
	{
		label: "四皇后",
		n: 4,
		note: "一行放一个皇后，冲突时跳过；返回后先撤销集合再清空棋盘。共有两种解。",
	},
	{
		label: "无解",
		n: 2,
		note: "第一行无论放哪里，第二行都发生列或对角线冲突。",
	},
	{ label: "唯一格子", n: 1, note: "放置后进入 row=1，保存单个 Q。" },
	{
		label: "更多分支",
		n: 5,
		note: "观察对角线 row-col 与 row+col 集合如何阻止冲突。",
	},
];
export function buildTrace({ n }) {
	const { steps, push } = recorder(),
		board = Array.from({ length: n }, () => Array(n).fill(".")),
		cols = new Set(),
		down = new Set(),
		up = new Set(),
		answer = [],
		calls = [];
	let row = null,
		col = null;
	const save = (line, text, final = false) =>
		push(line, text, {
			matrix: board,
			visitedLabel: "已放皇后",
			current: row === null || col === null ? null : [row, col],
			visited: board.flatMap((a, r) =>
				a.flatMap((v, c) => (v === "Q" ? [[r, c]] : [])),
			),
			row,
			col,
			cols: [...cols],
			down: [...down],
			up: [...up],
			answer,
			calls,
			final,
		});
	save("init", "空棋盘和三组冲突标记。");
	save("start", "从第 0 行开始。");
	function dfs(r) {
		row = r;
		col = null;
		calls.push(r);
		save("complete", `row == n → ${r === n}。`);
		if (r === n) {
			answer.push(board.map((a) => a.join("")));
			save("collect", "复制棋盘，保存完整方案。");
			save("done", "已放满 n 行，返回。");
			calls.pop();
			return;
		}
		for (let c = 0; c < n; c++) {
			row = r;
			col = c;
			save("scan", `尝试 (${r},${c})。`);
			const conflict = cols.has(c) || down.has(r - c) || up.has(r + c);
			save("conflict", `列或对角线冲突 → ${conflict}。`);
			if (conflict) {
				save("skip", "冲突，跳过这个位置。");
				continue;
			}
			board[r][c] = "Q";
			save("place", "棋盘放置皇后。");
			cols.add(c);
			down.add(r - c);
			up.add(r + c);
			save("mark", "标记列和两条对角线。");
			save("recurse", "进入下一行。");
			dfs(r + 1);
			row = r;
			col = c;
			cols.delete(c);
			down.delete(r - c);
			up.delete(r + c);
			save("unmark", "递归返回，撤销冲突标记。");
			board[r][c] = ".";
			save("undo", "清空当前格，继续尝试下一列。");
		}
		calls.pop();
	}
	dfs(0);
	row = col = null;
	save("result", "所有分支探索结束，返回全部方案。", true);
	return steps;
}
const card = matrixCard({
	title: "51. N 皇后",
	description:
		"在 n×n 棋盘放 n 个皇后，任意两个不能同行、同列或同对角线。返回所有棋盘方案，用 Q 和 . 表示。",
	idea: "按行递归自然避免同行。列号 col 相同或 row-col、row+col 相同表示冲突。例如 (0,1) 和 (1,2) 的 row-col 都为 -1，因此不能同时放。每次递归后恢复棋盘与集合。",
	time: "O(n·n! + S·n²)，S 为解数，计入逐行试列和结果复制",
	space: "O(n²)，不计结果，棋盘加递归与集合",
	codes,
	examples,
	buildTrace,
	variables: [
		["row", "当前行"],
		["col", "尝试列"],
		["cols", "占用列"],
		["down", "占用 row-col"],
		["up", "占用 row+col"],
		["calls", "递归行栈"],
		["answer", "已保存方案"],
	],
});
export const template = card.template;
export const mount = card.mount;
