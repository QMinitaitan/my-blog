import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"majorityElement",
	[["nums", "ints"]],
	"int",
	{
		python: `# 不同数字两两抵消，多数元素最终不会被全部抵消。票数为 0 时重新选择候选。
candidate, count = 0, 0 # @step init
for num in nums: # @step item
    if count == 0: # @step empty
        candidate = num # @step choose
    if num == candidate: # @step compare
        count += 1 # @step increment
    else:
        count -= 1 # @step decrement
return candidate # @step result`,
		javascript: `// 不同数字两两抵消，多数元素最终不会被全部抵消。票数为 0 时重新选择候选。
let candidate = 0, count = 0; // @step init
for (const num of nums) { // @step item
    if (count === 0) { // @step empty
        candidate = num; // @step choose
    }
    if (num === candidate) { // @step compare
        count++; // @step increment
    } else {
        count--; // @step decrement
    }
}
return candidate; // @step result`,
		java: `// 不同数字两两抵消，多数元素最终不会被全部抵消。票数为 0 时重新选择候选。
int candidate = 0, count = 0; // @step init
for (int num : nums) { // @step item
    if (count == 0) { // @step empty
        candidate = num; // @step choose
    }
    if (num == candidate) { // @step compare
        count++; // @step increment
    } else {
        count--; // @step decrement
    }
}
return candidate; // @step result`,
		cpp: `// 不同数字两两抵消，多数元素最终不会被全部抵消。票数为 0 时重新选择候选。
int candidate = 0, count = 0; // @step init
for (int num : nums) { // @step item
    if (count == 0) { // @step empty
        candidate = num; // @step choose
    }
    if (num == candidate) { // @step compare
        count++; // @step increment
    } else {
        count--; // @step decrement
    }
}
return candidate; // @step result`,
	},
);
