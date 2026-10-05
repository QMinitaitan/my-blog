import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"coinChange",
	[
		["coins", "ints"],
		["amount", "int"],
	],
	"int",
	{
		python: `# 按金额从小到大计算，枚举最后一枚硬币 coin，把 dp[total-coin]+1 作为候选。
dp = [0] + [amount + 1] * amount # @step init
for total in range(1, amount + 1): # @step total
    for coin in coins: # @step coin
        if coin <= total: # @step check
            dp[total] = min(dp[total], dp[total - coin] + 1) # @step update
if dp[amount] > amount: # @step reachable
    return -1 # @step fail
return dp[amount] # @step result`,
		javascript: `// 按金额从小到大计算，枚举最后一枚硬币 coin，把 dp[total-coin]+1 作为候选。
const dp = [0, ...Array(amount).fill(amount + 1)]; // @step init
for (let total = 1; total <= amount; total++) { // @step total
    for (const coin of coins) { // @step coin
        if (coin <= total) { // @step check
            dp[total] = Math.min(dp[total], dp[total - coin] + 1); // @step update
        }
    }
}
if (dp[amount] > amount) { // @step reachable
    return -1; // @step fail
}
return dp[amount]; // @step result`,
		java: `// 按金额从小到大计算，枚举最后一枚硬币 coin，把 dp[total-coin]+1 作为候选。
int[] dp = new int[amount + 1];
Arrays.fill(dp, amount + 1); dp[0] = 0; // @step init
for (int total = 1; total <= amount; total++) { // @step total
    for (int coin : coins) { // @step coin
        if (coin <= total) { // @step check
            dp[total] = Math.min(dp[total], dp[total - coin] + 1); // @step update
        }
    }
}
if (dp[amount] > amount) { // @step reachable
    return -1; // @step fail
}
return dp[amount]; // @step result`,
		cpp: `// 按金额从小到大计算，枚举最后一枚硬币 coin，把 dp[total-coin]+1 作为候选。
vector<int> dp(amount + 1, amount + 1); dp[0] = 0; // @step init
for (int total = 1; total <= amount; total++) { // @step total
    for (int coin : coins) { // @step coin
        if (coin <= total) { // @step check
            dp[total] = min(dp[total], dp[total - coin] + 1); // @step update
        }
    }
}
if (dp[amount] > amount) { // @step reachable
    return -1; // @step fail
}
return dp[amount]; // @step result`,
	},
);
