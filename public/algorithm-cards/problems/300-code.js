import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("lengthOfLIS", [["nums", "ints"]], "int", {
	python: `# dp[i] 是以 nums[i] 结尾的最长长度。遍历前面的 j，只有 nums[j] < nums[i] 才能接上。
dp = [1] * len(nums) # @step init
for i in range(len(nums)): # @step item
    for j in range(i): # @step previous
        if nums[j] < nums[i]: # @step compare
            dp[i] = max(dp[i], dp[j] + 1) # @step update
return max(dp) # @step result`,
	javascript: `// dp[i] 是以 nums[i] 结尾的最长长度。遍历前面的 j，只有 nums[j] < nums[i] 才能接上。
const dp = Array(nums.length).fill(1); // @step init
for (let i = 0; i < nums.length; i++) { // @step item
    for (let j = 0; j < i; j++) { // @step previous
        if (nums[j] < nums[i]) { // @step compare
            dp[i] = Math.max(dp[i], dp[j] + 1); // @step update
        }
    }
}
return Math.max(...dp); // @step result`,
	java: `// dp[i] 是以 nums[i] 结尾的最长长度。遍历前面的 j，只有 nums[j] < nums[i] 才能接上。
int[] dp = new int[nums.length];
Arrays.fill(dp, 1); // @step init
for (int i = 0; i < nums.length; i++) { // @step item
    for (int j = 0; j < i; j++) { // @step previous
        if (nums[j] < nums[i]) { // @step compare
            dp[i] = Math.max(dp[i], dp[j] + 1); // @step update
        }
    }
}
return Arrays.stream(dp).max().getAsInt(); // @step result`,
	cpp: `// dp[i] 是以 nums[i] 结尾的最长长度。遍历前面的 j，只有 nums[j] < nums[i] 才能接上。
vector<int> dp(nums.size(), 1); // @step init
for (int i = 0; i < (int)nums.size(); i++) { // @step item
    for (int j = 0; j < i; j++) { // @step previous
        if (nums[j] < nums[i]) { // @step compare
            dp[i] = max(dp[i], dp[j] + 1); // @step update
        }
    }
}
return *max_element(dp.begin(), dp.end()); // @step result`,
});
