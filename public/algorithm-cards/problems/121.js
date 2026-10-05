import { sequenceCard, recorder } from "../shared/sequence-card.js";
import { codes } from "./121-code.js";
export const examples = [
	{
		label: "先跌后涨",
		nums: [7, 1, 5, 3, 6, 4],
		note: "买在价格 1，卖在之后的价格 6。",
	},
	{
		label: "持续下跌",
		nums: [7, 6, 4, 3, 1],
		note: "没有正利润，选择不交易，返回 0。",
	},
	{ label: "单天", nums: [5], note: "买卖不能产生利润，返回 0。" },
	{
		label: "最低价出现在最后",
		nums: [3, 5, 1],
		note: "价格 1 不能回头匹配之前的卖价 5。",
	},
];
export function buildTrace({ nums }) {
	const { steps, push } = recorder();
	let lowest = nums[0],
		best = null,
		profit = null,
		i = null;
	const save = (line, text) =>
		push(line, text, {
			values: nums,
			lowest,
			best,
			profit,
			i,
			pointers: { i },
			answer: best,
		});
	save("init", "最低买价从第一天开始。");
	best = 0;
	save("bestInit", "初始化利润为 0，允许不交易。");
	for (i = 0; i < nums.length; i++) {
		save("item", `考察第 ${i} 天。`);
		profit = nums[i] - lowest;
		save("profit", `今天卖出：${nums[i]} - ${lowest} = ${profit}。`);
		best = Math.max(best, profit);
		save("best", "保存目前最高利润。");
		lowest = Math.min(lowest, nums[i]);
		save("lowest", "把今天的价格纳入最低买价，供以后使用。");
	}
	i = nums.length - 1;
	save("result", `返回最大利润 ${best}。`);
	return steps;
}
const card = sequenceCard({
	title: "121. 买卖股票的最佳时机",
	difficulty: "简单",
	description:
		"最多买入并卖出一次，买入在卖出之前，求最大利润；没有盈利机会返回 0。",
	idea: "扫描卖出日期，维护之前的最低买价，卖价减买价就是候选利润。",
	time: "O(n)",
	space: "O(1)",
	codes,
	examples,
	buildTrace,
	variables: [
		["i", "当前日期"],
		["lowest", "到目前为止最低价格"],
		["profit", "今天卖出的利润"],
		["best", "最大利润"],
	],
});
export const template = card.template;
export const mount = card.mount;
