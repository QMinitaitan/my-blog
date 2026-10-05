import { defineCode } from "../shared/code-resource.js";
export const codes = [
	defineCode(
		"python",
		`from typing import List
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort() # @step sort
        answer = [] # @step init
        for i in range(len(nums) - 2): # @step anchor
            if i > 0 and nums[i] == nums[i - 1]: # @step duplicate
                continue # @step skip
            left, right = i + 1, len(nums) - 1 # @step pointers
            while left < right: # @step check
                total = nums[i] + nums[left] + nums[right] # @step sum
                if total == 0: # @step zero
                    answer.append([nums[i], nums[left], nums[right]]) # @step append
                    left += 1 # @step left
                    right -= 1 # @step right
                    # 跳过相同值，避免重复输出相同三元组。
                    while left < right and nums[left] == nums[left - 1]: # @step leftCheck
                        left += 1 # @step leftSkip
                    while left < right and nums[right] == nums[right + 1]: # @step rightCheck
                        right -= 1 # @step rightSkip
                elif total < 0: # @step negative
                    left += 1 # @step small
                else:
                    right -= 1 # @step large
        return answer # @step result`,
	),
	defineCode(
		"javascript",
		`function threeSum(nums) {
    nums.sort((a, b) => a - b); // @step sort
    const answer = []; // @step init
    for (let i = 0; i < nums.length - 2; i++) { // @step anchor
        if (i > 0 && nums[i] === nums[i - 1]) { // @step duplicate
            continue; // @step skip
        }
        let left = i + 1, right = nums.length - 1; // @step pointers
        while (left < right) { // @step check
            const total = nums[i] + nums[left] + nums[right]; // @step sum
            if (total === 0) { // @step zero
                answer.push([nums[i], nums[left], nums[right]]); // @step append
                left++; // @step left
                right--; // @step right
                // 跳过重复值。
                while (left < right && nums[left] === nums[left - 1]) { // @step leftCheck
                    left++; // @step leftSkip
                }
                while (left < right && nums[right] === nums[right + 1]) { // @step rightCheck
                    right--; // @step rightSkip
                }
            } else if (total < 0) { // @step negative
                left++; // @step small
            } else {
                right--; // @step large
            }
        }
    }
    return answer; // @step result
}`,
	),
	defineCode(
		"java",
		`import java.util.*;
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums); // @step sort
        List<List<Integer>> answer = new ArrayList<>(); // @step init
        for (int i = 0; i < nums.length - 2; i++) { // @step anchor
            if (i > 0 && nums[i] == nums[i - 1]) { // @step duplicate
                continue; // @step skip
            }
            int left = i + 1, right = nums.length - 1; // @step pointers
            while (left < right) { // @step check
                int total = nums[i] + nums[left] + nums[right]; // @step sum
                if (total == 0) { // @step zero
                    answer.add(Arrays.asList(nums[i], nums[left], nums[right])); // @step append
                    left++; // @step left
                    right--; // @step right
                    while (left < right && nums[left] == nums[left - 1]) { // @step leftCheck
                        left++; // @step leftSkip
                    }
                    while (left < right && nums[right] == nums[right + 1]) { // @step rightCheck
                        right--; // @step rightSkip
                    }
                } else if (total < 0) { // @step negative
                    left++; // @step small
                } else {
                    right--; // @step large
                }
            }
        }
        return answer; // @step result
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
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end()); // @step sort
        vector<vector<int>> answer; // @step init
        for (int i = 0; i < (int)nums.size() - 2; i++) { // @step anchor
            if (i > 0 && nums[i] == nums[i - 1]) { // @step duplicate
                continue; // @step skip
            }
            int left = i + 1, right = (int)nums.size() - 1; // @step pointers
            while (left < right) { // @step check
                int total = nums[i] + nums[left] + nums[right]; // @step sum
                if (total == 0) { // @step zero
                    answer.push_back({nums[i], nums[left], nums[right]}); // @step append
                    left++; // @step left
                    right--; // @step right
                    while (left < right && nums[left] == nums[left - 1]) { // @step leftCheck
                        left++; // @step leftSkip
                    }
                    while (left < right && nums[right] == nums[right + 1]) { // @step rightCheck
                        right--; // @step rightSkip
                    }
                } else if (total < 0) { // @step negative
                    left++; // @step small
                } else {
                    right--; // @step large
                }
            }
        }
        return answer; // @step result
    }
};`,
	),
];
