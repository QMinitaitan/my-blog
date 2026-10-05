import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./136-code.js";
export const examples = [
	{
		label: "重复值抵消",
		nums: [4, 1, 2, 1, 2],
		note: "顺序不重要，出现两次的数字最终都会抵消。",
	},
	{
		label: "唯一元素为零",
		nums: [1, 0, 1],
		note: "0 是合法答案，不能把它当作未赋值。",
	},
	{ label: "负数", nums: [-2, 3, -2], note: "负数也遵守相同的异或抵消规律。" },
	{ label: "单元素", nums: [7], note: "0 XOR 7 = 7。" },
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let answer = 0,
		num = null,
		i = null,
		bits = "";
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			answer,
			num,
			i,
			pointers: { i },
			visualNote: bits,
		});
	save("init", "answer 从 0 开始。");
	for (i = 0; i < nums.length; i++) {
		num = nums[i];
		save("item", `取出数字 ${num}。`);
		const old = answer;
		answer ^= num;
		bits = `32 位补码：${(old >>> 0).toString(2).padStart(32, "0")} XOR ${(num >>> 0).toString(2).padStart(32, "0")} = ${(answer >>> 0).toString(2).padStart(32, "0")}`;
		save("xor", `${old} XOR ${num} = ${answer}；相同位变 0，不同位变 1。`);
	}
	i = nums.length - 1;
	save("result", `所有成对的值已抵消，返回 ${answer}。`);
	return steps;
}
const card = sequenceCard({
	title: "136. 只出现一次的数字",
	difficulty: "简单",
	description:
		"数组中只有一个数字出现一次，其余数字都出现两次，找出唯一的数字。",
	idea: "把所有数字异或。a XOR a = 0，a XOR 0 = a，出现两次的数字会抵消。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["num", "当前数字"],
		["answer", "累计异或"],
	],
});
export const template = card.template;
export const mount = card.mount;
