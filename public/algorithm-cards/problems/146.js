import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./146-code.js";
export const examples = [
	{
		label: "访问改变淘汰对象",
		operations: [
			["LRUCache", [2]],
			["put", [1, 1]],
			["put", [2, 2]],
			["get", [1]],
			["put", [3, 3]],
			["get", [2]],
			["put", [4, 4]],
			["get", [1]],
			["get", [3]],
			["get", [4]],
		],
		note: "访问 1 后它成为最近使用，放入 3 时淘汰的是 2。左端最久未用，右端最近使用。",
	},
	{
		label: "更新已有键",
		operations: [
			["LRUCache", [2]],
			["put", [1, 10]],
			["put", [2, 20]],
			["put", [1, 11]],
			["put", [3, 30]],
			["get", [1]],
			["get", [2]],
		],
		note: "更新 1 的值并移动到最近端，不能新增重复键。",
	},
	{
		label: "容量为一",
		operations: [
			["LRUCache", [1]],
			["get", [7]],
			["put", [7, 0]],
			["get", [7]],
			["put", [8, 8]],
			["get", [7]],
		],
		note: "未命中返回 -1；缓存值 0 是有效命中；新键进入后淘汰旧键。",
	},
];
export function buildTrace({ operations }) {
	const cache = new Map(),
		{ steps, push } = recorder(),
		answer = [];
	let capacity = null,
		key = null,
		value = null,
		operation = null;
	// 监控窗口只取前 8 个键及最近键，避免每一步复制容量级数据。
	let recentKey = null;
	const save = (line, text, final = false) => {
		const visible = [];
		let index = 0;
		for (const entry of cache) {
			visible.push({ entry, index: index++ });
			if (visible.length === 8) break;
		}
		if (
			cache.size > 8 &&
			recentKey !== null &&
			!visible.some((v) => v.entry[0] === recentKey)
		)
			visible.push({
				entry: [recentKey, cache.get(recentKey)],
				index: cache.size - 1,
			});
		push(line, text, {
			values: visible.map(({ entry: [k, v] }) => `${k}→${v}`),
			...(cache.size > 8
				? { valueLength: cache.size, valueIndices: visible.map((v) => v.index) }
				: {}),
			cache: Object.fromEntries(visible.map((v) => v.entry)),
			cacheOmitted: cache.size - visible.length,
			capacity,
			key,
			value,
			operation,
			answer,
			final,
			visualNote: `访问顺序：左端最久未用，右端最近使用。共 ${cache.size} 项${cache.size > 8 ? "，中间省略" : ""}。`,
		});
	};
	operations.forEach(([method, args], i) => {
		operation = method;
		key = args[0] ?? null;
		value = method === "put" ? args[1] : null;
		const final = i === operations.length - 1;
		if (method === "LRUCache") {
			capacity = args[0];
			key = null;
			answer.push(null);
			save("init", "创建固定正容量的有序缓存。", final);
		} else if (method === "get") {
			const contains = cache.has(key);
			save("contains", `缓存不含 key → ${!contains}。`);
			if (!contains) {
				answer.push(-1);
				save("miss", "未命中返回 -1，访问顺序不变。", final);
			} else {
				const stored = cache.get(key);
				cache.delete(key);
				cache.set(key, stored);
				recentKey = key;
				save("touch", "命中，把该键移到最近使用端。");
				answer.push(stored);
				save("get", "返回缓存值，0 也属于有效命中。", final);
			}
		} else {
			if (!cache.has(key)) recentKey = key;
			cache.set(key, value);
			save("write", "新增或更新该键的值。");
			cache.delete(key);
			cache.set(key, value);
			recentKey = key;
			save("recent", "将该键移动到最近使用端。");
			if (cache.size > capacity) {
				save("full", "缓存数量超过容量。");
				cache.delete(cache.keys().next().value);
				answer.push(null);
				save("evict", "移除最久未使用键，put 返回 None。", final);
			} else {
				answer.push(null);
				save("full", "未超过容量，put 返回 None。", final);
			}
		}
	});
	return steps;
}
const card = sequenceCard({
	title: "146. LRU 缓存",
	description:
		"实现固定容量缓存 get/put。命中访问和写入都算最近使用；超出容量时淘汰最久未使用键。未命中 get 返回 -1。",
	idea: "画面展示有序映射的真实访问顺序。Python 用 OrderedDict，Java 用访问顺序 LinkedHashMap，JS 用 Map 删除再插入，C++ 用哈希表加链表迭代器。库调用内部指针不伪装成教学代码中的变量。",
	time: "get/put 平均 O(1)；JS Map 标准只保证平均次线性访问，常见引擎为平均 O(1)",
	space: "O(capacity)",
	codes,
	examples,
	buildTrace,
	variables: [
		["operation", "当前方法"],
		["key", "当前键"],
		["value", "写入值"],
		["capacity", "容量"],
		["cache", "键值映射"],
		["answer", "方法返回值"],
	],
});
export const template = card.template;
export const mount = card.mount;
