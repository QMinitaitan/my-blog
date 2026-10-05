import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./189-code.js";
export const examples = [
	{
		label: "右移三步",
		nums: [1, 2, 3, 4, 5, 6, 7],
		k: 3,
		note: "全体翻转，再翻转前 3 个和后 4 个。",
	},
	{
		label: "大于数组长度",
		nums: [-1, -100, 3, 99],
		k: 6,
		note: "k = 6 对长 4 的数组等价于右移 2 步。",
	},
	{ label: "零步", nums: [1, 2, 3], k: 0, note: "三次翻转后仍恢复原数组。" },
	{ label: "单元素", nums: [5], k: 10, note: "所有翻转区间都无需交换。" },
];
export function buildTrace({ nums, k }) {
	const values = [...nums],
		{ steps, push } = recorder();
	let left = null,
		right = null,
		part = "";
	k %= values.length;
	const save = (line, text) =>
		push(line, text, {
			values,
			k,
			left,
			right,
			pointers: { left, right },
			visualNote: part,
			answer: line === "result" ? values : undefined,
		});
	save("init", `k 对数组长度取余，得到 ${k}。`);
	function reverse(l, r, line, label) {
		part = label;
		left = l;
		right = r;
		save(line, `调用翻转 [${l}, ${r}]。`);
		while (true) {
			save("check", `left < right → ${left < right}。`);
			if (left >= right) break;
			[values[left], values[right]] = [values[right], values[left]];
			save("swap", "交换区间两端的值。");
			left++;
			save("left", "left 前进。");
			right--;
			save("right", "right 后退。");
		}
	}
	reverse(0, values.length - 1, "all", "第一段：翻转整个数组");
	reverse(0, k - 1, "first", "第二段：翻转前 k 个");
	reverse(k, values.length - 1, "second", "第三段：翻转剩余元素");
	left = right = null;
	save("result", "原地轮转完成，函数不返回数组。");
	return steps;
}
const card = sequenceCard({
	title: "189. 轮转数组",
	description: "把数组向右轮转 k 步，原地修改数组。",
	idea: "先整体翻转，再分别翻转前 k 个与其余元素，三次翻转恢复各组内部顺序。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["k", "实际轮转步数"],
		["left", "翻转左端"],
		["right", "翻转右端"],
	],
});
export const template = card.template;
export const mount = card.mount;
