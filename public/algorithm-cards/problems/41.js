import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./41-code.js";
export const examples = [
	{
		label: "乱序与负数",
		nums: [3, 4, -1, 1],
		note: "把 1 放到下标 0，3 放到下标 2，最后发现下标 1 缺少 2。",
	},
	{ label: "缺少 3", nums: [1, 2, 0], note: "零不属于有效范围，不参与交换。" },
	{
		label: "重复值",
		nums: [1, 1],
		note: "目标位置已有相同值，停止交换，避免死循环。",
	},
	{ label: "全部就位", nums: [1, 2, 3], note: "所有下标都匹配，返回 n + 1。" },
];
export function buildTrace({ nums }) {
	const values = [...nums],
		n = values.length,
		{ steps, push } = recorder();
	let i = null,
		target = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values,
			n,
			i,
			target,
			answer,
			pointers: { i, target },
			final: line === "found",
			visualNote: "值 x 的目标下标是 x - 1。",
		});
	save("init", `数组长 n = ${n}，答案一定在 1～${n + 1}。`);
	for (i = 0; i < n; i++) {
		save("item", `处理下标 ${i}。`);
		while (true) {
			const valid =
				values[i] >= 1 && values[i] <= n && values[values[i] - 1] !== values[i];
			save("check", `当前值有效且未就位 → ${valid}。`);
			if (!valid) break;
			target = values[i] - 1;
			save("target", `目标下标 target = ${target}。`);
			[values[i], values[target]] = [values[target], values[i]];
			save("swap", "把当前值换到属于它的位置；继续检查换回来的值。");
		}
	}
	for (i = 0; i < n; i++) {
		save("scan", `从左检查下标 ${i}。`);
		save("missing", `nums[i] != i + 1 → ${values[i] !== i + 1}。`);
		if (values[i] !== i + 1) {
			answer = i + 1;
			save("found", `第一个不匹配位置，返回 ${answer}。`);
			return steps;
		}
	}
	i = n - 1;
	answer = n + 1;
	save("result", `1～n 都存在，返回 ${answer}。`);
	return steps;
}
const card = sequenceCard({
	title: "41. 缺失的第一个正数",
	difficulty: "困难",
	description: "找出数组没有出现的最小正整数，要求 O(n) 时间和常数额外空间。",
	idea: "原地把值 x 放到下标 x - 1；忽略范围外的值，跳过已经就位的重复值。再从左找第一个不匹配位置。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前下标"],
		["target", "目标下标"],
		["n", "数组长度"],
	],
});
export const template = card.template;
export const mount = card.mount;
