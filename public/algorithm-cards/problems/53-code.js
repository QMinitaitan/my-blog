import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("maxSubArray", [["nums", "ints"]], "int", {
	python: `current = nums[0] # @step init
best = current # @step bestInit
for i in range(1, len(nums)): # @step item
    # 接上负的前缀会更差，所以可以从当前元素重新开始。
    current = max(nums[i], current + nums[i]) # @step current
    best = max(best, current) # @step best
return best # @step result`,
	javascript: `// current 表示必须以当前位置结尾的最大和；比较重新开始和接上前缀这两种选择。
let current = nums[0]; // @step init
let best = current; // @step bestInit
for (let i = 1; i < nums.length; i++) { // @step item
    current = Math.max(nums[i], current + nums[i]); // @step current
    best = Math.max(best, current); // @step best
}
return best; // @step result`,
	java: `// current 表示必须以当前位置结尾的最大和；比较重新开始和接上前缀这两种选择。
int current = nums[0]; // @step init
int best = current; // @step bestInit
for (int i = 1; i < nums.length; i++) { // @step item
    current = Math.max(nums[i], current + nums[i]); // @step current
    best = Math.max(best, current); // @step best
}
return best; // @step result`,
	cpp: `// current 表示必须以当前位置结尾的最大和；比较重新开始和接上前缀这两种选择。
int current = nums[0]; // @step init
int best = current; // @step bestInit
for (int i = 1; i < (int)nums.size(); i++) { // @step item
    current = max(nums[i], current + nums[i]); // @step current
    best = max(best, current); // @step best
}
return best; // @step result`,
});
