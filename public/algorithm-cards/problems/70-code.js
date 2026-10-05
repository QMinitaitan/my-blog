import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("climbStairs", [["n", "int"]], "int", {
	python: `dp = [0] * (n + 1) # @step init
dp[0] = dp[1] = 1 # @step base
for i in range(2, n + 1): # @step item
    # 最后一步来自 i - 1 或 i - 2，两类走法互不重叠。
    dp[i] = dp[i - 1] + dp[i - 2] # @step update
return dp[n] # @step result`,
	javascript: `// 按最后一步分类：从 i - 1 爬一级，或从 i - 2 爬两级，所以 dp[i] 是前两格之和。
const dp = Array(n + 1).fill(0); // @step init
dp[0] = dp[1] = 1; // @step base
for (let i = 2; i <= n; i++) { // @step item
    dp[i] = dp[i - 1] + dp[i - 2]; // @step update
}
return dp[n]; // @step result`,
	java: `// 按最后一步分类：从 i - 1 爬一级，或从 i - 2 爬两级，所以 dp[i] 是前两格之和。
int[] dp = new int[n + 1]; // @step init
dp[0] = dp[1] = 1; // @step base
for (int i = 2; i <= n; i++) { // @step item
    dp[i] = dp[i - 1] + dp[i - 2]; // @step update
}
return dp[n]; // @step result`,
	cpp: `// 按最后一步分类：从 i - 1 爬一级，或从 i - 2 爬两级，所以 dp[i] 是前两格之和。
vector<int> dp(n + 1, 0); // @step init
dp[0] = dp[1] = 1; // @step base
for (int i = 2; i <= n; i++) { // @step item
    dp[i] = dp[i - 1] + dp[i - 2]; // @step update
}
return dp[n]; // @step result`,
});
