import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"searchInsert",
	[
		["nums", "ints"],
		["target", "int"],
	],
	"int",
	{
		python: `# 用半开区间寻找第一个不小于 target 的元素，循环结束时 left 就是插入位置。
left, right = 0, len(nums) # @step init
while left < right: # @step check
    mid = (left + right) // 2 # @step mid
    if nums[mid] < target: # @step compare
        left = mid + 1 # @step left
    else:
        right = mid # @step right
return left # @step result`,
		javascript: `// 用半开区间寻找第一个不小于 target 的元素，循环结束时 left 就是插入位置。
let left = 0, right = nums.length; // @step init
while (left < right) { // @step check
    const mid = Math.floor((left + right) / 2); // @step mid
    if (nums[mid] < target) { // @step compare
        left = mid + 1; // @step left
    } else {
        right = mid; // @step right
    }
}
return left; // @step result`,
		java: `// 用半开区间寻找第一个不小于 target 的元素，循环结束时 left 就是插入位置。
int left = 0, right = nums.length; // @step init
while (left < right) { // @step check
    int mid = left + (right - left) / 2; // @step mid
    if (nums[mid] < target) { // @step compare
        left = mid + 1; // @step left
    } else {
        right = mid; // @step right
    }
}
return left; // @step result`,
		cpp: `// 用半开区间寻找第一个不小于 target 的元素，循环结束时 left 就是插入位置。
int left = 0, right = (int)nums.size(); // @step init
while (left < right) { // @step check
    int mid = left + (right - left) / 2; // @step mid
    if (nums[mid] < target) { // @step compare
        left = mid + 1; // @step left
    } else {
        right = mid; // @step right
    }
}
return left; // @step result`,
	},
);
