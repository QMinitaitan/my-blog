import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./155-code.js";
const sample = (label, operations, note) => ({
	label,
	operations,
	input: operations.map(([method, args]) => `${method}(${args.join(",")})`),
	note,
});
export const examples = [
	sample(
		"移除最小值",
		[
			["MinStack", []],
			["push", [-2]],
			["push", [0]],
			["push", [-3]],
			["getMin", []],
			["pop", []],
			["top", []],
			["getMin", []],
		],
		"每层保存当时最小值，弹出 -3 后最小值自动恢复为 -2。",
	),
	sample(
		"重复最小值",
		[
			["MinStack", []],
			["push", [1]],
			["push", [1]],
			["pop", []],
			["getMin", []],
		],
		"相同最小值也逐层记录，弹出一个后仍为 1。",
	),
	sample(
		"整数边界",
		[
			["MinStack", []],
			["push", [-2147483648]],
			["push", [2147483647]],
			["getMin", []],
			["top", []],
		],
		"直接保存值，不用差值编码，避免整数溢出。",
	),
];
export function buildTrace({ operations, input }) {
	const stack = [],
		{ steps, push } = recorder(),
		answer = [null];
	let i = 0,
		val = null,
		minimum = null,
		returned = null;
	const values =
		input ?? operations.map(([method, args]) => `${method}(${args.join(",")})`);
	const save = (line, text) =>
		push(line, text, {
			values,
			stack,
			answer,
			i,
			val,
			minimum,
			returned,
			final:
				i === operations.length - 1 &&
				["push", "pop", "top", "min"].includes(line),
			pointers: { operation: i },
			visualNote:
				"每个栈项为 [值,到这一层为止的最小值]；底 → 顶。操作返回记录中的 null 表示构造/修改方法没有返回值。",
		});
	save("init", "初始化空栈。");
	for (i = 1; i < operations.length; i++) {
		const [method, args] = operations[i];
		returned = null;
		val = null;
		minimum = null;
		if (method === "push") {
			val = args[0];
			minimum = null;
			save("empty", `栈为空 → ${stack.length === 0}。`);
			if (!stack.length) {
				minimum = val;
				save("first", "第一层最小值就是 val。");
			} else {
				minimum = Math.min(val, stack.at(-1)[1]);
				save("minimum", `min(${val},上一层最小值) = ${minimum}。`);
			}
			stack.push([val, minimum]);
			answer.push(null);
			save("push", "保存本层值和本层最小值。");
		} else if (method === "pop") {
			stack.pop();
			answer.push(null);
			save("pop", "弹出整层，下面一层的最小值记录仍然有效。");
		} else if (method === "top") {
			returned = stack.at(-1)[0];
			answer.push(returned);
			save("top", `返回栈顶值 ${returned}。`);
		} else if (method === "getMin") {
			returned = stack.at(-1)[1];
			answer.push(returned);
			save("min", `直接返回栈顶记录的最小值 ${returned}。`);
		} else throw new Error(`未知 MinStack 操作 ${method}`);
	}
	steps.at(-1).final = true;
	return steps;
}
const card = sequenceCard({
	title: "155. 最小栈",
	description: "实现 push、pop、top、getMin，每项操作都必须为常数时间。",
	idea: "栈项同时保存值和入栈时的最小值。这样 pop 后无需重新扫描，新的栈顶已经保存剩余部分的最小值。题意保证查询和弹出时栈非空。",
	time: "每项 O(1)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["val", "本次入栈值"],
		["minimum", "本层最小值"],
		["returned", "本次查询返回值"],
	],
});
export const template = card.template;
export const mount = card.mount;
