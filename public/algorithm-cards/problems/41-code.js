import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"firstMissingPositive",
	[["nums", "ints"]],
	"int",
	{
		python: `n = len(nums) # @step init
for i in range(n): # @step item
    # 值 x 属于位置 x - 1；重复值已经就位时必须停止交换。
    while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]: # @step check
        target = nums[i] - 1 # @step target
        nums[i], nums[target] = nums[target], nums[i] # @step swap
for i in range(n): # @step scan
    if nums[i] != i + 1: # @step missing
        return i + 1 # @step found
return n + 1 # @step result`,
		javascript: `// 原地把值 x 放到下标 x - 1；忽略范围外的值，跳过已经就位的重复值。再从左找第一个不匹配位置。
const n = nums.length; // @step init
for (let i = 0; i < n; i++) { // @step item
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) { // @step check
        const target = nums[i] - 1; // @step target
        [nums[i], nums[target]] = [nums[target], nums[i]]; // @step swap
    }
}
for (let i = 0; i < n; i++) { // @step scan
    if (nums[i] !== i + 1) { // @step missing
        return i + 1; // @step found
    }
}
return n + 1; // @step result`,
		java: `// 原地把值 x 放到下标 x - 1；忽略范围外的值，跳过已经就位的重复值。再从左找第一个不匹配位置。
int n = nums.length; // @step init
for (int i = 0; i < n; i++) { // @step item
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) { // @step check
        int target = nums[i] - 1; // @step target
        int value = nums[i];
        nums[i] = nums[target];
        nums[target] = value; // @step swap
    }
}
for (int i = 0; i < n; i++) { // @step scan
    if (nums[i] != i + 1) { // @step missing
        return i + 1; // @step found
    }
}
return n + 1; // @step result`,
		cpp: `// 原地把值 x 放到下标 x - 1；忽略范围外的值，跳过已经就位的重复值。再从左找第一个不匹配位置。
int n = (int)nums.size(); // @step init
for (int i = 0; i < n; i++) { // @step item
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) { // @step check
        int target = nums[i] - 1; // @step target
        swap(nums[i], nums[target]); // @step swap
    }
}
for (int i = 0; i < n; i++) { // @step scan
    if (nums[i] != i + 1) { // @step missing
        return i + 1; // @step found
    }
}
return n + 1; // @step result`,
	},
);
