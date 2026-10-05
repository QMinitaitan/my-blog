import { defineCode } from "../shared/code-resource.js";
export const codes = [
	{
		id: "python",
		label: "Python 3",
		lines: {
			set: 5,
			init: 6,
			num: 7,
			start: 8,
			current: 9,
			length: 10,
			check: 11,
			advance: 12,
			count: 13,
			best: 14,
			result: 15,
		},
		source: `from typing import List

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0
        for num in num_set:
            if num - 1 not in num_set:
                current = num
                length = 1
                while current + 1 in num_set:
                    current += 1
                    length += 1
                longest = max(longest, length)
        return longest`,
	},
	{
		id: "javascript",
		label: "JavaScript",
		lines: {
			set: 2,
			init: 3,
			num: 5,
			start: 6,
			current: 7,
			length: 8,
			check: 9,
			advance: 10,
			count: 11,
			best: 13,
			result: 16,
		},
		source: `function longestConsecutive(nums) {
    const num_set = new Set(nums);
    let longest = 0;
    let num, current, length;
    for (num of num_set) {
        if (!num_set.has(num - 1)) {
            current = num;
            length = 1;
            while (num_set.has(current + 1)) {
                current += 1;
                length += 1;
            }
            longest = Math.max(longest, length);
        }
    }
    return longest;
}`,
	},
	defineCode(
		"java",
		`import java.util.*;
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> num_set = new LinkedHashSet<>();
        for (int num : nums) num_set.add(num); // @step set
        int longest = 0; // @step init
        for (int num : num_set) { // @step num
            if (!num_set.contains(num - 1)) { // @step start
                int current = num; // @step current
                int length = 1; // @step length
                while (num_set.contains(current + 1)) { // @step check
                    current += 1; // @step advance
                    length += 1; // @step count
                }
                longest = Math.max(longest, length); // @step best
            }
        }
        return longest; // @step result
    }
}`,
	),
	defineCode(
		"cpp",
		`#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> num_set(nums.begin(), nums.end()); // @step set
        int longest = 0; // @step init
        for (int num : num_set) { // @step num
            if (!num_set.count(num - 1)) { // @step start
                int current = num; // @step current
                int length = 1; // @step length
                while (num_set.count(current + 1)) { // @step check
                    current += 1; // @step advance
                    length += 1; // @step count
                }
                longest = max(longest, length); // @step best
            }
        }
        return longest; // @step result
    }
};`,
	),
];
