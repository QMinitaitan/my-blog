import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("rob", [["nums", "ints"]], "int", {
	python: `dp = [0] * (len(nums) + 1) # @step init
dp[1] = nums[0] # @step base
for i in range(2, len(nums) + 1): # @step item
    # 偷当前房屋，就必须跳过前一间。
    dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]) # @step update
return dp[-1] # @step result`,
	javascript: `// 每间房屋有偷和不偷两种选择。偷当前房屋加 dp[i-2]，不偷则沿用 dp[i-1]。
const dp = Array(nums.length + 1).fill(0); // @step init
dp[1] = nums[0]; // @step base
for (let i = 2; i <= nums.length; i++) { // @step item
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]); // @step update
}
return dp[nums.length]; // @step result`,
	java: `// 每间房屋有偷和不偷两种选择。偷当前房屋加 dp[i-2]，不偷则沿用 dp[i-1]。
int[] dp = new int[nums.length + 1]; // @step init
dp[1] = nums[0]; // @step base
for (int i = 2; i <= nums.length; i++) { // @step item
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]); // @step update
}
return dp[nums.length]; // @step result`,
	cpp: `// 每间房屋有偷和不偷两种选择。偷当前房屋加 dp[i-2]，不偷则沿用 dp[i-1]。
vector<int> dp(nums.size() + 1, 0); // @step init
dp[1] = nums[0]; // @step base
for (int i = 2; i <= (int)nums.size(); i++) { // @step item
    dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1]); // @step update
}
return dp.back(); // @step result`,
});
