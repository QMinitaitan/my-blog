import {
	linkedListCard,
	makeList,
	listValues,
} from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./19-code.js";
export const examples = [
	{
		label: "删除倒数第二个",
		input: [1, 2, 3, 4, 5],
		n: 2,
		note: "fast 先走两步；到尾时 slow 指向 3，跳过 4。",
	},
	{
		label: "删除头",
		input: [1, 2, 3],
		n: 3,
		note: "slow 停在 dummy，统一处理删除头节点。",
	},
	{
		label: "删除尾",
		input: [1, 2, 3],
		n: 1,
		note: "slow.next 改为空，删除最后节点。",
	},
	{
		label: "唯一节点",
		input: [1],
		n: 1,
		note: "dummy.next 改为空，结果为空链表。",
	},
];
export function buildTrace({ input, n }) {
	const list = makeList(input),
		dummy = { id: "D", val: 0, next: list.head },
		nodes = [dummy, ...list.nodes],
		map = new Map(nodes.map((node) => [node.id, node])),
		{ steps, push } = recorder();
	let fast = "D",
		slow = "D",
		i = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			fast,
			slow,
			i,
			n,
			answer,
			pointers: { fast, slow, dummy: "D" },
		});
	save("init", "dummy 指向原 head，让删除头与普通节点使用同一规则。");
	for (i = 0; i < n; i++) {
		save("lead", `fast 领先的第 ${i + 1} 步。`);
		fast = map.get(fast).next;
		save("advance", "fast 沿 next 前进。");
	}
	i = n - 1;
	while (true) {
		save("check", `fast.next 非空 → ${map.get(fast).next !== null}。`);
		if (map.get(fast).next === null) break;
		fast = map.get(fast).next;
		save("fast", "fast 前进一步。");
		slow = map.get(slow).next;
		save("slow", "slow 同步前进一步，保持 n 个节点间隔。");
	}
	const removed = map.get(slow).next;
	map.get(slow).next = map.get(removed).next;
	save("remove", `slow 位于目标前一个节点，令 next 跳过 ${removed}。`);
	answer = listValues(nodes, dummy.next);
	save("result", "返回 dummy.next；被跳过节点仍显示以便观察引用变化。");
	return steps;
}
const card = linkedListCard({
	title: "19. 删除链表的倒数第 N 个结点",
	description: "给定非空链表和有效 n，删除倒数第 n 个节点，返回新头节点。",
	idea: "两个指针从 dummy 出发，fast 先走 n 步，再同步走到 fast 位于末尾。slow 刚好位于目标前一个节点，只需改一次 next。",
	time: "O(L)，L 为节点数",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["n", "倒数名次"],
		["i", "领先步数下标"],
		["fast", "快指针"],
		["slow", "目标的前驱"],
	],
});
export const template = card.template;
export const mount = card.mount;
