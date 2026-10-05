import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"nextPermutation",
	[["nums", "ints"]],
	"void",
	{
		python: `i = len(nums) - 2 # @step init
while i >= 0 and nums[i] >= nums[i + 1]: # @step check
    i -= 1 # @step left
if i >= 0: # @step pivot
    j = len(nums) - 1 # @step right
    while nums[j] <= nums[i]: # @step greater
        j -= 1 # @step find
    nums[i], nums[j] = nums[j], nums[i] # @step swap
left, right = i + 1, len(nums) - 1 # @step reverse
while left < right: # @step range
    nums[left], nums[right] = nums[right], nums[left] # @step flip
    left += 1
    right -= 1 # @step move
# 后缀原本降序，反转后变为最小的升序排列。
return # @step result`,
		javascript: `// 从右找上升位置，换成后缀中刚好更大的值，再把降序后缀反转。例 [1,3,2] → [2,3,1] → [2,1,3]。
let i=nums.length-2; // @step init
while (i>=0 && nums[i]>=nums[i+1]) { // @step check
    i--; // @step left
}
if (i>=0) { // @step pivot
    let j=nums.length-1; // @step right
    while (nums[j]<=nums[i]) { // @step greater
        j--; // @step find
    }
    [nums[i],nums[j]]=[nums[j],nums[i]]; // @step swap
}
let left=i+1, right=nums.length-1; // @step reverse
while (left<right) { // @step range
    [nums[left],nums[right]]=[nums[right],nums[left]]; // @step flip
    left++; right--; // @step move
}
return; // @step result`,
		java: `// 从右找上升位置，换成后缀中刚好更大的值，再把降序后缀反转。例 [1,3,2] → [2,3,1] → [2,1,3]。
int i=nums.length-2; // @step init
while (i>=0 && nums[i]>=nums[i+1]) { // @step check
    i--; // @step left
}
if (i>=0) { // @step pivot
    int j=nums.length-1; // @step right
    while (nums[j]<=nums[i]) { // @step greater
        j--; // @step find
    }
    int tmp=nums[i]; nums[i]=nums[j]; nums[j]=tmp; // @step swap
}
int left=i+1, right=nums.length-1; // @step reverse
while (left<right) { // @step range
    int tmp=nums[left]; nums[left]=nums[right]; nums[right]=tmp; // @step flip
    left++; right--; // @step move
}
return; // @step result`,
		cpp: `// 从右找上升位置，换成后缀中刚好更大的值，再把降序后缀反转。例 [1,3,2] → [2,3,1] → [2,1,3]。
int i=(int)nums.size()-2; // @step init
while (i>=0 && nums[i]>=nums[i+1]) { // @step check
    i--; // @step left
}
if (i>=0) { // @step pivot
    int j=(int)nums.size()-1; // @step right
    while (nums[j]<=nums[i]) { // @step greater
        j--; // @step find
    }
    swap(nums[i],nums[j]); // @step swap
}
int left=i+1, right=(int)nums.size()-1; // @step reverse
while (left<right) { // @step range
    swap(nums[left],nums[right]); // @step flip
    left++; right--; // @step move
}
return; // @step result`,
	},
);
