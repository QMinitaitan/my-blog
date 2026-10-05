import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"search",
	[
		["nums", "ints"],
		["target", "int"],
	],
	"int",
	{
		python: `# 每次中点把区间分成两半，至少一半仍有序。先判断目标是否在有序半段的值域，再决定保留哪一半。
left, right = 0, len(nums) - 1 # @step init
while left <= right: # @step loop
    mid = (left + right) // 2 # @step mid
    if nums[mid] == target: # @step match
        return mid # @step hit
    if nums[left] <= nums[mid]: # @step side
        if nums[left] <= target < nums[mid]: # @step inLeft
            right = mid - 1 # @step keepLeft
        else:
            left = mid + 1 # @step discardLeft
    else:
        if nums[mid] < target <= nums[right]: # @step inRight
            left = mid + 1 # @step keepRight
        else:
            right = mid - 1 # @step discardRight
return -1 # @step result`,
		javascript: `// 每次中点把区间分成两半，至少一半仍有序。先判断目标是否在有序半段的值域，再决定保留哪一半。
let left=0,right=nums.length-1; // @step init
while (left<=right) { // @step loop
    const mid=Math.floor((left+right)/2); // @step mid
    if (nums[mid]===target) { // @step match
        return mid; // @step hit
    }
    if (nums[left]<=nums[mid]) { // @step side
        if (nums[left]<=target && target<nums[mid]) { // @step inLeft
            right=mid-1; // @step keepLeft
        } else {
            left=mid+1; // @step discardLeft
        }
    } else {
        if (nums[mid]<target && target<=nums[right]) { // @step inRight
            left=mid+1; // @step keepRight
        } else {
            right=mid-1; // @step discardRight
        }
    }
}
return -1; // @step result`,
		java: `// 每次中点把区间分成两半，至少一半仍有序。先判断目标是否在有序半段的值域，再决定保留哪一半。
int left=0,right=nums.length-1; // @step init
while (left<=right) { // @step loop
    int mid=left+(right-left)/2; // @step mid
    if (nums[mid]==target) { // @step match
        return mid; // @step hit
    }
    if (nums[left]<=nums[mid]) { // @step side
        if (nums[left]<=target && target<nums[mid]) { // @step inLeft
            right=mid-1; // @step keepLeft
        } else {
            left=mid+1; // @step discardLeft
        }
    } else {
        if (nums[mid]<target && target<=nums[right]) { // @step inRight
            left=mid+1; // @step keepRight
        } else {
            right=mid-1; // @step discardRight
        }
    }
}
return -1; // @step result`,
		cpp: `// 每次中点把区间分成两半，至少一半仍有序。先判断目标是否在有序半段的值域，再决定保留哪一半。
int left=0,right=(int)nums.size()-1; // @step init
while (left<=right) { // @step loop
    int mid=left+(right-left)/2; // @step mid
    if (nums[mid]==target) { // @step match
        return mid; // @step hit
    }
    if (nums[left]<=nums[mid]) { // @step side
        if (nums[left]<=target && target<nums[mid]) { // @step inLeft
            right=mid-1; // @step keepLeft
        } else {
            left=mid+1; // @step discardLeft
        }
    } else {
        if (nums[mid]<target && target<=nums[right]) { // @step inRight
            left=mid+1; // @step keepRight
        } else {
            right=mid-1; // @step discardRight
        }
    }
}
return -1; // @step result`,
	},
);
