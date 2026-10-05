import { linkedListCard, makeList } from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./141-code.js";
export const examples = [
	{
		label: "尾部连回中间",
		input: [3, 2, 0, -4],
		pos: 1,
		note: "尾节点 next 指向 N1；快慢指针在环内相遇。",
	},
	{
		label: "没有环",
		input: [1, 2, 3],
		pos: -1,
		note: "fast 先到链尾，循环终止。",
	},
	{
		label: "单节点自环",
		input: [1],
		pos: 0,
		note: "两个指针走一步后都仍引用 N0。",
	},
	{ label: "空链表", input: [], pos: -1, note: "fast 初始为空，返回 false。" },
];
export function buildInput({ input, pos }) {
	const graph = makeList(input);
	if (pos >= 0) graph.nodes.at(-1).next = graph.nodes[pos].id;
	return { nodes: graph.nodes, heads: { head: graph.head } };
}
export function buildTrace(example) {
	const { nodes, heads } = buildInput(example),
		map = new Map(nodes.map((n) => [n.id, n])),
		{ steps, push } = recorder();
	let slow = heads.head,
		fast = heads.head,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			slow,
			fast,
			answer,
			pointers: { slow, fast },
			final: line === "hit",
		});
	save("init", "slow、fast 初始都指向 head；只有移动后相遇才说明有环。");
	while (true) {
		save(
			"loop",
			`fast 和 fast.next 非空 → ${fast !== null && map.get(fast).next !== null}。`,
		);
		if (fast === null || map.get(fast).next === null) break;
		slow = map.get(slow).next;
		save("slow", "慢指针走一步。");
		fast = map.get(map.get(fast).next).next;
		save("fast", "快指针走两步。");
		save("match", `两个指针引用同一节点 → ${slow === fast}。`);
		if (slow === fast) {
			answer = true;
			save("hit", "在环内相遇，返回 true。");
			return steps;
		}
	}
	answer = false;
	save("result", "快指针到达链尾，没有环。");
	return steps;
}
const card = linkedListCard({
	title: "141. 环形链表",
	description:
		"判断沿 next 前进是否会重复访问同一个节点。pos 只用于构造样本，不是函数参数。",
	idea: "慢指针每次一步，快指针每次两步。无环时快指针到达空指针；有环时快指针在环内追上慢指针。比较引用身份，不比较值。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["slow", "慢指针"],
		["fast", "快指针"],
	],
});
export const template = card.template;
export const mount = card.mount;
