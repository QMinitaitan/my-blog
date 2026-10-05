import { backtrackingCard } from "../shared/backtracking-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./46-code.js";
export const examples = [
	{
		label: "三个数字",
		nums: [1, 2, 3],
		note: "观察 [1,2,3] 保存后，撤销 3、2，再选择 3。",
	},
	{ label: "两个数字", nums: [0, 1], note: "交换选择顺序得到两种排列。" },
	{ label: "单数字", nums: [5], note: "选择一次就达到终点。" },
	{ label: "负数", nums: [-1, 2], note: "元素互不相同即可，排列与大小无关。" },
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder(),
		path = [],
		used = Array(nums.length).fill(false),
		answer = [],
		calls = [];
	let i = null;
	const save = (line, text) =>
		push(line, text, { candidates: nums, path, used, answer, calls, i });
	save("init", "path 为空，每个位置尚未使用。");
	save("start", "开始第一层递归。");
	function dfs() {
		calls.push(`长度 ${path.length}`);
		i = null;
		save("complete", `path 长度等于 n → ${path.length === nums.length}。`);
		if (path.length === nums.length) {
			answer.push([...path]);
			save("collect", "保存 path 的副本，后续撤销不会修改答案。");
			save("done", "本次调用返回。");
			calls.pop();
			return;
		}
		for (let index = 0; index < nums.length; index++) {
			i = index;
			save("scan", `尝试候选 ${nums[i]}。`);
			save("check", `used[${i}] → ${used[i]}。`);
			if (used[i]) {
				save("skip", "当前路径已经使用，跳过。");
				continue;
			}
			used[i] = true;
			save("mark", "标记当前位置已使用。");
			path.push(nums[i]);
			save("choose", "候选加入 path。");
			save("recurse", "进入下一层，填写下一位置。");
			dfs();
			i = index;
			path.pop();
			save("undo", "递归返回，撤销最后一次选择。");
			used[i] = false;
			save("unmark", "恢复未使用，供本层其他分支使用。");
		}
		calls.pop();
	}
	dfs();
	i = null;
	save("result", "全部选择分支已遍历完。");
	steps.at(-1).final = true;
	return steps;
}
const card = backtrackingCard({
	title: "46. 全排列",
	description: "给定互不相同的整数数组，返回所有可能的排列。",
	idea: "每一层选一个尚未使用的数字。到长度 n 时保存 path[:]；返回时先 pop，再取消 used 标记，恢复进入该分支前的状态。",
	time: "O(n·n!)",
	space: "O(n)，不计结果",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "本层候选下标"],
		["path", "当前排列"],
		["used", "是否已使用"],
	],
});
export const template = card.template;
export const mount = card.mount;
