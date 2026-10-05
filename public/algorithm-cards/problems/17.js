import { backtrackingCard } from "../shared/backtracking-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./17-code.js";
export const examples = [
	{
		label: "两个号码",
		digits: "23",
		note: "先固定 a 配 d/e/f，再回退尝试 b、c。",
	},
	{ label: "四字母号码", digits: "7", note: "7 对应 pqrs，共四种组合。" },
	{ label: "空号码", digits: "", note: "按题意返回 []，而非包含空串的列表。" },
	{
		label: "重复号码",
		digits: "22",
		note: "每个数字位置都独立选字母，例如 aa、ab。",
	},
];
export function buildTrace({ digits }) {
	const mapping = {
			2: "abc",
			3: "def",
			4: "ghi",
			5: "jkl",
			6: "mno",
			7: "pqrs",
			8: "tuv",
			9: "wxyz",
		},
		path = [],
		calls = [],
		{ steps, push } = recorder();
	let answer = null,
		index = null,
		i = null,
		ch = null,
		candidates = [];
	const save = (line, text) =>
		push(line, text, { candidates, path, calls, answer, index, i, ch });
	save("empty", `digits 为空 → ${digits.length === 0}。`);
	if (!digits.length) {
		answer = [];
		save("fail", "空号码返回 []。");
		steps.at(-1).final = true;
		return steps;
	}
	answer = [];
	save("init", "建立号码到字母的映射。");
	save("start", "从数字下标 0 开始。");
	function dfs(position) {
		index = position;
		i = null;
		ch = null;
		candidates = [...(mapping[digits[index]] ?? "")];
		calls.push(position);
		save("complete", `所有数字已选字母 → ${position === digits.length}。`);
		if (position === digits.length) {
			answer.push(path.join(""));
			save("collect", "完整字符串加入答案。");
			save("done", "返回父层调用。");
			calls.pop();
			return;
		}
		for (let offset = 0; offset < mapping[digits[position]].length; offset++) {
			index = position;
			candidates = [...mapping[digits[position]]];
			i = offset;
			ch = candidates[i];
			save("scan", `数字 ${digits[position]} 当前尝试 ${ch}。`);
			path.push(ch);
			save("choose", "将当前字母加入路径。");
			save("recurse", "处理下一个数字位置。");
			dfs(position + 1);
			index = position;
			candidates = [...mapping[digits[position]]];
			i = offset;
			ch = candidates[i];
			path.pop();
			save("undo", "撤销本位置字母，尝试下一个。");
		}
		calls.pop();
	}
	dfs(0);
	index = null;
	i = null;
	ch = null;
	candidates = [];
	save("result", "全部号码字母组合完成。");
	steps.at(-1).final = true;
	return steps;
}
const card = backtrackingCard({
	title: "17. 电话号码的字母组合",
	description: "数字字符串仅含 2～9，返回按电话键盘映射得到的全部字母组合。",
	idea: "每层处理一个数字，从它对应的字母中选一个。path 的长度就是已处理数字数；选完全部数字才保存结果。",
	time: "O(L·4ᴸ)，L 为数字长度",
	space: "O(L)，不计结果",
	codes,
	examples,
	buildTrace,
	variables: [
		["index", "数字位置"],
		["ch", "当前字母"],
		["path", "已选字母"],
	],
});
export const template = card.template;
export const mount = card.mount;
