import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./15-code.js";
export const examples = [
	{
		label: "多个解与重复值",
		nums: [-1, 0, 1, 2, -1, -4],
		note: "固定 i，再移动左右指针；重复的 -1 不重复当起点。",
	},
	{ label: "全零", nums: [0, 0, 0, 0], note: "只有 [0,0,0]，观察指针去重。" },
	{
		label: "没有答案",
		nums: [1, 2, 3],
		note: "所有和为正，right 不断向左移动。",
	},
	{
		label: "重复指针值",
		nums: [-2, 0, 0, 2, 2],
		note: "找到一组后跳过重复的 0 和 2。",
	},
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder(),
		values = [...nums].sort((a, b) => a - b);
	let answer = null,
		i = null,
		left = null,
		right = null,
		total = null;
	const save = (line, text) =>
		push(line, text, {
			values,
			answer,
			i,
			left,
			right,
			total,
			pointers: { i, left, right },
			visualNote: `已找到：${JSON.stringify(answer)}`,
		});
	save("sort", "先排序，让增大左值或减小右值能够有方向地改变总和。");
	answer = [];
	save("init", "初始化答案列表。");
	for (i = 0; i < values.length - 2; i++) {
		save("anchor", `固定 i = ${i}。`);
		const duplicate = i > 0 && values[i] === values[i - 1];
		save("duplicate", `起点与上个起点重复 → ${duplicate}。`);
		if (duplicate) {
			save("skip", "跳过重复起点。");
			continue;
		}
		left = i + 1;
		right = values.length - 1;
		save("pointers", "左右指针从剩余区间的两端开始。");
		while (true) {
			save("check", `判断 left < right → ${left < right}。`);
			if (left >= right) break;
			total = values[i] + values[left] + values[right];
			save(
				"sum",
				`计算 ${values[i]} + ${values[left]} + ${values[right]} = ${total}。`,
			);
			save("zero", `总和为 0 → ${total === 0}。`);
			if (total === 0) {
				answer.push([values[i], values[left], values[right]]);
				save("append", "保存这一组，三个位置互不相同。");
				left++;
				save("left", "左指针前进。");
				right--;
				save("right", "右指针后退。");
				while (true) {
					const repeated = left < right && values[left] === values[left - 1];
					save("leftCheck", `左边重复值判断 → ${repeated}。`);
					if (!repeated) break;
					left++;
					save("leftSkip", "跳过左边重复值。");
				}
				while (true) {
					const repeated = left < right && values[right] === values[right + 1];
					save("rightCheck", `右边重复值判断 → ${repeated}。`);
					if (!repeated) break;
					right--;
					save("rightSkip", "跳过右边重复值。");
				}
			} else {
				save("negative", `总和小于 0 → ${total < 0}。`);
				if (total < 0) {
					left++;
					save("small", "总和偏小，向右移动 left。");
				} else {
					right--;
					save("large", "总和偏大，向左移动 right。");
				}
			}
		}
	}
	i = values.length >= 3 ? values.length - 3 : null;
	save("result", `返回 ${JSON.stringify(answer)}，没有解时返回空列表。`);
	return steps;
}
const card = sequenceCard({
	title: "15. 三数之和",
	description: "返回数组中所有和为 0 的不重复三元组，三个数来自不同位置。",
	idea: "排序后固定一个数，再用双指针寻找另外两个数；对起点和指针值分别去重。",
	time: "O(n²)",
	space: "O(n)，不含输出",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "固定位置"],
		["left", "左指针"],
		["right", "右指针"],
		["total", "当前总和"],
		["answer", "已找到的三元组"],
	],
});
export const template = card.template;
export const mount = card.mount;
