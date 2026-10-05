import { linkedListCard } from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./142-code.js";
import { buildInput } from "./141.js";
export { buildInput };
export const examples = [
	{
		label: "入口在中间",
		input: [3, 2, 0, -4],
		pos: 1,
		note: "相遇点不一定是入口；finder 从头出发，与 slow 同速前进。",
	},
	{
		label: "入口就是头",
		input: [1, 2],
		pos: 0,
		note: "相遇后 finder 已经等于 slow，不进入第二个循环。",
	},
	{ label: "无环", input: [1], pos: -1, note: "直接返回 None。" },
	{
		label: "重复值",
		input: [1, 1, 1],
		pos: 1,
		note: "值相同不能判断入口，必须比较节点身份。",
	},
];
export function buildTrace(example) {
	const { nodes, heads } = buildInput(example),
		map = new Map(nodes.map((n) => [n.id, n])),
		{ steps, push } = recorder();
	let slow = heads.head,
		fast = heads.head,
		finder = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			slow,
			fast,
			finder,
			answer,
			pointers: { slow, fast, finder },
			final: line === "hit",
		});
	save("init", "先用快慢指针寻找环内相遇点。");
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
		save("match", `slow 与 fast 引用相同 → ${slow === fast}。`);
		if (slow === fast) {
			finder = heads.head;
			save("finder", "finder 从头出发，slow 留在相遇点。");
			while (true) {
				save("search", `finder 与 slow 不同 → ${finder !== slow}。`);
				if (finder === slow) break;
				finder = map.get(finder).next;
				save("findMove", "finder 前进一步。");
				slow = map.get(slow).next;
				save("slowMove", "slow 也前进一步。");
			}
			answer = finder;
			save("hit", `两者在入口 ${finder} 相遇，返回该节点引用。`);
			return steps;
		}
	}
	save("result", "没有环，返回 None。");
	return steps;
}
const card = linkedListCard({
	title: "142. 环形链表 II",
	description: "返回环的入口节点引用；没有环则返回空指针。",
	idea: "设头到入口距离 a，入口到相遇点 b，环长 L。相遇时 a+b 是 L 的整数倍；因此从头和相遇点各走 a 步，会在入口相遇。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["slow", "慢指针"],
		["fast", "快指针"],
		["finder", "从头寻找入口"],
	],
});
export const template = card.template;
export const mount = card.mount;
