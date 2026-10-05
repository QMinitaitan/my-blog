import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./739-code.js";
export const examples = [
	{
		label: "起伏温度",
		temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
		note: "72 会依次解决 69、71；76 又解决之前等待的 75。",
	},
	{
		label: "全相等",
		temperatures: [30, 30, 30],
		note: "相等不是更暖，所有答案保持 0。",
	},
	{
		label: "持续升温",
		temperatures: [30, 40, 50],
		note: "除最后一天外都只需等一天。",
	},
	{
		label: "持续降温",
		temperatures: [90, 80, 70],
		note: "栈中所有日期最终都没有更暖的一天。",
	},
];
export function buildTrace({ temperatures }) {
	const stack = [],
		answer = Array(temperatures.length).fill(0),
		{ steps, push } = recorder();
	let i = null,
		temperature = null,
		previous = null;
	const save = (line, text) =>
		push(line, text, {
			values: temperatures,
			stack,
			i,
			temperature,
			previous,
			answer,
			auxiliary: answer,
			auxiliaryName: "answer：等待天数（0 表示尚无更暖日期）",
			pointers: { i, previous },
			visualNote: "栈存日期下标；对应温度从底到顶不升。",
		});
	save("init", "所有等待天数先设为 0。");
	for (i = 0; i < temperatures.length; i++) {
		temperature = temperatures[i];
		save("scan", `来到第 ${i} 天，温度 ${temperature}。`);
		while (true) {
			save(
				"check",
				`栈顶温度小于 ${temperature} → ${!!stack.length && temperatures[stack.at(-1)] < temperature}。`,
			);
			if (!stack.length || temperatures[stack.at(-1)] >= temperature) break;
			previous = stack.pop();
			save("pop", `日期 ${previous} 终于等到更暖的一天。`);
			answer[previous] = i - previous;
			save(
				"update",
				`answer[${previous}] = ${i}-${previous} = ${answer[previous]}。`,
			);
		}
		stack.push(i);
		save("push", `日期 ${i} 入栈，等待更暖的一天。`);
	}
	i = temperatures.length - 1;
	save("result", "未被弹出的日期保持 0，返回等待天数。");
	return steps;
}
const card = sequenceCard({
	title: "739. 每日温度",
	description: "对每一天，求还要等几天才出现严格更高的温度；没有则为 0。",
	idea: "栈保存还没有答案的日期。当前温度更高时，连续弹出栈顶并用日期差填写答案。每个日期只进出栈一次。",
	time: "O(n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前日期"],
		["temperature", "当前温度"],
		["previous", "已解决日期"],
	],
});
export const template = card.template;
export const mount = card.mount;
