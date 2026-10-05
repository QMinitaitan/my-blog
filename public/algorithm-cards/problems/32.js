import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./32-code.js";
export const examples = [
	{
		label: "断点后连接",
		s: ")()())",
		note: "开头的 ) 重设基准，后面 ()() 得到长度 4。",
	},
	{
		label: "缺少闭合",
		s: "(()",
		note: "匹配末尾 () 时，未匹配的左括号成为长度基准。",
	},
	{
		label: "嵌套连接",
		s: "()(())",
		note: "栈最终回到 -1，长度覆盖整个字符串。",
	},
	{ label: "空字符串", s: "", note: "循环不执行，答案为 0。" },
];
export function buildTrace({ s }) {
	const stack = [-1],
		{ steps, push } = recorder();
	let answer = 0,
		i = null,
		ch = null;
	const save = (line, text) =>
		push(line, text, {
			values: [...s],
			stack,
			answer,
			i,
			ch,
			pointers: { i, base: stack.at(-1) },
			visualNote:
				"栈保存未匹配左括号下标；底部基准是最近不能包含在合法串里的位置，初值 -1。",
		});
	save("init", "基准 -1 允许从下标 0 开始的合法串计算完整长度。");
	for (i = 0; i < s.length; i++) {
		ch = s[i];
		save("scan", `读到下标 ${i} 的 ${ch}。`);
		save("open", `ch 为左括号 → ${ch === "("}。`);
		if (ch === "(") {
			stack.push(i);
			save("push", "左括号下标入栈，等待闭合。");
		} else {
			stack.pop();
			save("pop", "右括号尝试抵消一个左括号或弹出旧基准。");
			save("empty", `栈为空 → ${!stack.length}。`);
			if (!stack.length) {
				stack.push(i);
				save("base", "该右括号无法匹配，以它为新的断点基准。");
			} else {
				const length = i - stack.at(-1);
				answer = Math.max(answer, length);
				save(
					"update",
					`当前合法后缀长 ${i}-${stack.at(-1)}=${length}，更新答案 ${answer}。`,
				);
			}
		}
	}
	i = s.length ? s.length - 1 : null;
	save("result", "返回最长连续合法括号串长度。");
	return steps;
}
const card = sequenceCard({
	title: "32. 最长有效括号",
	description: "字符串只含 ( 与 )，求最长连续合法括号子串的长度。",
	idea: "栈保存未匹配左括号的下标。右括号抵消栈顶后，用当前位置减剩余栈顶计算合法后缀长度；栈空说明遇到断点，要重设基准。",
	time: "O(n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前下标"],
		["ch", "当前括号"],
		["answer", "最长长度"],
	],
});
export const template = card.template;
export const mount = card.mount;
