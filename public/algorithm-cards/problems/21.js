import {
	linkedListCard,
	makeList,
	listValues,
} from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./21-code.js";
export const examples = [
	{
		label: "交替合并",
		l1: [1, 2, 4],
		l2: [1, 3, 4],
		note: "相等时先接 A 的节点，仍保持非递减。",
	},
	{ label: "左侧空", l1: [], l2: [0], note: "循环不执行，直接接上右侧链表。" },
	{ label: "两侧空", l1: [], l2: [], note: "dummy.next 仍为空。" },
	{
		label: "整段剩余",
		l1: [-3, -1],
		l2: [2, 5],
		note: "左侧耗尽后，将右侧剩余整段接到 tail。",
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
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			l1,
			l2,
			tail,
			answer,
			pointers: { l1, l2, tail, dummy: "D" },
		});
	save("init", "dummy 不计入结果，tail 是当前结果尾指针。");
	while (true) {
		save("check", `两个待处理头都非空 → ${l1 !== null && l2 !== null}。`);
		if (l1 === null || l2 === null) break;
		save(
			"compare",
			`l1.val <= l2.val → ${map.get(l1).val <= map.get(l2).val}。`,
		);
		if (map.get(l1).val <= map.get(l2).val) {
			map.get(tail).next = l1;
			save("linkLeft", "尾指针接上左链表当前节点。");
			l1 = map.get(l1).next;
			save("left", "左链表待处理头后移。");
		} else {
			map.get(tail).next = l2;
			save("linkRight", "尾指针接上右链表当前节点。");
			l2 = map.get(l2).next;
			save("right", "右链表待处理头后移。");
		}
		tail = map.get(tail).next;
		save("tail", "tail 移到刚接上的节点。");
	}
	map.get(tail).next = l1 ?? l2;
	save("rest", "一侧已空，接上另一侧的剩余整段。");
	answer = listValues(nodes, dummy.next);
	save("result", "返回 dummy.next，保留所有原节点身份。");
	return steps;
}
const card = linkedListCard({
	title: "21. 合并两个有序链表",
	description: "将两个非递减单链表的节点合并成一条非递减链表，返回头节点。",
	idea: "用 dummy 简化第一次连接。每次接较小的头节点并移动对应指针；一侧耗尽后直接接上另一侧剩余部分。",
	time: "O(m+n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["l1", "左侧待处理头"],
		["l2", "右侧待处理头"],
		["tail", "结果尾指针"],
	],
});
export const template = card.template;
export const mount = card.mount;
