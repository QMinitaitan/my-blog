import {
	linkedListCard,
	makeList,
	listValues,
} from "../shared/linked-list-card.js";
import { mergeTrace } from "../shared/merge-list-trace.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./23-code.js";
export const examples = [
	{
		label: "三条有序链",
		lists: [
			[1, 4, 5],
			[1, 3, 4],
			[2, 6],
		],
		note: "第一轮合并 0/1，第三条保留；第二轮把 0/2 合并。",
	},
	{ label: "空列表", lists: [], note: "没有任何链，直接返回 None。" },
	{
		label: "含空链",
		lists: [[], [-2, 0], []],
		note: "空链也保留其位置，合并函数直接接上另一条链。",
	},
	{
		label: "重复元素",
		lists: [[1, 1], [1]],
		note: "三个 1 都保留原节点身份，不能去重。",
	},
];
export function buildTrace({ lists: input }) {
	const graphs = input.map((a, i) => makeList(a, `L${i}N`)),
		nodes = graphs.flatMap((g) => g.nodes),
		lists = graphs.map((g) => g.head),
		map = new Map(nodes.map((n) => [n.id, n])),
		{ steps, push } = recorder();
	let interval = null,
		i = null,
		answer = null;
	const save = (line, text, f = {}, final = false) =>
		push(line, text, {
			nodes,
			lists,
			interval,
			i,
			...f,
			answer,
			final,
			pointers: Object.fromEntries(
				Object.entries(f).filter(([k]) =>
					["a", "b", "tail", "dummy", "head"].includes(k),
				),
			),
		});
	const merge = mergeTrace(nodes, map, save);
	save("empty", `链头列表为空 → ${lists.length === 0}。`);
	if (!lists.length) {
		answer = [];
		save("nil", "返回空链。", {}, true);
		return steps;
	}
	interval = 1;
	save("init", "相邻两条链先配对。");
	while (true) {
		save("round", `间隔 ${interval} 小于链数量 → ${interval < lists.length}。`);
		if (interval >= lists.length) break;
		for (i = 0; i < lists.length - interval; i += interval * 2) {
			save("pair", `配对链头位置 ${i} 和 ${i + interval}。`);
			save("merge", "开始合并这一对有序链。");
			lists[i] = merge(lists[i], lists[i + interval]);
			save("merge", "合并后的头放回 lists[i]。");
		}
		i =
			lists.length - interval > 0
				? Math.floor((lists.length - interval - 1) / (interval * 2)) *
					interval *
					2
				: i;
		interval *= 2;
		save("advance", "下一轮间隔翻倍，合并更大的有序组。");
	}
	answer = listValues(nodes, lists[0]);
	save("result", "返回第一个位置保存的完整合并链。", { head: lists[0] }, true);
	return steps;
}
const card = linkedListCard({
	title: "23. 合并 K 个升序链表",
	description:
		"将 k 条升序链表合并为一条升序链表。链和链头列表都可以为空，重复节点值全部保留。",
	idea: "两两归并，间隔从 1、2、4 逐轮翻倍。例如三条链先合并 0/1，再合并 0/2。每轮所有节点最多参与一次归并，避免每次从全部链头中线性找最小值。",
	time: "O(N log(k+1))，N 为总节点数",
	space: "O(1) 额外算法空间，原地复用 lists 存各轮链头",
	codes,
	examples,
	buildTrace,
	variables: [
		["lists", "各位置保存的链头"],
		["interval", "配对间隔"],
		["i", "当前配对起点"],
		["a", "合并左链"],
		["b", "合并右链"],
		["tail", "合并结果尾"],
	],
});
export const template = card.template;
export const mount = card.mount;
