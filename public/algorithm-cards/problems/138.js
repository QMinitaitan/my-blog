import { linkedListCard, makeList } from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./138-code.js";
export const examples = [
	{
		label: "交叉随机指向",
		input: [
			[7, null],
			[13, 0],
			[11, 3],
			[10, 2],
			[1, 0],
		],
		note: "先创建所有 C 节点，再连接 next/random。橙色虚线表示 random，蓝线表示 next。",
	},
	{
		label: "同值不同节点",
		input: [
			[1, 1],
			[1, 0],
		],
		note: "两个值都是 1，但 N0 和 N1 是不同对象，必须各有一个独立副本。",
	},
	{
		label: "随机自环",
		input: [[3, 0]],
		note: "C0.random 指向 C0 自身，绝不能指回 N0。",
	},
	{ label: "空链", input: [], note: "None 映射到 None，直接返回空副本。" },
];
export function buildInput({ input }) {
	const list = makeList(input.map(([v]) => v));
	list.nodes.forEach(
		(n, i) => (n.random = input[i][1] === null ? null : `N${input[i][1]}`),
	);
	return { nodes: list.nodes, heads: { head: list.head } };
}
export function buildTrace(e) {
	const { nodes, heads } = buildInput(e),
		original = [...nodes],
		map = new Map(nodes.map((n) => [n.id, n])),
		clones = new Map([[null, null]]),
		{ steps, push } = recorder();
	let current = heads.head,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			current,
			clones: Object.fromEntries(clones),
			answer,
			pointers: {
				current,
				副本: clones.get(current) ?? null,
				新头: clones.get(heads.head) ?? null,
			},
		});
	save("init", "空指针映射到空指针，current 从原链头开始。");
	while (true) {
		save("first", `原链还有节点 → ${current !== null}。`);
		if (current === null) break;
		const node = map.get(current),
			copy = {
				id: current.replace("N", "C"),
				val: node.val,
				next: null,
				random: null,
			};
		nodes.push(copy);
		map.set(copy.id, copy);
		clones.set(current, copy.id);
		save("create", "只创建副本对象，指针暂时全为空。");
		current = node.next;
		save("nextFirst", "沿原链继续创建。");
	}
	current = heads.head;
	save("reset", "重新回到原链头，开始连接副本。");
	while (true) {
		save("second", `还有原节点待连接 → ${current !== null}。`);
		if (current === null) break;
		const node = map.get(current),
			copy = map.get(clones.get(current));
		copy.next = clones.get(node.next);
		save("nextLink", "副本 next 指向原后继对应的副本。");
		copy.random = clones.get(node.random);
		save("randomLink", "副本 random 指向原随机目标对应的副本。");
		current = node.next;
		save("nextSecond", "前进到下一个原节点。");
	}
	const copied = [];
	for (let id = clones.get(heads.head); id !== null; id = map.get(id).next)
		copied.push(map.get(id));
	answer = copied.map((n) => [
		n.val,
		n.random === null
			? null
			: copied.findIndex((other) => other.id === n.random),
	]);
	save("result", "返回独立副本头；next 和 random 都没有引用原节点。");
	return steps;
}
const card = linkedListCard({
	title: "138. 随机链表的复制",
	description:
		"每个节点除 next 外还有任意 random 指针，可指向链内任意节点或 None。深复制整个链表，返回独立副本头。",
	idea: "哈希表把原节点对象映射到新节点对象。第一遍先创建所有副本，第二遍再按映射连接两种指针；这样 random 指向尚未扫描到的节点也能正确处理。同值节点仍靠身份区分。",
	time: "O(n)，哈希操作平均 O(1)",
	space: "O(n)，映射表，不计输出副本",
	codes,
	examples,
	buildTrace,
	variables: [
		["current", "原链当前节点"],
		["clones", "原节点→副本映射"],
	],
});
export const template = card.template;
export const mount = card.mount;
