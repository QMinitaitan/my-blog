import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./239-code.js";
export const examples = [
	{
		label: "经典窗口",
		nums: [1, 3, -1, -3, 5, 3, 6, 7],
		k: 3,
		note: "队列保存下标，队首就是当前窗口最大值的位置。",
	},
	{
		label: "递减导致过期",
		nums: [5, 4, 3, 2],
		k: 2,
		note: "没有队尾弹出，靠队首过期移除旧最大值。",
	},
	{
		label: "重复值",
		nums: [2, 2, 2],
		k: 2,
		note: "同值保留更新的下标，它在窗口中存活更久。",
	},
	{
		label: "单项窗口",
		nums: [-4],
		k: 1,
		note: "唯一元素就是唯一窗口的最大值。",
	},
];
export function buildTrace({ nums, k }) {
	const { steps, push } = recorder(),
		queue = [],
		answer = [];
	let head = 0,
		right = null,
		num = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			right,
			num,
			k,
			queue: queue.slice(head),
			answer,
			pointers: {
				right,
				left: right === null ? null : Math.max(0, right - k + 1),
				最大值: queue[head] ?? null,
			},
			window: right === null ? null : [Math.max(0, right - k + 1), right],
			visualNote: `队列从首到尾（下标→值）：${queue
				.slice(head)
				.slice(0, 16)
				.map((i) => `${i}→${nums[i]}`)
				.join("，")}${queue.length - head > 16 ? " …其余省略" : ""}`,
		});
	save("init", "创建空单调队列和答案。");
	for (right = 0; right < nums.length; right++) {
		num = nums[right];
		save("scan", `读取 nums[${right}]=${num}。`);
		save(
			"expired",
			`队首是否离开窗口 → ${head < queue.length && queue[head] <= right - k}。`,
		);
		if (head < queue.length && queue[head] <= right - k) {
			head++;
			save("remove", "移出过期队首。");
		}
		while (true) {
			const smaller = head < queue.length && nums[queue.at(-1)] <= num;
			save("smaller", `队尾是否不大于新值 → ${smaller}。`);
			if (!smaller) break;
			queue.pop();
			save("pop", "旧下标更早、值又不大，无法再成为最大值。");
		}
		queue.push(right);
		save("append", "新下标入队，队列值保持递减。");
		save("ready", `窗口达到 k 项 → ${right >= k - 1}。`);
		if (right >= k - 1) {
			answer.push(nums[queue[head]]);
			save("collect", "记录队首对应的最大值。");
		}
	}
	right = nums.length - 1;
	save("result", "返回每个完整窗口的最大值。");
	return steps;
}
const card = sequenceCard({
	title: "239. 滑动窗口最大值",
	description:
		"长度为 k 的窗口从左向右移动，每次返回窗口里最大的数。返回最大值列表，保留每个窗口的顺序。",
	idea: "用递减队列保存候选下标。例如 5 进入时，旧的 3 和 -1 都更小且更早，可以丢掉。先移出过期队首，再清理队尾；每个下标最多入队和出队一次。",
	time: "O(n)",
	space: "Python/Java/C++ O(k)；JavaScript 用 head 的数组为 O(n)，不计答案",
	codes,
	examples,
	buildTrace,
	variables: [
		["right", "窗口右端"],
		["num", "新进入值"],
		["queue", "候选下标（首→尾）"],
		["k", "窗口长度"],
		["answer", "窗口最大值"],
	],
});
export const template = card.template;
export const mount = card.mount;
