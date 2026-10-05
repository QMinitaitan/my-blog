import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("canPartition", [["nums", "ints"]], "bool", {
	python: `total = sum(nums) # @step sum
if total % 2: # @step odd
    return False # @step fail
target = total // 2 # @step target
dp = [False] * (target + 1) # @step init
dp[0] = True # @step base
for num in nums: # @step item
    # 倒序更新，确保每个数最多使用一次。
    for j in range(target, num - 1, -1): # @step capacity
        dp[j] = dp[j] or dp[j - num] # @step update
return dp[target] # @step result`,
	javascript: `const total = nums.reduce((sum, num) => sum + num, 0); // @step sum
if (total % 2) { // @step odd
    return false; // @step fail
}
const target = total / 2; // @step target
const dp = Array(target + 1).fill(false); // @step init
dp[0] = true; // @step base
for (const num of nums) { // @step item
    // 倒序更新，不能在同一轮重复使用 num。
    for (let j = target; j >= num; j--) { // @step capacity
        dp[j] = dp[j] || dp[j - num]; // @step update
    }
}
return dp[target]; // @step result`,
	java: `// 先把问题转为选出总和一半的子集。dp[j] 记录能否凑出 j，倒序更新防止同一个数被重复使用。
int total = Arrays.stream(nums).sum(); // @step sum
if (total % 2 != 0) { // @step odd
    return false; // @step fail
}
int target = total / 2; // @step target
boolean[] dp = new boolean[target + 1]; // @step init
dp[0] = true; // @step base
for (int num : nums) { // @step item
    for (int j = target; j >= num; j--) { // @step capacity
        dp[j] = dp[j] || dp[j - num]; // @step update
    }
}
return dp[target]; // @step result`,
	cpp: `// 先把问题转为选出总和一半的子集。dp[j] 记录能否凑出 j，倒序更新防止同一个数被重复使用。
int total = accumulate(nums.begin(), nums.end(), 0); // @step sum
if (total % 2 != 0) { // @step odd
    return false; // @step fail
}
int target = total / 2; // @step target
vector<bool> dp(target + 1, false); // @step init
dp[0] = true; // @step base
for (int num : nums) { // @step item
    for (int j = target; j >= num; j--) { // @step capacity
        dp[j] = dp[j] || dp[j - num]; // @step update
    }
}
return dp[target]; // @step result`,
});
