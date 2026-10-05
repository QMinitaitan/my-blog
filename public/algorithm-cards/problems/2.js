import {
	linkedListCard,
	makeList,
	listValues,
} from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./2-code.js";
export const examples = [
	{
		label: "普通进位",
		l1: [2, 4, 3],
		l2: [5, 6, 4],
		note: "个位在前，342+465=807，结果节点为 7→0→8。",
	},
	{
		label: "新增最高位",
		l1: [9, 9],
		l2: [1],
		note: "两侧都结束后 carry=1，仍需创建新节点。",
	},
	{ label: "零加零", l1: [0], l2: [0], note: "零使用一个值为 0 的节点表示。" },
	{
		label: "长度不同",
		l1: [1],
		l2: [8, 1],
		note: "短链表耗尽后，该位按 0 参与运算。",
	},
];
export function buildTrace({ l1: input1, l2: input2 }) {
	const a = makeList(input1, "A"),
		b = makeList(input2, "B"),
		dummy = { id: "D", val: 0, next: null },
		nodes = [dummy, ...a.nodes, ...b.nodes],
		map = new Map(nodes.map((n) => [n.id, n])),
		{ steps, push } = recorder();
	let l1 = a.head,
		l2 = b.head,
		tail = "D",
		carry = 0,
		x = null,
		y = null,
		total = null,
		answer = null,
		count = 0;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			l1,
			l2,
			tail,
			carry,
			x,
			y,
			total,
			answer,
			pointers: { l1, l2, tail, dummy: "D" },
		});
	save("init", "dummy 不计入答案，carry 初始为 0。");
	while (true) {
		save(
			"check",
			`还有输入节点或进位 → ${l1 !== null || l2 !== null || carry !== 0}。`,
		);
		if (l1 === null && l2 === null && carry === 0) break;
		x = l1 === null ? 0 : map.get(l1).val;
		save("x", `左侧当前位 ${x}，空指针按 0。`);
		y = l2 === null ? 0 : map.get(l2).val;
		save("y", `右侧当前位 ${y}。`);
		total = x + y + carry;
		save("sum", `本位总和 ${x}+${y}+旧进位 = ${total}。`);
		carry = Math.floor(total / 10);
		save("carry", `下一位进位为 ${carry}。`);
		const node = { id: `R${count++}`, val: total % 10, next: null };
		nodes.push(node);
		map.set(node.id, node);
		map.get(tail).next = node.id;
		save(
			"create",
			`新建结果节点 ${node.id}，值 ${node.val}，并接到 tail.next。`,
		);
		tail = node.id;
		save("tail", "结果尾指针后移。");
		save("leftCheck", `l1 非空 → ${l1 !== null}。`);
		if (l1 !== null) {
			l1 = map.get(l1).next;
			save("left", "左侧移到更高位。");
		}
		save("rightCheck", `l2 非空 → ${l2 !== null}。`);
		if (l2 !== null) {
			l2 = map.get(l2).next;
			save("right", "右侧移到更高位。");
		}
	}
	answer = listValues(nodes, dummy.next);
	save("result", "返回新建的结果链表，低位在前。");
	return steps;
}
const card = linkedListCard({
	title: "2. 两数相加",
	description:
		"两条非空链表按个位到高位存储非负整数，返回同样低位在前的和链表。",
	idea: "像竖式加法，每次相加当前两位和 carry。total%10 留在本位，total//10 传给下一位；输入结束但仍有进位时继续。",
	time: "O(max(m,n))",
	space: "O(max(m,n))，包括新建结果",
	codes,
	examples,
	buildTrace,
	variables: [
		["x", "左侧本位"],
		["y", "右侧本位"],
		["total", "含旧进位的总和"],
		["carry", "下一位进位"],
		["tail", "结果尾"],
	],
});
export const template = card.template;
export const mount = card.mount;
