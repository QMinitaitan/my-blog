import { backtrackingCard } from "../shared/backtracking-card.js";
import { recorder } from "../shared/sequence-card.js";
import { codes } from "./39-code.js";
export const examples = [
	{
		label: "重复使用",
		candidates: [2, 3, 6, 7],
		target: 7,
		note: "2 可以重复选择，生成 [2,2,3]；7 自身也是答案。",
	},
	{
		label: "多种组合",
		candidates: [2, 3, 5],
		target: 8,
		note: "观察 [2,2,2,2]、[2,3,3] 和 [3,5]。",
	},
	{
		label: "无解",
		candidates: [2],
		target: 1,
		note: "候选大于剩余和，剪枝后返回空结果。",
	},
	{
		label: "未排序",
		candidates: [5, 2, 3],
		target: 7,
		note: "没有排序，所以过大候选用 continue，不能 break。",
	},
];
export function buildTrace({ candidates, target }) {
	const path = [],
		answer = [],
		calls = [],
		{ steps, push } = recorder();
	let start = null,
		remaining = null,
		i = null;
	const save = (line, text) =>
		push(line, text, { candidates, path, answer, calls, start, remaining, i });
	save("init", "候选均为互不相同的正整数，重复选择仍会减小 remaining。");
	save("start", `dfs(0,${target})。`);
	function dfs(begin, rest) {
		start = begin;
		remaining = rest;
		i = null;
		calls.push({ start: begin, remaining: rest });
		save("complete", `remaining == 0 → ${rest === 0}。`);
		if (rest === 0) {
			answer.push([...path]);
			save("collect", "已经凑满目标，保存路径副本。");
			save("done", "不再继续添加数字，返回。");
			calls.pop();
			return;
		}
		for (let index = begin; index < candidates.length; index++) {
			start = begin;
			remaining = rest;
			i = index;
			save("scan", `尝试候选 ${candidates[i]}。`);
			save("check", `候选大于 remaining → ${candidates[i] > rest}。`);
			if (candidates[i] > rest) {
				save("skip", "本分支会超出目标，跳过此候选。");
				continue;
			}
			path.push(candidates[i]);
			save("choose", "将当前候选加入路径。");
			save(
				"recurse",
				`传 i=${i}，允许重复使用；剩余和减为 ${rest - candidates[i]}。`,
			);
			dfs(i, rest - candidates[i]);
			start = begin;
			remaining = rest;
			i = index;
			path.pop();
			save("undo", "恢复父层路径，尝试其他候选。");
		}
		calls.pop();
	}
	dfs(0, target);
	start = null;
	remaining = null;
	i = null;
	save("result", "全部组合分支已结束。");
	steps.at(-1).final = true;
	return steps;
}
const card = backtrackingCard({
	title: "39. 组合总和",
	description:
		"正整数候选互不相同，每个数可无限次使用，找和等于 target 的全部不同组合。",
	idea: "dfs(start,remaining) 只向右选，避免交换顺序造成重复。选择下标 i 后仍传 i，允许重复；本题与子集传 i+1 的含义不同。",
	time: "O(n^(target/min+1)) 的宽松上界，实际取决于剪枝与结果",
	space: "O(target/min)，不计结果",
	codes,
	examples,
	buildTrace,
	variables: [
		["start", "候选起点"],
		["remaining", "还差的和"],
		["i", "本层候选"],
		["path", "当前组合"],
	],
});
export const template = card.template;
export const mount = card.mount;
