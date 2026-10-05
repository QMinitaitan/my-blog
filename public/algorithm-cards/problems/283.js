import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./283-code.js";
export const examples = [
	{
		label: "零与非零交替",
		nums: [0, 1, 0, 3, 12],
		note: "read 扫描输入，write 标记下一个非零元素的位置。",
	},
	{ label: "全零", nums: [0, 0, 0], note: "条件始终不成立，write 保持 0。" },
	{
		label: "没有零",
		nums: [-2, 1, 3],
		note: "同一位置交换也合法，非零顺序不变。",
	},
	{ label: "单元素", nums: [0], note: "最小输入只执行一次判断。" },
];
export function buildTrace({ nums }) {
	const values = [...nums],
		{ steps, push } = recorder();
	let write = 0,
		read = null;
	const save = (line, text, answer) =>
		push(line, text, {
			values,
			write,
			read,
			pointers: { read, write },
			completedRange: [0, write],
			answer,
		});
	save("init", "write = 0，非零前缀暂时为空。");
	for (read = 0; read < values.length; read++) {
		save("read", `读取下标 ${read} 的元素。`);
		save("check", `判断 ${values[read]} != 0 → ${values[read] !== 0}。`);
		if (values[read] !== 0) {
			[values[write], values[read]] = [values[read], values[write]];
			save("swap", "把当前非零元素交换到 write 位置。");
			write++;
			save("advance", "write 前进，刚放入的非零元素已完成。");
		}
	}
	read = values.length ? values.length - 1 : null;
	save("result", "扫描结束，原数组已经完成原地修改；函数不返回数组。", values);
	return steps;
}
const card = sequenceCard({
	title: "283. 移动零",
	difficulty: "简单",
	description:
		"把所有 0 移到数组末尾，同时保持非零元素的相对顺序，必须原地修改。",
	idea: "read 逐个检查，write 维护非零前缀；遇到非零元素才交换并前进 write。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["read", "读取位置"],
		["write", "下一个非零位置"],
	],
});
export const template = card.template;
export const mount = card.mount;
