import {
	linkedListCard,
	makeList,
	listValues,
} from "../shared/linked-list-card.js";
import { mergeTrace } from "../shared/merge-list-trace.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./148-code.js";
export const examples = [
	{
		label: "拆分并合并",
		input: [4, 2, 1, 3],
		note: "慢指针定位左半尾，断开成两条链；排好两半后按值重新连接原节点。",
	},
	{
		label: "负数和重复",
		input: [-1, 5, 3, 3, 0],
		note: "相同值也保留两个节点，<= 优先取左侧。",
	},
	{ label: "空链表", input: [], note: "直接返回空头，不创建新结果节点。" },
	{ label: "单节点", input: [1], note: "已经有序，直接返回原节点。" },
];
export function buildTrace({ input }) {
	const list = makeList(input),
		nodes = list.nodes,
		map = new Map(nodes.map((n) => [n.id, n])),
		{ steps, push } = recorder(),
		calls = [];
	let answer = null;
	const save = (line, text, f = {}, final = false) =>
		push(line, text, {
			nodes,
			...f,
			calls,
			answer,
			final,
			pointers: Object.fromEntries(
				Object.entries(f).filter(([k]) =>
					[
						"head",
						"slow",
						"fast",
						"middle",
						"left",
						"right",
						"a",
						"b",
						"tail",
						"dummy",
					].includes(k),
				),
			),
		});
	const merge = mergeTrace(nodes, map, save);
	function sort(head) {
		const f = {
			head,
			slow: null,
			fast: null,
			middle: null,
			left: null,
			right: null,
		};
		calls.push(head);
		const base = head === null || map.get(head).next === null;
		save("base", `为空或只有一个节点 → ${base}。`, f);
		if (base) {
			save("direct", "该链已经有序，返回原头。", f);
			calls.pop();
			return head;
		}
		f.slow = head;
		f.fast = map.get(head).next;
		save("bounds", "slow 从头开始，fast 从第二项开始。", f);
		while (true) {
			const loop = f.fast !== null && map.get(f.fast).next !== null;
			save("loop", `fast 可再走两步 → ${loop}。`, f);
			if (!loop) break;
			f.slow = map.get(f.slow).next;
			f.fast = map.get(map.get(f.fast).next).next;
			save("move", "slow 一步、fast 两步。", f);
		}
		f.middle = map.get(f.slow).next;
		save("middle", "记录右半链头。", f);
		map.get(f.slow).next = null;
		save("split", "断开 slow.next，得到两条独立链。", f);
		save("left", "递归排序左半。", f);
		f.left = sort(head);
		save("left", "接收左半有序链头。", f);
		save("right", "递归排序右半。", f);
		f.right = sort(f.middle);
		save("right", "接收右半有序链头。", f);
		save("result", "调用合并函数，将两条有序链接起来。", f);
		const result = merge(f.left, f.right);
		save("result", "本次合并返回有序链头。", f);
		calls.pop();
		return result;
	}
	const head = sort(list.head);
	answer = listValues(nodes, head);
	save("result", "最外层返回完整有序链表。", { head }, true);
	return steps;
}
const card = linkedListCard({
	title: "148. 排序链表",
	description:
		"将链表按节点值升序排列，返回排序后的头节点。",
	idea: "快慢指针拆成两半，递归排序后合并。例如 4→2 和 1→3 排成 2→4、1→3，再逐个连接得到 1→2→3→4。递归版使用 O(log n) 栈；原题的 O(1) 空间进阶需改成自底向上归并。",
	time: "O(n log n)",
	space: "O(log n)，递归版",
	codes,
	examples,
	buildTrace,
	variables: [
		["head", "本次链头"],
		["slow", "左半尾候选"],
		["fast", "定位中点"],
		["middle", "右半链头"],
		["a", "合并左链"],
		["b", "合并右链"],
		["tail", "合并结果尾"],
		["calls", "排序调用栈"],
	],
});
export const template = card.template;
export const mount = card.mount;
