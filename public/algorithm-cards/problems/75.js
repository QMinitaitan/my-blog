import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./75-code.js";
export const examples = [
	{
		label: "三种颜色混合",
		nums: [2, 0, 2, 1, 1, 0],
		note: "2 换到右边后，i 不前进，必须检查换回来的值。",
	},
	{
		label: "已经排序",
		nums: [0, 0, 1, 2],
		note: "自交换也合法，边界仍然正常移动。",
	},
	{
		label: "全部是 2",
		nums: [2, 2, 2],
		note: "i 保持 0，只有 right 不断缩小。",
	},
	{ label: "单个 1", nums: [1], note: "走 else 分支，i 前进后结束。" },
];
export function buildTrace({ nums }) {
	const values = [...nums],
		{ steps, push } = recorder();
	let left = 0,
		i = 0,
		right = values.length - 1;
	const save = (line, text) =>
		push(line, text, {
			values,
			left,
			i,
			right,
			pointers: { left, i, right },
			visualNote: `0 区间 [0,${left})；1 区间 [${left},${i})；待处理 [${i},${right}]；2 区间 (${right},${values.length - 1}]。`,
			answer: line === "result" ? values : undefined,
		});
	save("init", "三个边界划分已经完成与尚未处理的部分。");
	while (true) {
		save("check", `i <= right → ${i <= right}。`);
		if (i > right) break;
		save("zero", `nums[i] == 0 → ${values[i] === 0}。`);
		if (values[i] === 0) {
			[values[left], values[i]] = [values[i], values[left]];
			save("zeroSwap", "把 0 放到左侧。");
			left++;
			save("left", "0 区间右边界前进。");
			i++;
			save("advance", "换回来的是已处理的 1 或自身，i 可以前进。");
		} else {
			save("two", `nums[i] == 2 → ${values[i] === 2}。`);
			if (values[i] === 2) {
				[values[i], values[right]] = [values[right], values[i]];
				save("twoSwap", "把 2 换到右侧。");
				right--;
				save("right", "缩小待处理区间，i 不动。");
			} else {
				i++;
				save("one", "当前值是 1，直接前进。");
			}
		}
	}
	save("result", "三个区域完成，原地排序结束。");
	return steps;
}
const card = sequenceCard({
	title: "75. 颜色分类",
	description:
		"数组只包含 0、1、2，把它们原地排序为所有 0、所有 1、所有 2。不能直接调用排序。",
	idea: "left 收集 0，right 收集 2，i 扫描待处理区间。换回未处理值时，不移动 i。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["left", "0 区间末端"],
		["i", "当前处理位置"],
		["right", "待处理右端"],
	],
});
export const template = card.template;
export const mount = card.mount;
