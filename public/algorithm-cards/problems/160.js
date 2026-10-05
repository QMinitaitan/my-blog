import { linkedListCard, makeList } from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./160-code.js";
export const examples = [
	{
		label: "共享尾段",
		input: [
			[4, 1],
			[5, 6, 1],
			[8, 4, 5],
		],
		note: "第三段是真正共享的 C 节点，两侧前缀长度不同。",
	},
	{
		label: "值相同但不相交",
		input: [[1, 2], [1, 2], []],
		note: "A、B 的值一样，节点引用不同，最终都到 None。",
	},
	{
		label: "同一个头",
		input: [[], [], [3, 4]],
		note: "两个头已经引用 C0，循环不执行。",
	},
	{
		label: "入口在尾节点",
		input: [[1], [2, 3], [7]],
		note: "切换链表抵消前缀长度差，最终在 C0 相遇。",
	},
];
export function buildInput({ input: [prefixA, prefixB, shared] }) {
	const a = makeList(prefixA, "A"),
		b = makeList(prefixB, "B"),
		c = makeList(shared, "C");
	if (a.nodes.length) a.nodes.at(-1).next = c.head;
	if (b.nodes.length) b.nodes.at(-1).next = c.head;
	return {
		nodes: [...a.nodes, ...b.nodes, ...c.nodes],
		heads: { headA: a.head ?? c.head, headB: b.head ?? c.head },
	};
}
export function buildTrace(example) {
	const { nodes, heads } = buildInput(example),
		map = new Map(nodes.map((n) => [n.id, n])),
		{ steps, push } = recorder();
	let a = heads.headA,
		b = heads.headB,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			a,
			b,
			answer,
			pointers: { a, b, headA: heads.headA, headB: heads.headB },
		});
	save("init", "两个指针分别从 A、B 的头开始。");
	while (true) {
		save("check", `a、b 引用不同节点 → ${a !== b}。`);
		if (a === b) break;
		a = a === null ? heads.headB : map.get(a).next;
		save(
			"a",
			a === heads.headB
				? "a 为空后切换到 B 头；否则沿 next 前进。"
				: "a 沿 next 前进一步。",
		);
		b = b === null ? heads.headA : map.get(b).next;
		save(
			"b",
			b === heads.headA
				? "b 为空后切换到 A 头；否则沿 next 前进。"
				: "b 沿 next 前进一步。",
		);
	}
	answer = a;
	save(
		"result",
		a === null
			? "两个指针同时为空，没有相交节点。"
			: `两个指针引用同一节点 ${a}，返回它。`,
	);
	return steps;
}
const card = linkedListCard({
	title: "160. 相交链表",
	description:
		"两条无环链表若共享同一尾段，返回第一个共享节点引用；不相交返回空指针。",
	idea: "a 走 A 后再走 B，b 走 B 后再走 A，两者经过相同总长度，消除前缀差。相同值不代表相交，画面使用不同节点编号区分身份。",
	time: "O(m+n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["a", "A 后接 B 的指针"],
		["b", "B 后接 A 的指针"],
	],
});
export const template = card.template;
export const mount = card.mount;
