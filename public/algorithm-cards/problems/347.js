import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./347-code.js";
export const examples = [
	{
		label: "频率分组",
		nums: [1, 1, 1, 2, 2, 3],
		k: 2,
		note: "1 进入频率 3 的桶，2 进入频率 2 的桶，从大到小选两项。",
	},
	{
		label: "唯一数值",
		nums: [5, 5],
		k: 1,
		note: "只需返回 5，不能返回它的出现次数 2。",
	},
	{
		label: "全部都选",
		nums: [-1, -1, 2, 3],
		k: 3,
		note: "频率相同的数字顺序不限，答案集合唯一。",
	},
	{
		label: "零与负数",
		nums: [0, 0, 0, -2, -2, 4],
		k: 2,
		note: "频率与数字大小无关，零也作为正常哈希键。",
	},
];
export function buildTrace({ nums, k }) {
	const counts = new Map(),
		bucketView = new Map(),
		{ steps, push } = recorder();
	let buckets = null,
		answer = null,
		num = null,
		frequency = null,
		index = null; // 大输入只复制少量可见键和桶，计数与桶算法仍保存全部真实数据。
	function previewCounts() {
		const visible = [];
		for (const entry of counts) {
			visible.push(entry);
			if (visible.length === 16) break;
		}
		if (counts.has(num) && !visible.some(([key]) => key === num))
			visible.push([num, counts.get(num)]);
		return visible;
	}
	function previewBuckets() {
		if (buckets === null) return null;
		const visible = [];
		for (const [f, items] of bucketView) {
			visible.push({
				frequency: f,
				items: items.slice(0, 16),
				omitted: Math.max(0, items.length - 16),
			});
			if (visible.length === 8) break;
		}
		if (frequency !== null && !visible.some((b) => b.frequency === frequency)) {
			const items = buckets[frequency] ?? [];
			visible.push({
				frequency,
				items: items.slice(0, 16),
				omitted: Math.max(0, items.length - 16),
			});
		}
		return visible;
	}
	const save = (line, text) => {
		const visible = previewCounts(),
			shown = previewBuckets();
		push(line, text, {
			values: nums,
			counts: Object.fromEntries(visible),
			countsOmitted: counts.size - visible.length,
			bucketEntries: shown,
			bucketEntriesOmitted: Math.max(
				0,
				bucketView.size - (shown?.filter((b) => b.items.length).length ?? 0),
			),
			answer,
			num,
			frequency,
			k,
			pointers: index === null ? {} : { 读取: index },
			final: line === "hit",
		});
	};
	save("init", "创建数值到出现次数的哈希表。");
	for (index = 0; index < nums.length; index++) {
		num = nums[index];
		save("scan", `读取数值 ${num}。`);
		counts.set(num, (counts.get(num) || 0) + 1);
		save("count", "出现次数加一。");
	}
	index = null;
	buckets = Array.from({ length: nums.length + 1 }, () => []);
	save("buckets", "最大频率不会超过 n，分配 n+1 个桶。");
	for ([num, frequency] of counts) {
		save("entry", `数值 ${num} 的频率是 ${frequency}。`);
		buckets[frequency].push(num);
		bucketView.set(frequency, buckets[frequency]);
		save("place", `放入 buckets[${frequency}]。`);
	}
	answer = [];
	save("answer", "开始从高频桶收集答案。");
	for (frequency = nums.length; frequency > 0; frequency--) {
		save("frequency", `检查频率 ${frequency} 的桶。`);
		for (num of buckets[frequency]) {
			save("candidate", `桶中候选 ${num}。`);
			answer.push(num);
			save("collect", "将该数值加入答案。");
			save("complete", `已收集 k=${k} 项 → ${answer.length === k}。`);
			if (answer.length === k) {
				save("hit", "已经选满最高频 k 项，立即返回。");
				return steps;
			}
		}
	}
	save("result", "返回收集结果。");
	return steps;
}
const card = sequenceCard({
	title: "347. 前 K 个高频元素",
	description:
		"返回数组中出现频率最高的 k 个不同数值，结果顺序不限，题目保证答案集合唯一。",
	idea: "先计数，再把数值放到“出现次数”下标的桶中。按桶下标从 n 往下取，避免对所有不同数值排序。",
	time: "O(n)，哈希操作按平均 O(1) 计",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["num", "当前数值"],
		["frequency", "出现次数/当前桶"],
		["counts", "计数哈希表"],
		["k", "需选数量"],
	],
});
export const template = card.template;
export const mount = card.mount;
