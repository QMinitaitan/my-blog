import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("findMin", [["nums", "ints"]], "int", {
	python: `# 比较中点和右端，判断中点位于转折的哪一侧，每次保留仍可能包含最小值的半区。
left, right = 0, len(nums) - 1 # @step init
while left < right: # @step check
    mid = (left + right) // 2 # @step mid
    if nums[mid] > nums[right]: # @step compare
        left = mid + 1 # @step left
    else:
        right = mid # @step right
return nums[left] # @step result`,
	javascript: `// 比较中点和右端，判断中点位于转折的哪一侧，每次保留仍可能包含最小值的半区。
let left = 0, right = nums.length - 1; // @step init
while (left < right) { // @step check
    const mid = Math.floor((left + right) / 2); // @step mid
    if (nums[mid] > nums[right]) { // @step compare
        left = mid + 1; // @step left
    } else {
        right = mid; // @step right
    }
}
return nums[left]; // @step result`,
	java: `// 比较中点和右端，判断中点位于转折的哪一侧，每次保留仍可能包含最小值的半区。
int left = 0, right = nums.length - 1; // @step init
while (left < right) { // @step check
    int mid = left + (right - left) / 2; // @step mid
    if (nums[mid] > nums[right]) { // @step compare
        left = mid + 1; // @step left
    } else {
        right = mid; // @step right
    }
}
return nums[left]; // @step result`,
	cpp: `// 比较中点和右端，判断中点位于转折的哪一侧，每次保留仍可能包含最小值的半区。
int left = 0, right = (int)nums.size() - 1; // @step init
while (left < right) { // @step check
    int mid = left + (right - left) / 2; // @step mid
    if (nums[mid] > nums[right]) { // @step compare
        left = mid + 1; // @step left
    } else {
        right = mid; // @step right
    }
}
return nums[left]; // @step result`,
});
