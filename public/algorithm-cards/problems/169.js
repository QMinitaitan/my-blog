import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./169-code.js";
export const examples = [
	{
		label: "候选更换",
		nums: [2, 2, 1, 1, 1, 2, 2],
		note: "票数归零时更换候选，最终多数元素仍会留下。",
	},
	{
		label: "三元素",
		nums: [3, 2, 3],
		note: "不同元素相互抵消，多数元素剩余。",
	},
	{
		label: "多数元素为零",
		nums: [0, 1, 0],
		note: "candidate = 0 是实际数值，count 才表示有效票数。",
	},
	{ label: "单元素", nums: [-1], note: "唯一元素当然也是多数元素。" },
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let candidate = 0,
		count = 0,
		num = null,
		i = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			candidate,
			count,
			num,
			i,
			pointers: { i },
			visualNote: "count 是抵消后的票数，不是 candidate 在数组里的总出现次数。",
			answer: candidate,
		});
	save("init", "candidate = 0，count = 0，尚无有效候选票数。");
	for (i = 0; i < nums.length; i++) {
		num = nums[i];
		save("item", `取出 ${num}。`);
		save("empty", `票数为 0 → ${count === 0}。`);
		if (count === 0) {
			candidate = num;
			save("choose", "用当前数字建立新的候选。");
		}
		save("compare", `num == candidate → ${num === candidate}。`);
		if (num === candidate) {
			count++;
			save("increment", "与候选相同，票数加 1。");
		} else {
			count--;
			save("decrement", "与候选不同，抵消一票。");
		}
	}
	i = nums.length - 1;
	save("result", `题目保证存在超过一半的元素，返回候选 ${candidate}。`);
	return steps;
}
const card = sequenceCard({
	title: "169. 多数元素",
	difficulty: "简单",
	description: "找出出现次数严格超过数组长度一半的元素。题目保证该元素存在。",
	idea: "不同数字两两抵消，多数元素最终不会被全部抵消。票数为 0 时重新选择候选。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["num", "当前数字"],
		["candidate", "当前候选"],
		["count", "抵消后票数"],
	],
});
export const template = card.template;
export const mount = card.mount;
