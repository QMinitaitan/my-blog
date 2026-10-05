import {
	linkedListCard,
	makeList,
	listValues,
} from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./25-code.js";
export const examples = [
	{
		label: "余下不足一组",
		input: [1, 2, 3, 4, 5],
		k: 2,
		note: "先确认整组存在再反转；最后一个 5 原样保留。",
	},
	{
		label: "每组三项",
		input: [1, 2, 3, 4, 5],
		k: 3,
		note: "前三个反转成 3→2→1，后两个保持原序。",
	},
	{
		label: "k 等于 1",
		input: [7],
		k: 1,
		note: "节点不交换，但仍经历确认边界和连接步骤。",
	},
	{
		label: "整条一组",
		input: [1, 2, 3],
		k: 3,
		note: "原头节点变成组尾，接到 group_next=None。",
	},
];
export function buildTrace({ input, k }) {
	const list = makeList(input),
		dummy = { id: "D", val: 0, next: list.head },
		nodes = [dummy, ...list.nodes],
		map = new Map(nodes.map((n) => [n.id, n])),
		{ steps, push } = recorder();
	let group_previous = "D",
		kth = null,
		group_next = null,
		previous = null,
		current = null,
		following = null,
		old_head = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			k,
			group_previous,
			kth,
			group_next,
			previous,
			current,
			following,
			old_head,
			answer,
			pointers: {
				group_previous,
				kth,
				group_next,
				previous,
				current,
				following,
			},
		});
	save("init", "虚拟头和组前驱准备好。");
	while (true) {
		save("loop", "开始确认下一组。");
		kth = group_previous;
		save("kth", "从前驱出发，向后查 k 个节点。");
		for (let count = 0; count < k; count++) {
			save("scan", `确认组内第 ${count + 1} 个位置。`);
			kth = map.get(kth).next;
			save("advance", "kth 向后移动。");
			save("short", `kth 是否为空 → ${kth === null}。`);
			if (kth === null) {
				answer = listValues(nodes, dummy.next);
				save("result", "不足一组，未改动剩余连接，返回当前链头。");
				return steps;
			}
		}
		group_next = map.get(kth).next;
		save("boundary", "保存组后的首节点，作为反转停止边界。");
		previous = group_next;
		current = map.get(group_previous).next;
		save("bounds", "previous 从组后开始，current 从组头开始。");
		while (true) {
			save("reverse", `current 尚未到组后边界 → ${current !== group_next}。`);
			if (current === group_next) break;
			following = map.get(current).next;
			save("remember", "先保存下一节点，防止断链后丢失。");
			map.get(current).next = previous;
			save("link", "当前节点反向接到 previous。");
			previous = current;
			current = following;
			save("move", "两引用一起前进。");
		}
		old_head = map.get(group_previous).next;
		save("old", "原组头现在是组尾。");
		map.get(group_previous).next = kth;
		save("front", "组前驱接到反转后的新组头 kth。");
		group_previous = old_head;
		save("nextGroup", "组尾作为下一组前驱。");
	}
}
const card = linkedListCard({
	title: "25. K 个一组翻转链表",
	description:
		"每 k 个节点原地翻转，剩余不足 k 个时保持原序；只能修改连接，不能交换节点值。",
	idea: "先找到 kth 确认完整组，再以 group_next 为停止边界逐个反转。previous 初始指向 group_next，让旧组头自动接上剩余链表。最后让组前驱接 kth，移动到旧组头。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["k", "每组数量"],
		["group_previous", "组前驱"],
		["kth", "完整组尾"],
		["group_next", "组后边界"],
		["current", "反转当前节点"],
		["previous", "已反转部分头"],
		["following", "暂存后继"],
	],
});
export const template = card.template;
export const mount = card.mount;
