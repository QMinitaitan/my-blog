import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./238-code.js";
export const examples = [
	{
		label: "普通乘积",
		nums: [1, 2, 3, 4],
		note: "先写左侧乘积，再乘右侧乘积，始终跳过当前位置。",
	},
	{
		label: "一个零",
		nums: [-1, 1, 0, -3, 3],
		note: "只有零的位置可能得到非零答案。",
	},
	{ label: "两个零", nums: [0, 2, 0], note: "每个答案都包含至少一个零。" },
	{ label: "两个元素", nums: [2, 3], note: "两个输出分别等于另一个元素。" },
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let answer = nums.map(() => 1),
		prefix = null,
		suffix = null,
		i = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			answer,
			prefix,
			suffix,
			i,
			pointers: { i },
			auxiliary: answer,
			auxiliaryName: "answer · 左侧乘积 × 右侧乘积",
		});
	save("init", "answer 初始为全 1。");
	prefix = 1;
	save("prefixInit", "空的左侧区间乘积定义为 1。");
	for (i = 0; i < nums.length; i++) {
		save("forward", `从左往右处理下标 ${i}。`);
		answer[i] = prefix;
		save("prefixWrite", "写入当前元素左侧的乘积。");
		prefix *= nums[i];
		save("prefix", "再把当前元素纳入前缀，供下一格使用。");
	}
	i = nums.length - 1;
	suffix = 1;
	save("suffixInit", "从右侧空区间乘积 1 开始。");
	for (i = nums.length - 1; i >= 0; i--) {
		save("backward", `从右往左处理下标 ${i}。`);
		answer[i] *= suffix;
		save("suffixWrite", "乘上右侧乘积，当前位置答案完成。");
		suffix *= nums[i];
		save("suffix", "把当前元素纳入后缀，供左边一格使用。");
	}
	i = 0;
	save("result", `返回 ${JSON.stringify(answer)}。`);
	return steps;
}
const card = sequenceCard({
	title: "238. 除了自身以外数组的乘积",
	description: "返回每个位置之外其他元素的乘积，不能使用除法，要求线性时间。",
	idea: "答案等于左边所有元素的乘积乘以右边所有元素的乘积，用前后两遍扫描实现。",
	time: "O(n)",
	space: "O(1)，不含输出数组",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前位置"],
		["prefix", "左侧乘积"],
		["suffix", "右侧乘积"],
	],
});
export const template = card.template;
export const mount = card.mount;
