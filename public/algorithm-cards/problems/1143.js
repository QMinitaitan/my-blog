import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./1143-code.js";
export const examples = [
	{
		label: "跳过字符",
		text1: "abcde",
		text2: "ace",
		input: ["abcde", "ace"],
		note: "子序列可以跳过 b、d，最长长度为 3。",
	},
	{
		label: "相同字符串",
		text1: "abc",
		text2: "abc",
		input: ["abc", "abc"],
		note: "相同字符从左上角状态加一。",
	},
	{
		label: "完全不同",
		text1: "abc",
		text2: "def",
		input: ["abc", "def"],
		note: "所有比较都走取上方/左方最大值的分支。",
	},
	{
		label: "顺序重要",
		text1: "ab",
		text2: "ba",
		input: ["ab", "ba"],
		note: "字符集合相同，但不能改顺序，最长长度为 1。",
	},
];
export function buildTrace({ text1, text2 }) {
	const m = text1.length,
		n = text2.length,
		dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0)),
		{ steps, push } = recorder(),
		visited = [];
	let i = null,
		j = null,
		dependencies = [],
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			matrix: dp,
			i,
			j,
			dependencies,
			visited,
			current: i !== null && j !== null ? [i, j] : null,
			rowLabels: ["∅", ...text1],
			columnLabels: ["∅", ...text2],
			answer,
		});
	save("init", "dp[i][j] 表示两段前缀的最长公共子序列长度；空前缀为 0。");
	for (i = 1; i <= m; i++) {
		dependencies = [];
		save("row", `text1 前缀长度 ${i}。`);
		for (j = 1; j <= n; j++) {
			dependencies = [];
			save("column", `text2 前缀长度 ${j}。`);
			save(
				"match",
				`${text1[i - 1]} == ${text2[j - 1]} → ${text1[i - 1] === text2[j - 1]}。`,
			);
			if (text1[i - 1] === text2[j - 1]) {
				dependencies = [[i - 1, j - 1]];
				save("diagonal", "末尾字符相同，读取两个前缀都去掉末尾后的状态。");
				dp[i][j] = dp[i - 1][j - 1] + 1;
				visited.push([i, j]);
				save(
					"diagonal",
					`dp[${i}][${j}] = ${dp[i - 1][j - 1]}+1 = ${dp[i][j]}。`,
				);
			} else {
				dependencies = [
					[i - 1, j],
					[i, j - 1],
				];
				save("skip", "末尾字符不同，比较跳过 text1 或 text2 末尾的状态。");
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
				visited.push([i, j]);
				save("skip", `取 max(${dp[i - 1][j]},${dp[i][j - 1]}) = ${dp[i][j]}。`);
			}
		}
		if (n) j = n;
	}
	i = m || null;
	j = m && n ? n : null;
	answer = dp[m][n];
	save("result", "返回完整两段字符串对应的右下角状态。");
	return steps;
}
const card = matrixCard({
	title: "1143. 最长公共子序列",
	description:
		"在两个字符串中保留原顺序、允许跳过字符，求最长公共子序列的长度。",
	idea: "表格的行列代表前缀长度。末尾相同就从左上加一；不同就比较上方、左方，选择跳过一个末尾后更长的结果。",
	time: "O(mn)",
	space: "O(mn)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "text1 前缀长度"],
		["j", "text2 前缀长度"],
	],
});
export const template = card.template;
export const mount = card.mount;
