import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("sortColors", [["nums", "ints"]], "void", {
	python: `left, i, right = 0, 0, len(nums) - 1 # @step init
while i <= right: # @step check
    if nums[i] == 0: # @step zero
        nums[left], nums[i] = nums[i], nums[left] # @step zeroSwap
        left += 1 # @step left
        i += 1 # @step advance
    elif nums[i] == 2: # @step two
        nums[i], nums[right] = nums[right], nums[i] # @step twoSwap
        right -= 1 # @step right
        # 换回来的数字尚未检查，i 保持原位。
    else:
        i += 1 # @step one
return None # @step result`,
	javascript: `let left = 0, i = 0, right = nums.length - 1; // @step init
while (i <= right) { // @step check
    if (nums[i] === 0) { // @step zero
        [nums[left], nums[i]] = [nums[i], nums[left]]; // @step zeroSwap
        left++; // @step left
        i++; // @step advance
    } else if (nums[i] === 2) { // @step two
        [nums[i], nums[right]] = [nums[right], nums[i]]; // @step twoSwap
        right--; // @step right
        // 保留 i，下一轮检查从右边换来的元素。
    } else {
        i++; // @step one
    }
}
return; // @step result`,
	java: `// left 收集 0，right 收集 2，i 扫描待处理区间。换回未处理值时，不移动 i。
int left = 0, i = 0, right = nums.length - 1; // @step init
while (i <= right) { // @step check
    if (nums[i] == 0) { // @step zero
        int value = nums[left]; nums[left] = nums[i]; nums[i] = value; // @step zeroSwap
        left++; // @step left
        i++; // @step advance
    } else if (nums[i] == 2) { // @step two
        int value = nums[right]; nums[right] = nums[i]; nums[i] = value; // @step twoSwap
        right--; // @step right
    } else {
        i++; // @step one
    }
}
return; // @step result`,
	cpp: `// left 收集 0，right 收集 2，i 扫描待处理区间。换回未处理值时，不移动 i。
int left = 0, i = 0, right = (int)nums.size() - 1; // @step init
while (i <= right) { // @step check
    if (nums[i] == 0) { // @step zero
        swap(nums[left], nums[i]); // @step zeroSwap
        left++; // @step left
        i++; // @step advance
    } else if (nums[i] == 2) { // @step two
        swap(nums[i], nums[right]); // @step twoSwap
        right--; // @step right
    } else {
        i++; // @step one
    }
}
return; // @step result`,
});
