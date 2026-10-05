import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./79-code.js";
export const examples = [
	{
		label: "折线路径",
		board: [
			["A", "B", "C", "E"],
			["S", "F", "C", "S"],
			["A", "D", "E", "E"],
		],
		word: "ABCCED",
		note: "只允许上下左右相邻，绿色标记表示当前递归路径，回退时消失。",
	},
	{
		label: "不可重复格子",
		board: [["A", "B"]],
		word: "ABA",
		note: "最后一个 A 不能再次使用起点，返回 False。",
	},
	{
		label: "先失败后命中",
		board: [
			["A", "B"],
			["A", "C"],
		],
		word: "AC",
		note: "从左上 A 尝试失败；换左下 A 后向右找到 C。",
	},
	{
		label: "单格",
		board: [["Z"]],
		word: "Z",
		note: "匹配唯一字符后，index 达到长度，返回 True 并清理访问标记。",
	},
];
export function buildTrace({ board, word }) {
	const { steps, push } = recorder(),
		rows = board.length,
		columns = board[0].length,
		visited = new Set(),
		calls = [];
	let row = null,
		col = null,
		index = null,
		dr = null,
		dc = null,
		answer = null;
	const save = (line, text, final = false) =>
		push(line, text, {
			matrix: board,
			visitedLabel: "当前路径",
			current: row === null || col === null ? null : [row, col],
			visited: [...visited].map((key) => [
				Math.floor(key / columns),
				key % columns,
			]),
			word,
			row,
			col,
			index,
			dr,
			dc,
			calls,
			answer,
			final,
		});
	save("init", "创建当前路径访问集合，不修改原棋盘。");
	function dfs(r, c, i) {
		const f = { row: r, col: c, index: i, dr: null, dc: null };
		calls.push(f);
		const restore = () => {
			row = r;
			col = c;
			index = i;
			dr = f.dr;
			dc = f.dc;
		};
		restore();
		save("complete", `index 等于 word 长度 → ${i === word.length}。`);
		if (i === word.length) {
			save("done", "所有字符已匹配，本次调用返回 True。");
			calls.pop();
			return true;
		}
		const invalid =
			r < 0 ||
			r >= rows ||
			c < 0 ||
			c >= columns ||
			visited.has(r * columns + c) ||
			board[r][c] !== word[i];
		save("invalid", `越界、格子已用或字符不匹配 → ${invalid}。`);
		if (invalid) {
			save("reject", "这一方向无法匹配，返回 False。");
			calls.pop();
			return false;
		}
		visited.add(r * columns + c);
		save("mark", "该格加入当前路径。");
		for (const [a, b] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		]) {
			f.dr = a;
			f.dc = b;
			restore();
			save("direction", `方向 (${a},${b})。`);
			save("recurse", "递归相邻格子，匹配下一个字符。");
			const found = dfs(r + a, c + b, i + 1);
			restore();
			save("recurse", `相邻调用返回 ${found}。`);
			if (found) {
				visited.delete(r * columns + c);
				save("restoreHit", "返回成功前也恢复访问集合。");
				save("hit", "当前调用返回 True。");
				calls.pop();
				return true;
			}
		}
		visited.delete(r * columns + c);
		save("undo", "四个方向都失败，撤销当前格。");
		save("fail", "当前调用返回 False。");
		calls.pop();
		return false;
	}
	for (let r = 0; r < rows; r++) {
		row = r;
		save("row", `起点行 ${r}。`);
		for (let c = 0; c < columns; c++) {
			row = r;
			col = c;
			index = null;
			dr = dc = null;
			save("col", `尝试起点 (${r},${c})。`);
			save("start", "从该格匹配第 0 个字符。");
			const found = dfs(r, c, 0);
			row = r;
			col = c;
			index = null;
			dr = dc = null;
			save("start", `起点调用返回 ${found}。`);
			if (found) {
				answer = true;
				save("found", "已找到一条合法路径，整题返回 True。", true);
				return steps;
			}
		}
	}
	answer = false;
	save("result", "所有起点均失败，返回 False。", true);
	return steps;
}
const card = matrixCard({
	title: "79. 单词搜索",
	description:
		"在字符网格中寻找 word。连续字符只能使用上下左右相邻格，同一格在一条路径中不能重复使用。",
	idea: "每个格都尝试作起点，匹配成功就标记当前路径，再试四个方向。失败时撤销标记，让其他路径仍可使用该格。例如 A→B→A 若只来自两个格就不合法。",
	time: "O(mn·4^L)，L 为单词长度的搜索上界",
	space: "O(min(L,mn))，路径集合及递归栈；Java/C++ bool 表另占 O(mn)",
	codes,
	examples,
	buildTrace,
	variables: [
		["word", "目标单词"],
		["index", "待匹配字符下标"],
		["row", "当前行"],
		["col", "当前列"],
		["dr", "方向行增量"],
		["dc", "方向列增量"],
		["calls", "递归路径帧"],
	],
});
export const template = card.template;
export const mount = card.mount;
