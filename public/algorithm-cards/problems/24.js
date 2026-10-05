import {
	linkedListCard,
	makeList,
	listValues,
} from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./24-code.js";
export const examples = [
	{
		label: "两对",
		input: [1, 2, 3, 4],
		note: "分别交换 N0/N1、N2/N3，值不修改。",
	},
	{ label: "奇数节点", input: [1, 2, 3], note: "最后只有一个节点，保持原位。" },
	{ label: "空链表", input: [], note: "没有完整一对，直接返回空。" },
	{
		label: "单节点",
		input: [1],
		note: "存在 first 但没有 second，循环不进入。",
	},
];
export function buildTrace({ input }) {
	const list = makeList(input),
		dummy = { id: "D", val: 0, next: list.head },
		nodes = [dummy, ...list.nodes],
		map = new Map(nodes.map((node) => [node.id, node])),
		{ steps, push } = recorder();
	let previous = "D",
		first = null,
		second = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			previous,
			first,
			second,
			answer,
			pointers: { previous, first, second, dummy: "D" },
		});
	save("init", "previous 位于本次待交换一对之前。");
	while (true) {
		const next = map.get(previous).next,
			hasPair = next !== null && map.get(next).next !== null;
		save("check", `后面有完整两个节点 → ${hasPair}。`);
		if (!hasPair) break;
		first = next;
		save("first", "记录第一个节点引用。");
		second = map.get(first).next;
		save("second", "记录第二个节点引用。");
		map.get(previous).next = second;
		save("front", "前驱先指向 second。");
		map.get(first).next = map.get(second).next;
		save("rest", "first 接上原来 second 后面的剩余链表。");
		map.get(second).next = first;
		save("back", "second 接上 first，完成这一对交换。");
		previous = first;
		save("previous", "first 现在是一对的尾部，作为下一对的前驱。");
	}
	answer = listValues(nodes, dummy.next);
	save("result", "返回交换后的头节点，单个剩余节点保持原连接。");
	return steps;
}
const card = linkedListCard({
	title: "24. 两两交换链表中的节点",
	description:
		"每相邻两个节点交换位置，不能仅修改节点值；最后单独一个节点保持原位。",
	idea: "维护 previous、first、second 三个引用。依次连接 previous→second、first→剩余部分、second→first，再让 previous 移到这一对的新尾节点。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["previous", "本对前驱"],
		["first", "本对第一个"],
		["second", "本对第二个"],
	],
});
export const template = card.template;
export const mount = card.mount;
