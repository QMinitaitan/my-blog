import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"rotate",
	[
		["nums", "ints"],
		["k", "int"],
	],
	"void",
	{
		python: `def reverse(left, right):
    while left < right: # @step check
        nums[left], nums[right] = nums[right], nums[left] # @step swap
        left += 1 # @step left
        right -= 1 # @step right
k %= len(nums) # @step init
# 三次翻转把末尾 k 个数放到前面，并恢复内部顺序。
reverse(0, len(nums) - 1) # @step all
reverse(0, k - 1) # @step first
reverse(k, len(nums) - 1) # @step second
return None # @step result`,
		javascript: `// 先整体翻转，再分别翻转前 k 个与其余元素，三次翻转恢复各组内部顺序。
function reverse(left, right) {
    while (left < right) { // @step check
        [nums[left], nums[right]] = [nums[right], nums[left]]; // @step swap
        left++; // @step left
        right--; // @step right
    }
}
k %= nums.length; // @step init
reverse(0, nums.length - 1); // @step all
reverse(0, k - 1); // @step first
reverse(k, nums.length - 1); // @step second
return; // @step result`,
		java: `// 先整体翻转，再分别翻转前 k 个与其余元素，三次翻转恢复各组内部顺序。
k %= nums.length; // @step init
reverse(nums, 0, nums.length - 1); // @step all
reverse(nums, 0, k - 1); // @step first
reverse(nums, k, nums.length - 1); // @step second
return; // @step result`,
		javaHelpers: `private void reverse(int[] nums, int left, int right) {
    while (left < right) { // @step check
        int value = nums[left];
        nums[left] = nums[right];
        nums[right] = value; // @step swap
        left++; // @step left
        right--; // @step right
    }
}`,
		cpp: `// 先整体翻转，再分别翻转前 k 个与其余元素，三次翻转恢复各组内部顺序。
auto reversePart = [&](int left, int right) {
    while (left < right) { // @step check
        swap(nums[left], nums[right]); // @step swap
        left++; // @step left
        right--; // @step right
    }
};
k %= nums.size(); // @step init
reversePart(0, (int)nums.size() - 1); // @step all
reversePart(0, k - 1); // @step first
reversePart(k, (int)nums.size() - 1); // @step second
return; // @step result`,
	},
);
