import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./438-code.js";
export const examples = [
	{
		label: "两个命中窗口",
		s: "cbaebabacd",
		p: "abc",
		note: "只比较相同长度窗口的字符次数，顺序不影响是否异位。",
	},
	{
		label: "窗口重叠",
		s: "abab",
		p: "ab",
		note: "[0,1]、[1,2] 和 [2,3] 都是答案，窗口只移动一格。",
	},
	{
		label: "重复字符",
		s: "aaab",
		p: "aab",
		note: "字符种类相同仍需检查次数，aaa 不满足两个 a 一个 b。",
	},
	{
		label: "模式更长",
		s: "a",
		p: "aa",
		note: "窗口凑不够模式长度，返回空列表。",
	},
];
export function buildTrace({ s, p }) {
	const { steps, push } = recorder(),
		need = Array(26).fill(0),
		window = Array(26).fill(0),
		answer = [];
	for (const ch of p) need[ch.charCodeAt(0) - 97]++;
	let right = null,
		ch = null,
		windowStart = 0;
	const counts = (a) =>
		Object.fromEntries(
			a.map((n, i) => [String.fromCharCode(97 + i), n]).filter(([, n]) => n),
		);
	const save = (line, text) =>
		push(line, text, {
			values: [...s],
			right,
			ch,
			need: counts(need),
			windowCounts: counts(window),
			answer,
			pointers: { right, left: right === null ? null : windowStart },
			window: right === null ? null : [windowStart, right],
			visualNote: `目标 p=${p}；当前 ${JSON.stringify(counts(window))}`,
		});
	save("init", "计数目标字符；创建空窗口和答案。");
	for (right = 0; right < s.length; right++) {
		ch = s[right];
		save("scan", `读取 s[${right}]=${ch}。`);
		window[ch.charCodeAt(0) - 97]++;
		save("add", "新字符进入窗口。");
		save("oversized", `是否超出固定长度 ${p.length} → ${right >= p.length}。`);
		if (right >= p.length) {
			window[s.charCodeAt(right - p.length) - 97]--;
			windowStart++;
			save("remove", `移出 s[${right - p.length}]=${s[right - p.length]}。`);
		}
		const match =
			right >= p.length - 1 && window.every((n, i) => n === need[i]);
		save("match", `长度足够且字符次数相同 → ${match}。`);
		if (match) {
			answer.push(right - p.length + 1);
			save("collect", "保存窗口起点。");
		}
	}
	right = s.length - 1;
	save("result", "返回所有起点，包括重叠窗口。");
	return steps;
}
const card = sequenceCard({
	title: "438. 找到字符串中所有字母异位词",
	description:
		"在 s 中找出与 p 字符次数完全相同的连续子串，返回所有起始下标。输入只含小写英文字母。",
	idea: "例如 p=ab，窗口 ba 也满足要求。保持长度为 len(p) 的窗口，每步加右边字符，再移走超长的左边字符，比较 26 个字符计数。",
	time: "O(26n+m)，固定字母表下为 O(n+m)",
	space: "O(26)，不计答案",
	codes,
	examples,
	buildTrace,
	variables: [
		["right", "右端下标"],
		["ch", "进入字符"],
		["need", "目标次数"],
		["windowCounts", "window 字符次数"],
		["answer", "起点列表"],
	],
});
export const template = card.template;
export const mount = card.mount;
