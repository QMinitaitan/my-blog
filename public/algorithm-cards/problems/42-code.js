import { defineCode } from "../shared/code-resource.js";
export const codes = [
	defineCode(
		"python",
		`from typing import List
class Solution:
    def trap(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1 # @step init
        left_max, right_max, water = 0, 0, 0 # @step maxima
        while left <= right: # @step check
            if height[left] <= height[right]: # @step compare
                left_max = max(left_max, height[left]) # @step leftMax
                water += left_max - height[left] # @step leftWater
                left += 1 # @step left
            else:
                right_max = max(right_max, height[right]) # @step rightMax
                water += right_max - height[right] # @step rightWater
                right -= 1 # @step right
        return water # @step result`,
	),
	defineCode(
		"javascript",
		`function trap(height) {
    let left = 0, right = height.length - 1; // @step init
    let left_max = 0, right_max = 0, water = 0; // @step maxima
    while (left <= right) { // @step check
        if (height[left] <= height[right]) { // @step compare
            left_max = Math.max(left_max, height[left]); // @step leftMax
            water += left_max - height[left]; // @step leftWater
            left++; // @step left
        } else {
            right_max = Math.max(right_max, height[right]); // @step rightMax
            water += right_max - height[right]; // @step rightWater
            right--; // @step right
        }
    }
    return water; // @step result
}`,
	),
	defineCode(
		"java",
		`class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1; // @step init
        int left_max = 0, right_max = 0, water = 0; // @step maxima
        while (left <= right) { // @step check
            if (height[left] <= height[right]) { // @step compare
                left_max = Math.max(left_max, height[left]); // @step leftMax
                water += left_max - height[left]; // @step leftWater
                left++; // @step left
            } else {
                right_max = Math.max(right_max, height[right]); // @step rightMax
                water += right_max - height[right]; // @step rightWater
                right--; // @step right
            }
        }
        return water; // @step result
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
    int trap(vector<int>& height) {
        int left = 0, right = (int)height.size() - 1; // @step init
        int left_max = 0, right_max = 0, water = 0; // @step maxima
        while (left <= right) { // @step check
            if (height[left] <= height[right]) { // @step compare
                left_max = max(left_max, height[left]); // @step leftMax
                water += left_max - height[left]; // @step leftWater
                left++; // @step left
            } else {
                right_max = max(right_max, height[right]); // @step rightMax
                water += right_max - height[right]; // @step rightWater
                right--; // @step right
            }
        }
        return water; // @step result
    }
};`,
	),
];
