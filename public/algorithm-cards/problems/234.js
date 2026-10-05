import { linkedListCard, makeList } from "../shared/linked-list-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./234-code.js";
export const examples = [
	{
		label: "偶数回文",
		input: [1, 2, 2, 1],
		note: "先收集值，再比较最外侧和内侧两对。",
	},
	{ label: "奇数回文", input: [1, 2, 1], note: "中间节点无需与自己比较。" },
	{ label: "不是回文", input: [1, 2], note: "第一对值不同，立即返回 false。" },
	{
		label: "单节点",
		input: [0],
		note: "合法最小样本，左右指针相同，返回 true。",
	},
];
export function buildTrace({ input }) {
	const { nodes, head } = makeList(input),
		map = new Map(nodes.map((n) => [n.id, n])),
		values = [],
		{ steps, push } = recorder();
	let current = head,
		left = null,
		right = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			nodes,
			current,
			left,
			right,
			values,
			answer,
			pointers: {
				current,
				left: left === null ? null : (nodes[left]?.id ?? null),
				right: right === null ? null : (nodes[right]?.id ?? null),
			},
			final: line === "fail",
		});
	save("init", "收集链表值；不改动原链表。");
	while (true) {
		save("scan", `current 非空 → ${current !== null}。`);
		if (current === null) break;
		values.push(map.get(current).val);
		save("collect", "当前值加入 values。");
		current = map.get(current).next;
		save("next", "沿 next 移到下个节点。");
	}
	left = 0;
	right = values.length - 1;
	save("ends", "左右下标从 values 两端开始。");
	while (true) {
		save("loop", `left < right → ${left < right}。`);
		if (left >= right) break;
		save("compare", `两端值不同 → ${values[left] !== values[right]}。`);
		if (values[left] !== values[right]) {
			answer = false;
			save("fail", "两端不等，返回 false。");
			return steps;
		}
		left++;
		right--;
		save("move", "本对相同，向中间移动。");
	}
	answer = true;
	save("result", "全部成对元素相同，返回 true。");
	return steps;
}
const card = linkedListCard({
	title: "234. 回文链表",
	description: "判断单链表从前向后与从后向前读到的值是否完全相同。",
	idea: "教学版先把值存入 values，再用左右下标比较。它使用 O(n) 额外空间；题目的 O(1) 空间进阶可通过反转后半段实现。",
	time: "O(n)",
	space: "O(n)",
	codes,
	examples,
	buildTrace,
	variables: [
		["current", "链表读取指针"],
		["values", "已读取的值"],
		["left", "比较左下标"],
		["right", "比较右下标"],
	],
});
export const template = card.template;
export const mount = card.mount;
