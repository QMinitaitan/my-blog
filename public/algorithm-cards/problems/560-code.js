import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"subarraySum",
	[
		["nums", "ints"],
		["k", "int"],
	],
	"int",
	{
		python: `counts = {0: 1} # @step init
prefix, answer = 0, 0 # @step bounds
for num in nums: # @step item
    prefix += num # @step sum
    need = prefix - k # @step need
    answer += counts.get(need, 0) # @step count
    # 先查询再记录，避免把长度为 0 的区间算进去。
    counts[prefix] = counts.get(prefix, 0) + 1 # @step record
return answer # @step result`,
		javascript: `// 两个前缀和之差等于区间和。字典保存之前各前缀和出现的次数，查询 prefix - k 后再记录当前前缀。
const counts = new Map([[0, 1]]); // @step init
let prefix = 0, answer = 0; // @step bounds
for (const num of nums) { // @step item
    prefix += num; // @step sum
    const need = prefix - k; // @step need
    answer += counts.get(need) ?? 0; // @step count
    counts.set(prefix, (counts.get(prefix) ?? 0) + 1); // @step record
}
return answer; // @step result`,
		java: `// 两个前缀和之差等于区间和。字典保存之前各前缀和出现的次数，查询 prefix - k 后再记录当前前缀。
Map<Integer, Integer> counts = new HashMap<>();
counts.put(0, 1); // @step init
int prefix = 0, answer = 0; // @step bounds
for (int num : nums) { // @step item
    prefix += num; // @step sum
    int need = prefix - k; // @step need
    answer += counts.getOrDefault(need, 0); // @step count
    counts.put(prefix, counts.getOrDefault(prefix, 0) + 1); // @step record
}
return answer; // @step result`,
		cpp: `// 两个前缀和之差等于区间和。字典保存之前各前缀和出现的次数，查询 prefix - k 后再记录当前前缀。
unordered_map<int, int> counts{{0, 1}}; // @step init
int prefix = 0, answer = 0; // @step bounds
for (int num : nums) { // @step item
    prefix += num; // @step sum
    int need = prefix - k; // @step need
    answer += counts.count(need) ? counts[need] : 0; // @step count
    counts[prefix]++; // @step record
}
return answer; // @step result`,
	},
);
