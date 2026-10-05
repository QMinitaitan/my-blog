import { backtrackingCard } from "../shared/backtracking-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./131-code.js";
export const examples = [
	{
		label: "两种切法",
		s: "aab",
		note: "先选 a、a、b，再回退尝试 aa、b；aab 本身不是回文。",
	},
	{
		label: "整个串回文",
		s: "aba",
		note: "既可分成 a、b、a，也可保留整个 aba。",
	},
	{ label: "单字符", s: "a", note: "字符本身是回文，保存一个分割方案。" },
	{
		label: "无长回文",
		s: "abc",
		note: "所有长于 1 的候选被跳过，最终只有逐字符分割。",
	},
];
export function buildTrace({ s }) {
	const { steps, push } = recorder(),
		path = [],
		answer = [],
		calls = [];
	let start = null,
		end = null,
		part = null;
	const save = (line, text, final = false) =>
		push(line, text, {
			candidates: [...s],
			i: end,
			start,
			end,
			part,
			path,
			answer,
			calls,
			final,
		});
	save("init", "初始化结果和当前分割路径。");
	save("start", "从 start=0 递归。");
	function dfs(begin) {
		const f = { start: begin, end: null, part: null };
		calls.push(f);
		start = begin;
		end = part = null;
		save("complete", `start 到末尾 → ${begin === s.length}。`);
		if (begin === s.length) {
			answer.push([...path]);
			save("collect", "每一段均为回文，保存路径副本。");
			save("done", "当前分割完成，返回上一层。");
			calls.pop();
			return;
		}
		for (let index = begin; index < s.length; index++) {
			start = begin;
			end = index;
			part = f.part;
			f.end = index;
			save("scan", `尝试把片段终点设为 ${end}。`);
			part = s.slice(begin, index + 1);
			f.part = part;
			save("part", `当前候选 ${part}。`);
			const invalid = part !== [...part].reverse().join("");
			save("palindrome", `候选不是回文 → ${invalid}。`);
			if (invalid) {
				save("skip", "跳过非回文候选。");
				continue;
			}
			path.push(part);
			save("choose", "选择回文片段进入路径。");
			save("recurse", "从当前片段后一个字符继续切分。");
			dfs(index + 1);
			start = begin;
			end = index;
			part = f.part;
			path.pop();
			save("undo", "递归返回，撤销这一段，尝试更长片段。");
		}
		calls.pop();
	}
	dfs(0);
	start = end = part = null;
	save("result", "返回全部回文分割方案。", true);
	return steps;
}
const card = backtrackingCard({
	title: "131. 分割回文串",
	description:
		"把非空字符串完整分成若干连续片段，要求每段都是回文，返回所有分割方案。不能跳过字符。",
	idea: "固定 start，依次尝试各个 end。只把回文片段加入 path，递归到 end+1，再 pop 撤销。例如 aab 的路径可为 [a,a,b] 或 [aa,b]，保存时必须复制 path。",
	time: "O(n·2^n)，计入候选检查和结果复制的上界",
	space: "O(n)，不计输出，递归路径及片段总长度",
	codes,
	examples,
	buildTrace,
	variables: [
		["start", "未分割起点"],
		["end", "候选终点"],
		["part", "候选片段"],
		["path", "当前回文片段"],
	],
});
export const template = card.template;
export const mount = card.mount;
