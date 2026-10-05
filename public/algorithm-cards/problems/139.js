import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./139-code.js";
export const examples = [
	{
		label: "两个词",
		s: "leetcode",
		wordDict: ["leet", "code"],
		note: "dp[4] 先成立，之后用 code 让 dp[8] 成立。",
	},
	{
		label: "重复用词",
		s: "applepenapple",
		wordDict: ["apple", "pen"],
		note: "同一个词 apple 可以重复使用。",
	},
	{
		label: "尾部无解",
		s: "catsandog",
		wordDict: ["cats", "dog", "sand", "and", "cat"],
		note: "部分前缀可拆分，但完整字符串不能拆分。",
	},
	{
		label: "单字符",
		s: "a",
		wordDict: ["a"],
		note: "从 dp[0]=true 出发直接匹配单词。",
	},
];
export function buildTrace({ s, wordDict }) {
	const words = new Set(wordDict),
		dp = [true, ...Array(s.length).fill(false)],
		{ steps, push } = recorder();
	let i = null,
		j = null,
		word = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: dp,
			i,
			j,
			word,
			wordDict,
			answer,
			pointers: { i, j },
			visualNote: `s=${JSON.stringify(s)}；dp[x] 表示 s[:x] 可以拆成词；dp[0] 是空前缀。`,
		});
	save("init", "空前缀可以拆分，其余前缀暂时为 false。");
	for (i = 1; i <= s.length; i++) {
		j = null;
		word = null;
		save("prefix", `检查长度 ${i} 的前缀 ${s.slice(0, i)}。`);
		for (j = 0; j < i; j++) {
			word = null;
			save("split", `尝试切分位置 ${j}。`);
			word = dp[j] ? s.slice(j, i) : null;
			save(
				"check",
				!dp[j]
					? `dp[${j}] 为 false，短路跳过词典查询。`
					: `前半可拆，查询 ${JSON.stringify(word)} 在词典中 → ${words.has(word)}。`,
			);
			if (dp[j] && words.has(word)) {
				dp[i] = true;
				save("update", "前半可拆且后半是单词，当前前缀可拆。");
				save("stop", "已经找到一种拆分，不再尝试本前缀其他切点。");
				break;
			}
		}
		if (!dp[i]) j = i - 1;
	}
	i = s.length;
	answer = dp[s.length];
	save("result", "返回整个字符串的可拆分状态。");
	return steps;
}
const card = sequenceCard({
	title: "139. 单词拆分",
	description:
		"判断字符串能否拆成词典中的一个或多个单词，词典中的词可重复使用。",
	idea: "例如 leetcode 在 j=4 切分：dp[4] 说明 leet 可拆，s[4:8] 是 code，于是 dp[8]=true。每个前缀枚举它的最后一个词从哪开始。",
	time: "O(n³+D)，计入子串复制和哈希；D 为词典字符总数",
	space: "O(n+D)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前前缀长度"],
		["j", "切分位置"],
		["word", "本次查询词"],
		["wordDict", "词典"],
	],
});
export const template = card.template;
export const mount = card.mount;
