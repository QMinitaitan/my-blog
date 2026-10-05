import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./394-code.js";
export const examples = [
	{
		label: "嵌套括号",
		s: "3[a2[c]]",
		note: "先解开 2[c]，得到 acc，再重复三次。",
	},
	{
		label: "多位次数",
		s: "12[a]",
		note: "number=number*10+digit，次数是 12 而不是分别 1 和 2。",
	},
	{
		label: "前后普通字符",
		s: "x2[ab]y",
		note: "入栈保存前缀 x，出栈后拼接 xabab，再继续添加 y。",
	},
	{ label: "没有括号", s: "abc", note: "全部进入普通字符分支，返回 abc。" },
];
export function buildTrace({ s }) {
	const { steps, push } = recorder(),
		stack = [];
	let current = "",
		number = 0,
		ch = null,
		index = null,
		previous = null,
		repeat = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: [...s],
			stack,
			current,
			number,
			ch,
			previous,
			repeat,
			answer,
			pointers: { 读取: index },
			visualNote: `当前已解码片段：${current.length > 80 ? current.slice(0, 80) + " …其余省略" : current}`,
		});
	save("init", "栈保存每层括号之前的前缀和重复次数。");
	for (index = 0; index < s.length; index++) {
		ch = s[index];
		save("scan", `读取字符 ${ch}。`);
		save("digit", `是否数字 → ${/\d/.test(ch)}。`);
		if (/\d/.test(ch)) {
			number = number * 10 + Number(ch);
			save("number", `累积重复次数 ${number}。`);
		} else {
			save("open", `是否左括号 → ${ch === "["}。`);
			if (ch === "[") {
				stack.push([current, number]);
				save("push", "保存当前层的前缀和次数。");
				current = "";
				number = 0;
				save("reset", "进入新括号层，片段和次数清零。");
			} else {
				save("close", `是否右括号 → ${ch === "]"}。`);
				if (ch === "]") {
					[previous, repeat] = stack.pop();
					save("pop", "取回上一层的前缀和重复次数。");
					current = previous + current.repeat(repeat);
					save("expand", `展开当前片段 ${repeat} 次，再接到前缀后。`);
				} else {
					current += ch;
					save("letter", "普通字符接到当前片段。");
				}
			}
		}
	}
	index = s.length - 1;
	answer = current;
	save("result", "全部括号已匹配，返回解码字符串。");
	return steps;
}
const card = sequenceCard({
	title: "394. 字符串解码",
	description:
		"把 k[片段] 展开为重复 k 次的片段，允许括号嵌套。输入保证编码合法，次数为正整数，原文不含数字。",
	idea: "栈记住外层上下文。读到左括号时先保存前缀与次数，右括号时取回并展开。例如 3[a2[c]] 先形成 acc，外层再得到 accaccacc。",
	time: "O(nL)，L 为解码长度，上界计入嵌套复制",
	space: "O(nL)，计入嵌套前缀及结果",
	codes,
	examples,
	buildTrace,
	variables: [
		["ch", "当前字符"],
		["number", "正在累积的次数"],
		["current", "当前层片段"],
		["stack", "外层前缀和次数"],
		["previous", "弹出的前缀"],
		["repeat", "弹出的次数"],
	],
});
export const template = card.template;
export const mount = card.mount;
