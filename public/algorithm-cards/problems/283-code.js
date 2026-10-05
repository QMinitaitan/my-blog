import { defineCode } from "../shared/code-resource.js";
export const codes = [
	defineCode(
		"python",
		`from typing import List
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        write = 0 # @step init
        for read in range(len(nums)): # @step read
            if nums[read] != 0: # @step check
                # 非零元素按原来的顺序放到前面。
                nums[write], nums[read] = nums[read], nums[write] # @step swap
                write += 1 # @step advance
        return None # @step result`,
	),
	defineCode(
		"javascript",
		`function moveZeroes(nums) {
    let write = 0; // @step init
    for (let read = 0; read < nums.length; read++) { // @step read
        if (nums[read] !== 0) { // @step check
            // 交换后非零前缀增加一个元素。
            [nums[write], nums[read]] = [nums[read], nums[write]]; // @step swap
            write++; // @step advance
        }
    }
    return; // @step result
}`,
	),
	defineCode(
		"java",
		`class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0; // @step init
        for (int read = 0; read < nums.length; read++) { // @step read
            if (nums[read] != 0) { // @step check
                int value = nums[write];
                nums[write] = nums[read];
                nums[read] = value; // @step swap
                write++; // @step advance
            }
        }
        return; // @step result
    }
}`,
	),
	defineCode(
		"cpp",
		`#include <vector>
#include <utility>
using namespace std;
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int write = 0; // @step init
        for (int read = 0; read < (int)nums.size(); read++) { // @step read
            if (nums[read] != 0) { // @step check
                swap(nums[write], nums[read]); // @step swap
                write++; // @step advance
            }
        }
        return; // @step result
    }
};`,
	),
];
