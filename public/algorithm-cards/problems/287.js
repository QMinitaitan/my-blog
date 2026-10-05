import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./287-code.js";
export const examples = [
	{
		label: "重复二",
		nums: [1, 3, 4, 2, 2],
		note: "按下标→nums[下标] 跳转形成环，环入口为 2。",
	},
	{
		label: "重复三",
		nums: [3, 1, 3, 4, 2],
		note: "从 0 出发最终进入重复值 3 对应的环。",
	},
	{ label: "最小输入", nums: [1, 1], note: "0→1→1，重复值为 1。" },
	{
		label: "多次重复",
		nums: [2, 2, 2, 2, 2],
		note: "仍只有一种重复整数 2，符合原题约束。",
	},
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let slow = 0,
		fast = 0,
		finder = null,
		answer = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			slow,
			fast,
			finder,
			answer,
			pointers: { slow, fast, finder },
			visualNote:
				nums.length <= 16
					? nums.map((value, index) => `${index} → ${value}`).join("；")
					: "以 nums[index] 为下一下标，省略非当前相关位置。",
		});
	save("init", "把下标 0 当作链的起点，下一位置由 nums 决定。");
	while (true) {
		save("loop", "第一阶段不断跳转，直到移动后的指针相遇。");
		slow = nums[slow];
		save("slow", "slow 跳转一次。");
		fast = nums[nums[fast]];
		save("fast", "fast 连续跳转两次。");
		save("match", `slow == fast → ${slow === fast}。`);
		if (slow === fast) {
			save("stop", "已经找到环内相遇位置。");
			break;
		}
	}
	finder = 0;
	save("finder", "finder 回到起点 0。");
	while (true) {
		save("search", `finder != slow → ${finder !== slow}。`);
		if (finder === slow) break;
		finder = nums[finder];
		save("findMove", "finder 跳转一次。");
		slow = nums[slow];
		save("slowMove", "slow 同速跳转一次。");
	}
	answer = finder;
	save("result", "两者在环入口相遇；入口对应重复整数。");
	return steps;
}
const card = sequenceCard({
	title: "287. 寻找重复数",
	description:
		"长度 n+1 的数组只含 1～n，且只有一种重复整数；不能修改数组，用常数额外空间找它。",
	idea: "把 nums[i] 当作从下标 i 指向的下一位置。多个下标指向同一数字会形成可达环，重复值就是入口；套用快慢指针找入口。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["slow", "慢跳转位置"],
		["fast", "快跳转位置"],
		["finder", "从起点寻找入口"],
	],
});
export const template = card.template;
export const mount = card.mount;
