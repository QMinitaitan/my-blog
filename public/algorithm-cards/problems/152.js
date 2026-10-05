import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./152-code.js";
export const examples = [
	{
		label: "正负混合",
		nums: [2, 3, -2, 4],
		note: "最大积为 2×3=6，不一定延伸到最后。",
	},
	{
		label: "负负得正",
		nums: [-2, 3, -4],
		note: "之前的最小积 -6 乘 -4 后变成最大积 24。",
	},
	{
		label: "零切断",
		nums: [-2, 0, -1],
		note: "0 让两种末尾积重置，答案为 0。",
	},
	{
		label: "单个负数",
		nums: [-3],
		note: "必须选非空子数组，不能默认答案为 0。",
	},
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let maxEnding = nums[0],
		minEnding = nums[0],
		answer = nums[0],
		num = null,
		i = 0,
		nextMax = null,
		nextMin = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			i,
			num,
			maxEnding,
			minEnding,
			nextMax,
			nextMin,
			answer,
			pointers: { i },
		});
	save("init", "最大末尾积、最小末尾积、答案都取第一个元素。");
	for (i = 1; i < nums.length; i++) {
		num = nums[i];
		nextMax = null;
		nextMin = null;
		save("scan", `读入 ${num}，候选是单独开始或延续之前的两种积。`);
		nextMax = Math.max(num, maxEnding * num, minEnding * num);
		save(
			"max",
			`nextMax = max(${num},${maxEnding * num},${minEnding * num}) = ${nextMax}。`,
		);
		nextMin = Math.min(num, maxEnding * num, minEnding * num);
		save(
			"min",
			`nextMin = min(${num},${maxEnding * num},${minEnding * num}) = ${nextMin}，仍使用旧末尾状态。`,
		);
		maxEnding = nextMax;
		minEnding = nextMin;
		save("update", "两个新状态一起写回，避免第二个计算读到已更新值。");
		answer = Math.max(answer, maxEnding);
		save("best", "用当前最大末尾积更新全局答案。");
	}
	i = nums.length - 1;
	save("result", "返回所有非空连续子数组的最大乘积。");
	return steps;
}
const card = sequenceCard({
	title: "152. 乘积最大子数组",
	description: "求非空连续子数组中最大的乘积。",
	idea: "负数会交换大小关系，所以同时记录以当前位置结尾的最大积和最小积。例如 -6 乘 -4 得到 24；只保存最大积会漏掉它。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["num", "当前数字"],
		["maxEnding", "最大末尾积"],
		["minEnding", "最小末尾积"],
		["nextMax", "候选最大积"],
		["nextMin", "候选最小积"],
		["answer", "全局最大积"],
	],
});
export const template = card.template;
export const mount = card.mount;
