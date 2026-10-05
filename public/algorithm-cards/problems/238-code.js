import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"productExceptSelf",
	[["nums", "ints"]],
	"ints",
	{
		python: `# 答案等于左边所有元素的乘积乘以右边所有元素的乘积，用前后两遍扫描实现。
answer = [1] * len(nums) # @step init
prefix = 1 # @step prefixInit
for i in range(len(nums)): # @step forward
    answer[i] = prefix # @step prefixWrite
    prefix *= nums[i] # @step prefix
suffix = 1 # @step suffixInit
for i in range(len(nums) - 1, -1, -1): # @step backward
    answer[i] *= suffix # @step suffixWrite
    suffix *= nums[i] # @step suffix
return answer # @step result`,
		javascript: `// 答案等于左边所有元素的乘积乘以右边所有元素的乘积，用前后两遍扫描实现。
const answer = Array(nums.length).fill(1); // @step init
let prefix = 1; // @step prefixInit
for (let i = 0; i < nums.length; i++) { // @step forward
    answer[i] = prefix; // @step prefixWrite
    prefix *= nums[i]; // @step prefix
}
let suffix = 1; // @step suffixInit
for (let i = nums.length - 1; i >= 0; i--) { // @step backward
    answer[i] *= suffix; // @step suffixWrite
    suffix *= nums[i]; // @step suffix
}
return answer; // @step result`,
		java: `// 答案等于左边所有元素的乘积乘以右边所有元素的乘积，用前后两遍扫描实现。
int[] answer = new int[nums.length];
Arrays.fill(answer, 1); // @step init
int prefix = 1; // @step prefixInit
for (int i = 0; i < nums.length; i++) { // @step forward
    answer[i] = prefix; // @step prefixWrite
    prefix *= nums[i]; // @step prefix
}
int suffix = 1; // @step suffixInit
for (int i = nums.length - 1; i >= 0; i--) { // @step backward
    answer[i] *= suffix; // @step suffixWrite
    suffix *= nums[i]; // @step suffix
}
return answer; // @step result`,
		cpp: `// 答案等于左边所有元素的乘积乘以右边所有元素的乘积，用前后两遍扫描实现。
vector<int> answer(nums.size(), 1); // @step init
int prefix = 1; // @step prefixInit
for (int i = 0; i < (int)nums.size(); i++) { // @step forward
    answer[i] = prefix; // @step prefixWrite
    prefix *= nums[i]; // @step prefix
}
int suffix = 1; // @step suffixInit
for (int i = (int)nums.size() - 1; i >= 0; i--) { // @step backward
    answer[i] *= suffix; // @step suffixWrite
    suffix *= nums[i]; // @step suffix
}
return answer; // @step result`,
	},
);
