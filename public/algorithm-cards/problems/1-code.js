export const codes = [
	{
		id: "python",
		label: "Python 3",
		lines: { 3: 5, 4: 6, 5: 7, 6: 8, 7: 9, 8: 10, 9: 11 },
		source: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            need = target - num
            if need in seen:
                return [seen[need], i]
            seen[num] = i
        return []`,
	},
	{
		id: "java",
		label: "Java",
		lines: { 3: 6, 4: 8, 5: 9, 6: 10, 7: 11, 8: 13, 9: 15 },
		source: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Long, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int num = nums[i];
            long need = (long) target - num;
            if (seen.containsKey(need)) {
                return new int[]{seen.get(need), i};
            }
            seen.put((long) num, i);
        }
        return new int[0];
    }
}`,
	},
	{
		id: "cpp",
		label: "C++",
		lines: { 3: 8, 4: 10, 5: 11, 6: 12, 7: 13, 8: 15, 9: 17 },
		source: `#include <unordered_map>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<long long, int> seen;
        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            int num = nums[i];
            long long need = static_cast<long long>(target) - num;
            if (seen.count(need)) {
                return {seen[need], i};
            }
            seen[num] = i;
        }
        return {};
    }
};`,
	},
	{
		id: "javascript",
		label: "JavaScript",
		lines: { 3: 2, 4: 4, 5: 5, 6: 6, 7: 7, 8: 9, 9: 11 },
		source: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const need = target - num;
        if (seen.has(need)) {
            return [seen.get(need), i];
        }
        seen.set(num, i);
    }
    return [];
}`,
	},
];
