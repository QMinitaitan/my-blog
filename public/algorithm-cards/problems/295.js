import { heapCard, heapPush, heapPop } from "../shared/heap-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./295-code.js";
export const examples = [
	{
		label: "奇偶数量",
		operations: [
			["MedianFinder", []],
			["addNum", [1]],
			["addNum", [2]],
			["findMedian", []],
			["addNum", [3]],
			["findMedian", []],
		],
		note: "两个数取两根平均值 1.5，三个数取 low 对应原值 2。",
	},
	{
		label: "乱序与负数",
		operations: [
			["MedianFinder", []],
			["addNum", [-5]],
			["addNum", [10]],
			["addNum", [0]],
			["findMedian", []],
		],
		note: "先把低半区最大值移往高半区，再平衡数量，保持低半区所有值不大于高半区。",
	},
	{
		label: "重复值",
		operations: [
			["MedianFinder", []],
			["addNum", [2]],
			["addNum", [2]],
			["findMedian", []],
		],
		note: "重复值同样占一个位置，中位数为 2。",
	},
];
export function buildTrace({ operations }) {
	const { steps, push } = recorder(),
		low = [],
		high = [],
		answer = [];
	let num = null,
		operation = null;
	const save = (line, text, final = false) =>
		push(line, text, {
			low: low.slice(0, 31),
			high: high.slice(0, 31),
			lowOmitted: Math.max(0, low.length - 31),
			highOmitted: Math.max(0, high.length - 31),
			heaps: [
				{
					label: "低半区大根堆（画面显示原值；low 数组保存相反数）",
					values: low.slice(0, 31).map((n) => -n),
					length: low.length,
				},
				{
					label: "高半区小根堆",
					values: high.slice(0, 31),
					length: high.length,
				},
			],
			num,
			operation,
			answer,
			final,
		});
	operations.forEach(([method, args], index) => {
		operation = method;
		num = method === "addNum" ? args[0] : null;
		const final = index === operations.length - 1;
		if (method === "MedianFinder") {
			answer.push(null);
			save("init", "创建两个空堆。", final);
		} else if (method === "addNum") {
			heapPush(low, -num);
			save("push", `将 ${-num} 插入 low，原值为 ${num}。`);
			heapPush(high, -heapPop(low));
			save("transfer", "把低半区最大原值转移到高半区。");
			if (low.length < high.length) {
				save("balance", "低半区数量更少，需要调整。");
			}
			if (low.length < high.length) {
				heapPush(low, -heapPop(high));
				answer.push(null);
				save("rebalance", "把高半区最小值移回低半区，数量差不超过一。", final);
			} else {
				answer.push(null);
				save("balance", "无需搬移，addNum 返回 None。", final);
			}
		} else {
			save("odd", `低半区多一个元素 → ${low.length > high.length}。`);
			if (low.length > high.length) {
				answer.push(-low[0]);
				save("single", "奇数数量，中位数是低半区最大原值。", final);
			} else {
				answer.push((-low[0] + high[0]) / 2);
				save("average", "偶数数量，取两个根所表示原值的平均。", final);
			}
		}
	});
	return steps;
}
const card = heapCard({
	title: "295. 数据流的中位数",
	description:
		"不断调用 addNum 添加整数，findMedian 返回到目前为止所有数的中位数。查询时保证已有至少一个数。",
	idea: "低半区用大根堆，高半区用小根堆；低半区允许多一项。统一把 low 的原值取反后存入小根堆，四种语言都采用这个表示。两堆边界就是中间一项或两项。",
	time: "addNum O(log n)，findMedian O(1)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["operation", "当前方法"],
		["num", "新数值"],
		["low", "低半区相反数堆"],
		["high", "高半区原值堆"],
		["answer", "各次方法返回值"],
	],
});
export const template = card.template;
export const mount = card.mount;
