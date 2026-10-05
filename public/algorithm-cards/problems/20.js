import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./20-code.js";
export const examples = [
	{ label: "嵌套", s: "([])", note: "右括号必须匹配最近尚未关闭的左括号。" },
	{ label: "交叉错误", s: "([)]", note: "遇到 ) 时栈顶是 [，立即失败。" },
	{ label: "只有右括号", s: "]", note: "空栈不能匹配右括号。" },
	{ label: "没有闭合", s: "((", note: "扫描结束仍有左括号，返回 false。" },
];
export function buildTrace({ s }) {
	const stack = [],
		pairs = { ")": "(", "]": "[", "}": "{" },
		{ steps, push } = recorder();
	let i = null,
		ch = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: [...s],
			stack,
			i,
			ch,
			answer,
			pointers: { i },
			final: line === "fail",
		});
	save("init", "用栈保存尚未匹配的左括号。");
	for (i = 0; i < s.length; i++) {
		ch = s[i];
		save("scan", `读到 ${ch}。`);
		save("close", `是否为右括号 → ${ch in pairs}。`);
		if (ch in pairs) {
			save("check", `检查栈是否非空、栈顶是否为 ${pairs[ch]}。`);
			if (!stack.length || stack.at(-1) !== pairs[ch]) {
				answer = false;
				save("fail", "栈顶不匹配，返回 false。");
				return steps;
			}
			stack.pop();
			save("pop", "匹配成功，弹出对应左括号。");
		} else {
			stack.push(ch);
			save("push", "左括号入栈，等待后续闭合。");
		}
	}
	i = s.length - 1;
	answer = !stack.length;
	save("result", `扫描完毕，空栈 → ${answer}。`);
	return steps;
}
const card = sequenceCard({
	title: "20. 有效的括号",
	difficulty: "简单",
	description: "字符串只含三类括号，判断每个左括号是否按正确顺序闭合。",
	idea: "例如 ([]): ( 入栈、[ 入栈、] 弹出 [、) 弹出 (。栈顶始终是下一次必须关闭的括号。",
	time: "O(n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["ch", "当前括号"],
		["stack", "未匹配括号"],
	],
});
export const template = card.template;
export const mount = card.mount;
