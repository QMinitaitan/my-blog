import { defineCode } from "../shared/code-resource.js";
export const codes = [
	defineCode(
		"python",
		`from typing import List
class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right, best = 0, len(height) - 1, 0 # @step init
        while left < right: # @step check
            area = min(height[left], height[right]) * (right - left) # @step area
            best = max(best, area) # @step best
            # 短板限制水位，移动长板无法改善当前面积。
            if height[left] <= height[right]: # @step compare
                left += 1 # @step left
            else:
                right -= 1 # @step right
        return best # @step result`,
	),
	defineCode(
		"javascript",
		`function maxArea(height) {
    let left = 0, right = height.length - 1, best = 0; // @step init
    while (left < right) { // @step check
        const area = Math.min(height[left], height[right]) * (right - left); // @step area
        best = Math.max(best, area); // @step best
        // 只移动限制水位的短板。
        if (height[left] <= height[right]) { // @step compare
            left++; // @step left
        } else {
            right--; // @step right
        }
    }
    return best; // @step result
}`,
	),
	defineCode(
		"java",
		`class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1, best = 0; // @step init
        while (left < right) { // @step check
            int area = Math.min(height[left], height[right]) * (right - left); // @step area
            best = Math.max(best, area); // @step best
            if (height[left] <= height[right]) { // @step compare
                left++; // @step left
            } else {
                right--; // @step right
            }
        }
        return best; // @step result
    }
}`,
	),
	defineCode(
		"cpp",
		`#include <vector>
#include <algorithm>
using namespace std;
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = (int)height.size() - 1, best = 0; // @step init
        while (left < right) { // @step check
            int area = min(height[left], height[right]) * (right - left); // @step area
            best = max(best, area); // @step best
            if (height[left] <= height[right]) { // @step compare
                left++; // @step left
            } else {
                right--; // @step right
            }
        }
        return best; // @step result
    }
};`,
	),
];
