import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("singleNumber", [["nums", "ints"]], "int", {
	python: `answer = 0 # @step init
for num in nums: # @step item
    # 相同数字异或抵消，0 异或任何数等于该数。
    answer ^= num # @step xor
return answer # @step result`,
	javascript: `// 把所有数字异或。a XOR a = 0，a XOR 0 = a，出现两次的数字会抵消。
let answer = 0; // @step init
for (const num of nums) { // @step item
    answer ^= num; // @step xor
}
return answer; // @step result`,
	java: `// 把所有数字异或。a XOR a = 0，a XOR 0 = a，出现两次的数字会抵消。
int answer = 0; // @step init
for (int num : nums) { // @step item
    answer ^= num; // @step xor
}
return answer; // @step result`,
	cpp: `// 把所有数字异或。a XOR a = 0，a XOR 0 = a，出现两次的数字会抵消。
int answer = 0; // @step init
for (int num : nums) { // @step item
    answer ^= num; // @step xor
}
return answer; // @step result`,
});
