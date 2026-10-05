import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./3-code.js";
export const examples = [
	{
		label: "重复出现",
		input: "abcabcbb",
		note: "重复字符落在当前窗口内时，把 left 移到它上次位置之后。",
	},
	{
		label: "旧重复在窗口外",
		input: "abba",
		note: "最后一个 a 不应把 left 从 2 拉回 1，必须取 max。",
	},
	{ label: "空字符串", input: "", note: "不进入循环，返回 0。" },
	{ label: "全部相同", input: "bbbbb", note: "窗口最长始终只有一个字符。" },
];
export function buildTrace({ input: s }) {
	const { steps, push } = recorder(),
		last = new Map();
	let left = null,
		best = null,
		right = null,
		char = null,
		previous = null;
	const save = (line, text) =>
		push(line, text, {
			values: [...s],
			left,
			best,
			right,
			char,
			previous,
			pointers: { left, right },
			window: left === null ? null : [left, right],
			visualNote: `last（字符 → 上次下标）：${JSON.stringify([...last])}；窗口 [${left ?? "—"}, ${right ?? "—"}]。`,
			answer: best,
		});
	save("init", "建立字符上次位置字典。");
	left = best = 0;
	save("bounds", "左边界和最长长度初始化为 0。");
	for (right = 0; right < s.length; right++) {
		char = s[right];
		save("item", `当前字符 ${JSON.stringify(char)}。`);
		previous = last.get(char) ?? -1;
		save("query", `上次出现位置 ${previous}；-1 表示没出现过。`);
		left = Math.max(left, previous + 1);
		save("left", "left 只前进，排除窗口内的重复字符。");
		best = Math.max(best, right - left + 1);
		save("best", `窗口长度 ${right - left + 1}，最长长度 ${best}。`);
		last.set(char, right);
		save("record", "记录当前出现位置，供之后查询。");
	}
	right = s.length - 1;
	save("result", `返回最长无重复子串长度 ${best}。`);
	return steps;
}
const card = sequenceCard({
	title: "3. 无重复字符的最长子串",
	description:
		"求字符串中不含重复字符的最长连续子串长度；子串必须相邻，不能跳着选。",
	idea: "right 扩大窗口，重复字符在窗口内时推进 left。用字典记住每个字符最后出现的位置。",
	time: "O(n)",
	space: "O(Σ)，Σ 为不同字符数",
	codes,
	examples,
	buildTrace,
	variables: [
		["left", "窗口左端"],
		["right", "窗口右端"],
		["char", "当前字符"],
		["previous", "上次出现下标"],
		["best", "最长窗口"],
	],
});
export const template = card.template;
export const mount = card.mount;
