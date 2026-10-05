import { matrixCard } from "../shared/matrix-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./72-code.js";
export const examples = [
	{
		label: "三次编辑",
		word1: "horse",
		word2: "ros",
		input: ["horse", "ros"],
		note: "比较替换、删除、插入三种最后操作，答案为 3。",
	},
	{
		label: "相同字符串",
		word1: "cat",
		word2: "cat",
		input: ["cat", "cat"],
		note: "相同末尾无需操作，沿对角线继承。",
	},
	{
		label: "空源字符串",
		word1: "",
		word2: "abc",
		input: ["", "abc"],
		note: "只能插入三个字符，首行就是答案。",
	},
	{
		label: "空目标字符串",
		word1: "ab",
		word2: "",
		input: ["ab", ""],
		note: "只能删除两个字符，首列就是答案。",
	},
];
export function buildTrace({ word1, word2 }) {
	const m = word1.length,
		n = word2.length,
		dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0)),
		{ steps, push } = recorder(),
		visited = [];
	let i = null,
		j = null,
		cell = null,
		dependencies = [],
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			matrix: dp,
			i,
			j,
			dependencies,
			visited,
			current: cell,
			rowLabels: ["∅", ...word1],
			columnLabels: ["∅", ...word2],
			answer,
		});
	save(
		"init",
		"dp[i][j] 表示把 word1 的前 i 个字符改成 word2 的前 j 个字符所需最少操作。",
	);
	for (i = 0; i <= m; i++) {
		cell = [i, 0];
		save("baseRow", `初始化第 ${i} 行的空目标状态。`);
		dp[i][0] = i;
		visited.push([i, 0]);
		save("deleteAll", `删除前 ${i} 个字符，代价 ${i}。`);
	}
	i = m;
	for (j = 0; j <= n; j++) {
		cell = [0, j];
		save("baseColumn", `初始化第 ${j} 列的空源状态。`);
		dp[0][j] = j;
		visited.push([0, j]);
		save("insertAll", `插入前 ${j} 个字符，代价 ${j}。`);
	}
	if (n >= 0) j = n;
	for (i = 1; i <= m; i++) {
		cell = null;
		dependencies = [];
		save("row", `处理 word1 长度 ${i} 的前缀。`);
		for (j = 1; j <= n; j++) {
			cell = [i, j];
			dependencies = [];
			save("column", `目标前缀长度 ${j}。`);
			save(
				"match",
				`${word1[i - 1]} == ${word2[j - 1]} → ${word1[i - 1] === word2[j - 1]}。`,
			);
			if (word1[i - 1] === word2[j - 1]) {
				dependencies = [[i - 1, j - 1]];
				save("same", "末尾相同，读取左上方状态。");
				dp[i][j] = dp[i - 1][j - 1];
				visited.push([i, j]);
				save("same", "不增加操作，继承左上方。");
			} else {
				dependencies = [
					[i - 1, j],
					[i, j - 1],
					[i - 1, j - 1],
				];
				save("edit", "上方：删除；左方：插入；左上方：替换。比较三种来源。");
				dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
				visited.push([i, j]);
				save("edit", `最小来源加本次操作 1，得到 ${dp[i][j]}。`);
			}
		}
		j = n;
	}
	i = m;
	j = n;
	cell = [m, n];
	answer = dp[m][n];
	save("result", "返回完整字符串所需最少操作数。");
	return steps;
}
const card = matrixCard({
	title: "72. 编辑距离",
	description:
		"每次可以插入、删除或替换一个字符，求把 word1 改成 word2 的最少操作次数。",
	idea: "每个格比较最后一次操作。相同字符继承左上方；不同时，在删除、插入、替换的三个前缀状态中取最小值再加一。空字符串边界分别需要全部插入或删除。",
	time: "O(mn)",
	space: "O(mn)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "源前缀长度"],
		["j", "目标前缀长度"],
	],
});
export const template = card.template;
export const mount = card.mount;
