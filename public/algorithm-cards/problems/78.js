import { backtrackingCard } from "../shared/backtracking-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./78-code.js";
export const examples = [
	{
		label: "三个数字",
		nums: [1, 2, 3],
		note: "空集也保存；选择 1 后只允许继续选右边的 2、3。",
	},
	{ label: "单数字", nums: [0], note: "结果包含 [] 和 [0]。" },
	{ label: "两个数字", nums: [2, 4], note: "[2,4] 只生成一次，不生成 [4,2]。" },
	{
		label: "负数与零",
		nums: [-1, 0],
		note: "数值可以为负，start 规则依然按下标前进。",
	},
];
export function buildTrace({ nums }) {
	const path = [],
		answer = [],
		calls = [],
		{ steps, push } = recorder();
	let start = null,
		i = null;
	const save = (line, text) =>
		push(line, text, { candidates: nums, path, answer, calls, start, i });
	save("init", "初始化空路径和结果列表。");
	save("start", "dfs(0)，候选从下标 0 开始。");
	function dfs(begin) {
		start = begin;
		i = null;
		calls.push(begin);
		answer.push([...path]);
		save("collect", "每条路径本身都是子集，保存副本。");
		for (let index = begin; index < nums.length; index++) {
			start = begin;
			i = index;
			save("scan", `从 start=${start} 开始，尝试下标 ${i}。`);
			path.push(nums[i]);
			save("choose", "将本次数字加入 path。");
			save("recurse", `dfs(${i + 1})：下一层只考虑右边元素，避免重复。`);
			dfs(i + 1);
			start = begin;
			i = index;
			path.pop();
			save("undo", "递归返回，撤销本次选择，尝试下一个候选。");
		}
		calls.pop();
	}
	dfs(0);
	start = null;
	i = null;
	save("result", "所有子集已生成。");
	steps.at(-1).final = true;
	return steps;
}
const card = backtrackingCard({
	title: "78. 子集",
	description: "给定互不相同的整数，返回全部子集，包含空集，不能有重复子集。",
	idea: "dfs(start) 先保存当前 path，再逐一选 start 右侧的数字。下一层传 i+1，使每个子集的下标始终递增。",
	time: "O(n·2ⁿ)",
	space: "O(n)，不计结果",
	codes,
	examples,
	buildTrace,
	variables: [
		["start", "本层候选起点"],
		["i", "正在尝试的下标"],
		["path", "当前子集"],
	],
});
export const template = card.template;
export const mount = card.mount;
