import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./560-code.js";
export const examples = [
	{
		label: "两段满足",
		nums: [1, 1, 1],
		k: 2,
		note: "前缀和相差 2 的两个边界之间，就是一个答案区间。",
	},
	{
		label: "负数与零",
		nums: [1, -1, 0],
		k: 0,
		note: "前缀和可以重复，每次必须累计它此前出现的次数。",
	},
	{
		label: "全零",
		nums: [0, 0, 0],
		k: 0,
		note: "有 6 个非空子数组，先查询再记录才能避免多算空区间。",
	},
	{
		label: "没有答案",
		nums: [2],
		k: 1,
		note: "查询不到需要的前缀，答案保持 0。",
	},
];
export function buildTrace({ nums, k }) {
	const { steps, push } = recorder(),
		counts = new Map([[0, 1]]);
	let prefix = null,
		answer = null,
		num = null,
		need = null,
		i = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			k,
			prefix,
			answer,
			num,
			need,
			i,
			pointers: { i },
			visualNote: `counts（前缀和 → 已出现次数）：${JSON.stringify([...counts])}`,
		});
	save("init", "空前缀和 0 出现过一次，用来统计从下标 0 开始的区间。");
	prefix = answer = 0;
	save("bounds", "当前前缀和与答案初始化为 0。");
	for (i = 0; i < nums.length; i++) {
		num = nums[i];
		save("item", `取出 nums[${i}] = ${num}。`);
		prefix += num;
		save("sum", `更新 prefix = ${prefix}。`);
		need = prefix - k;
		save("need", `需要之前出现 prefix - k = ${need}。`);
		const matches = counts.get(need) ?? 0;
		answer += matches;
		save("count", `之前出现过 ${matches} 次，所以新增 ${matches} 个区间。`);
		counts.set(prefix, (counts.get(prefix) ?? 0) + 1);
		save("record", "最后记录当前前缀和，留给后面的元素查询。");
	}
	i = nums.length - 1;
	save("result", `返回满足要求的非空连续子数组数量 ${answer}。`);
	return steps;
}
const card = sequenceCard({
	title: "560. 和为 K 的子数组",
	description:
		"统计元素和恰好等于 k 的非空连续子数组数量，数组可以包含负数和零。",
	idea: "两个前缀和之差等于区间和。字典保存之前各前缀和出现的次数，查询 prefix - k 后再记录当前前缀。",
	time: "O(n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["num", "当前数字"],
		["prefix", "当前前缀和"],
		["need", "查询的前缀和"],
		["answer", "区间数量"],
	],
});
export const template = card.template;
export const mount = card.mount;
