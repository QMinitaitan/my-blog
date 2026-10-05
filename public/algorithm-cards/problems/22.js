import { backtrackingCard } from "../shared/backtracking-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./22-code.js";
export const examples = [
	{ label: "一对", n: 1, note: "先放左括号，再放右括号，唯一结果 ()。" },
	{
		label: "两对",
		n: 2,
		note: "生成 (()) 和 ()()，从不让右括号数超过左括号。",
	},
	{ label: "三对", n: 3, note: "观察深度优先搜索如何回退并生成 5 个结果。" },
];
export function buildTrace({ n }) {
	const path = [],
		answer = [],
		calls = [],
		{ steps, push } = recorder();
	let opened = null,
		closed = null,
		i = null;
	const save = (line, text) =>
		push(line, text, {
			candidates: ["(", ")"],
			path,
			answer,
			calls,
			opened,
			closed,
			i,
		});
	save("init", "初始化路径和结果。");
	save("start", "从 opened=0、closed=0 开始。");
	function dfs(o, c) {
		opened = o;
		closed = c;
		i = null;
		calls.push({ opened: o, closed: c });
		save("complete", `长度等于 2*n → ${path.length === 2 * n}。`);
		if (path.length === 2 * n) {
			answer.push(path.join(""));
			save("collect", "完整合法括号串加入结果。");
			save("done", "本次调用返回。");
			calls.pop();
			return;
		}
		save("openCheck", `opened < n → ${o < n}。`);
		if (o < n) {
			i = 0;
			path.push("(");
			save("open", "还有左括号额度，选择 (。");
			save("openCall", "进入左括号数量加一的下一层。");
			dfs(o + 1, c);
			opened = o;
			closed = c;
			i = 0;
			path.pop();
			save("openUndo", "撤销左括号分支，恢复父层路径。");
		}
		save("closeCheck", `closed < opened → ${c < o}。`);
		if (c < o) {
			i = 1;
			path.push(")");
			save("close", "存在尚未闭合的左括号，选择 )。");
			save("closeCall", "进入右括号数量加一的下一层。");
			dfs(o, c + 1);
			opened = o;
			closed = c;
			i = 1;
			path.pop();
			save("closeUndo", "撤销右括号分支。");
		}
		calls.pop();
	}
	dfs(0, 0);
	opened = null;
	closed = null;
	i = null;
	save("result", "所有合法结果已生成。");
	steps.at(-1).final = true;
	return steps;
}
const card = backtrackingCard({
	title: "22. 括号生成",
	description: "生成 n 对括号组成的所有合法括号串。",
	idea: '两个条件直接保证合法：左括号没用完才放 (；尚有未关闭的左括号才放 )。例如 path="("、opened=1、closed=0 时，两种选择都可能合法。',
	time: "O(n·Cₙ)，Cₙ 为第 n 个卡特兰数",
	space: "O(n)，不计结果",
	codes,
	examples,
	buildTrace,
	variables: [
		["opened", "已放左括号数"],
		["closed", "已放右括号数"],
		["path", "当前括号串"],
	],
});
export const template = card.template;
export const mount = card.mount;
