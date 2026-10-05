import {
	linkedListCard,
	makeList,
	listValues,
} from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./206-code.js";
export const examples = [
	{
		label: "三个节点",
		input: [1, 2, 3],
		note: "先保存 following，再反转 current.next，避免丢失后半段。",
	},
	{ label: "空链表", input: [], note: "current 为空，直接返回空指针。" },
	{ label: "单节点", input: [5], note: "next 改为空，previous 指向唯一节点。" },
	{
		label: "重复值",
		input: [1, 1, 2],
		note: "相同值也有不同节点编号，反转的是节点连接。",
	},
];
export function buildTrace({ input }) {
	const { nodes, head } = makeList(input),
		map = new Map(nodes.map((n) => [n.id, n])),
		{ steps, push } = recorder();
	let previous = null,
		current = head,
		following = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			previous,
			current,
			following,
			answer,
			pointers: { previous, current, following },
		});
	save("init", "previous 是已反转部分的头，current 是待处理部分的头。");
	while (true) {
		save("check", `current 非空 → ${current !== null}。`);
		if (current === null) break;
		following = map.get(current).next;
		save("save", "保存原 next，后半段不会丢失。");
		map.get(current).next = previous;
		save("link", "当前节点 next 改为 previous，箭头反向。");
		previous = current;
		save("previous", "已反转部分头移到当前节点。");
		current = following;
		save("current", "沿保存的 following 处理下一节点。");
	}
	answer = listValues(nodes, previous);
	save("result", "返回 previous，它是反转后的链表头。");
	return steps;
}
const card = linkedListCard({
	title: "206. 反转链表",
	description: "反转单链表的所有 next 指针，返回新的头节点。",
	idea: "每次维护已反转部分和未处理部分。先保存 following，改 next，再移动 previous、current；四步顺序不可交换。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["previous", "已反转头"],
		["current", "待处理头"],
		["following", "保存的下一节点"],
	],
});
export const template = card.template;
export const mount = card.mount;
