import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./55-code.js";
export const examples = [
	{ label: "可达", nums: [2, 3, 1, 1, 4], note: "覆盖范围从 2 扩大到 4。" },
	{
		label: "被零挡住",
		nums: [3, 2, 1, 0, 4],
		note: "下标 4 超出了最远范围，无法继续。",
	},
	{ label: "已经在终点", nums: [0], note: "单元素数组不用跳跃。" },
	{
		label: "跳过多个零",
		nums: [4, 0, 0, 0, 1],
		note: "中间的零不会阻挡从起点跨过去。",
	},
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let farthest = 0,
		i = null;
	const save = (line, text, answer) =>
		push(line, text, {
			values: nums,
			farthest,
			i,
			pointers: { i, farthest },
			visualNote: `可到达区间：[0, ${Math.min(nums.length - 1, farthest)}]`,
			answer,
		});
	save("init", "起点下标 0 可达。");
	for (i = 0; i < nums.length; i++) {
		save("item", `检查下标 ${i}。`);
		save("blocked", `i > farthest → ${i > farthest}。`);
		if (i > farthest) {
			save("fail", "当前位置不可达，返回 false。", false);
			steps.at(-1).final = true;
			return steps;
		}
		farthest = Math.max(farthest, i + nums[i]);
		save("extend", "用当前位置能跳到的最远位置扩展覆盖范围。");
	}
	i = nums.length - 1;
	save("result", "每个位置都可达，返回 true。", true);
	return steps;
}
const card = sequenceCard({
	title: "55. 跳跃游戏",
	description:
		"每个元素表示最多能向右跳几步，判断能否从下标 0 到达最后一个位置。",
	idea: "维护所有已到达位置能覆盖的最远下标；遇到覆盖范围以外的位置就失败。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前位置"],
		["farthest", "最远可达下标"],
	],
});
export const template = card.template;
export const mount = card.mount;
