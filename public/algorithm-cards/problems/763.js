import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./763-code.js";
export const examples = [
	{
		label: "三个分段",
		input: "ababcbacadefegdehijhklij",
		note: "遇到片段内字符，就把终点扩展到它的最后位置。",
	},
	{
		label: "不能分开",
		input: "eccbbbbdec",
		note: "首尾同字符，使整个字符串必须在同一段。",
	},
	{
		label: "每个字符不同",
		input: "abc",
		note: "每个字符都能独立成为一个片段。",
	},
	{ label: "单字符", input: "a", note: "片段长度是 end - start + 1。" },
];
export function buildTrace({ input: s }) {
	const { steps, push } = recorder(),
		last = {};
	let start = null,
		end = null,
		answer = null,
		i = null;
	const save = (line, text) =>
		push(line, text, {
			values: [...s],
			last: { ...last },
			start,
			end,
			answer,
			i,
			pointers: { i, start, end },
			visualNote: `last：${JSON.stringify(last)}；分段长度：${JSON.stringify(answer)}`,
		});
	save("init", "建立字符最后位置字典。");
	for (i = 0; i < s.length; i++) {
		save("index", `读取字符 ${s[i]}。`);
		last[s[i]] = i;
		save("last", `记录 ${s[i]} 最后出现于 ${i}。`);
	}
	i = s.length - 1;
	start = end = 0;
	save("bounds", "第一段从 0 开始。");
	answer = [];
	save("answer", "初始化分段答案。");
	for (i = 0; i < s.length; i++) {
		save("item", `考察字符 ${s[i]}。`);
		end = Math.max(end, last[s[i]]);
		save("extend", "本段必须包含当前字符的最后一次出现。");
		save("boundary", `到达片段终点 → ${i === end}。`);
		if (i === end) {
			answer.push(end - start + 1);
			save("append", `保存片段 [${start}, ${end}] 的长度。`);
			start = i + 1;
			save("next", "下一个片段从 i + 1 开始。");
		}
	}
	i = s.length - 1;
	save("result", `返回 ${JSON.stringify(answer)}。`);
	return steps;
}
const card = sequenceCard({
	title: "763. 划分字母区间",
	description:
		"把字符串划分为尽可能多的片段，使每个字母只出现在一个片段中，返回各段长度。",
	idea: "先记住每个字母的最后下标。片段必须覆盖内部所有字母的最后位置，到达这个边界才可以切分。",
	time: "O(n)",
	space: "O(Σ)，小写字母表大小 26",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前位置"],
		["start", "片段起点"],
		["end", "必须覆盖到的位置"],
		["answer", "分段长度"],
	],
});
export const template = card.template;
export const mount = card.mount;
