import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("maxProfit", [["prices", "ints"]], "int", {
	python: `lowest = prices[0] # @step init
best = 0 # @step bestInit
for i in range(len(prices)): # @step item
    profit = prices[i] - lowest # @step profit
    best = max(best, profit) # @step best
    # 最低买价只能来自今天或之前。
    lowest = min(lowest, prices[i]) # @step lowest
return best # @step result`,
	javascript: `// 扫描卖出日期，维护之前的最低买价，卖价减买价就是候选利润。
let lowest = prices[0]; // @step init
let best = 0; // @step bestInit
for (let i = 0; i < prices.length; i++) { // @step item
    const profit = prices[i] - lowest; // @step profit
    best = Math.max(best, profit); // @step best
    lowest = Math.min(lowest, prices[i]); // @step lowest
}
return best; // @step result`,
	java: `// 扫描卖出日期，维护之前的最低买价，卖价减买价就是候选利润。
int lowest = prices[0]; // @step init
int best = 0; // @step bestInit
for (int i = 0; i < prices.length; i++) { // @step item
    int profit = prices[i] - lowest; // @step profit
    best = Math.max(best, profit); // @step best
    lowest = Math.min(lowest, prices[i]); // @step lowest
}
return best; // @step result`,
	cpp: `// 扫描卖出日期，维护之前的最低买价，卖价减买价就是候选利润。
int lowest = prices[0]; // @step init
int best = 0; // @step bestInit
for (int i = 0; i < (int)prices.size(); i++) { // @step item
    int profit = prices[i] - lowest; // @step profit
    best = max(best, profit); // @step best
    lowest = min(lowest, prices[i]); // @step lowest
}
return best; // @step result`,
});
