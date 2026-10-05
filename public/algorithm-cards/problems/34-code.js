import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"searchRange",
	[
		["nums", "ints"],
		["target", "int"],
	],
	"ints",
	{
		python: `# 两次查找左边界。第一次查 >=target，第二次查 >=target+1。
def lower_bound(value):
    left, right = 0, len(nums) # @step init
    while left < right: # @step loop
        mid = (left + right) // 2 # @step mid
        if nums[mid] < value: # @step compare
            left = mid + 1 # @step left
        else:
            right = mid # @step right
    return left # @step bound
start = lower_bound(target) # @step first
end = lower_bound(target + 1) - 1 # @step last
if start == len(nums) or nums[start] != target: # @step found
    return [-1, -1] # @step fail
return [start, end] # @step result`,
		javascript: `// 两次查找左边界。第一次查 >=target，第二次查 >=target+1。
function lowerBound(value) {
    let left=0, right=nums.length; // @step init
    while (left<right) { // @step loop
        const mid=Math.floor((left+right)/2); // @step mid
        if (nums[mid]<value) { // @step compare
            left=mid+1; // @step left
        } else {
            right=mid; // @step right
        }
    }
    return left; // @step bound
}
const start=lowerBound(target); // @step first
const end=lowerBound(target+1)-1; // @step last
if (start===nums.length || nums[start]!==target) { // @step found
    return [-1,-1]; // @step fail
}
return [start,end]; // @step result`,
		java: `// 两次查找左边界。第一次查 >=target，第二次查 >=target+1。
int start=lowerBound(nums,(long)target); // @step first
int end=lowerBound(nums,(long)target+1)-1; // @step last
if (start==nums.length || nums[start]!=target) { // @step found
    return new int[]{-1,-1}; // @step fail
}
return new int[]{start,end}; // @step result`,
		javaHelpers: `private int lowerBound(int[] nums,long value) {
    int left=0,right=nums.length; // @step init
    while (left<right) { // @step loop
        int mid=left+(right-left)/2; // @step mid
        if (nums[mid]<value) { // @step compare
            left=mid+1; // @step left
        } else {
            right=mid; // @step right
        }
    }
    return left; // @step bound
}`,
		cpp: `// 两次查找左边界。第一次查 >=target，第二次查 >=target+1。
auto lowerBound = [&](long long value) {
    int left=0,right=(int)nums.size(); // @step init
    while (left<right) { // @step loop
        int mid=left+(right-left)/2; // @step mid
        if (nums[mid]<value) { // @step compare
            left=mid+1; // @step left
        } else {
            right=mid; // @step right
        }
    }
    return left; // @step bound
};
int start=lowerBound(target); // @step first
int end=lowerBound((long long)target+1)-1; // @step last
if (start==(int)nums.size() || nums[start]!=target) { // @step found
    return {-1,-1}; // @step fail
}
return {start,end}; // @step result`,
	},
);
