import { heapCard, heapPush, heapPop } from "../shared/heap-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./215-code.js";
export const examples = [
	{
		label: "第二大",
		nums: [3, 2, 1, 5, 6, 4],
		k: 2,
		note: "始终保留当前最大的两项，最终根为 5。",
	},
	{
		label: "重复占排名",
		nums: [3, 2, 3, 1, 2, 4, 5, 5, 6],
		k: 4,
		note: "答案为 4；两个 5 都参与排名，不能去重。",
	},
	{
		label: "全部保留",
		nums: [-3, 0, -1],
		k: 3,
		note: "第 3 大就是最小值 -3。",
	},
	{
		label: "单元素",
		nums: [-10],
		k: 1,
		note: "没有弹出操作，直接返回唯一根节点。",
	},
];
export function buildTrace({ nums, k }) {
	const { steps, push } = recorder(),
		heap = [];
	let num = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			num,
			k,
			heap: heap.slice(0, 31),
			heapOmitted: Math.max(0, heap.length - 31),
			heaps: [
				{
					label: "保留前 k 大的小根堆",
					values: heap.slice(0, 31),
					length: heap.length,
				},
			],
			answer,
		});
	save("init", "创建空小根堆。");
	for (num of nums) {
		save("scan", `读取数值 ${num}。`);
		heapPush(heap, num);
		save("push", "插入并完成堆内部上浮：根仍为堆内最小值。");
		save("oversized", `数量是否超过 k=${k} → ${heap.length > k}。`);
		if (heap.length > k) {
			heapPop(heap);
			save("pop", "弹出最小根，并完成下沉调整。");
		}
	}
	answer = heap[0];
	save("result", "最终保留 k 个最大数，根就是第 k 大。");
	return steps;
}
const card = heapCard({
	title: "215. 数组中的第 K 个最大元素",
	description:
		"按从大到小排序后的第 k 项，重复数值也计数；不要求返回排序后的整个数组。",
	idea: "保留 k 项小根堆。例如 k=2，堆里保留 5 和 6，根 5 是第 2 大。新数进入后若超过 k 项，弹出最小值。一个步骤对应一次完整堆操作，不把堆画成排序数组。",
	time: "O(n log(k+1))",
	space: "O(k)",
	codes,
	examples,
	buildTrace,
	variables: [
		["num", "新数值"],
		["k", "排名"],
		["heap", "堆数组"],
	],
});
export const template = card.template;
export const mount = card.mount;
