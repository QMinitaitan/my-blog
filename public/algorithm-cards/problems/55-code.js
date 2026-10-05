import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("canJump", [["nums", "ints"]], "bool", {
	python: `# 维护所有已到达位置能覆盖的最远下标；遇到覆盖范围以外的位置就失败。
farthest = 0 # @step init
for i in range(len(nums)): # @step item
    if i > farthest: # @step blocked
        return False # @step fail
    farthest = max(farthest, i + nums[i]) # @step extend
return True # @step result`,
	javascript: `// 维护所有已到达位置能覆盖的最远下标；遇到覆盖范围以外的位置就失败。
let farthest = 0; // @step init
for (let i = 0; i < nums.length; i++) { // @step item
    if (i > farthest) { // @step blocked
        return false; // @step fail
    }
    farthest = Math.max(farthest, i + nums[i]); // @step extend
}
return true; // @step result`,
	java: `// 维护所有已到达位置能覆盖的最远下标；遇到覆盖范围以外的位置就失败。
int farthest = 0; // @step init
for (int i = 0; i < nums.length; i++) { // @step item
    if (i > farthest) { // @step blocked
        return false; // @step fail
    }
    farthest = Math.max(farthest, i + nums[i]); // @step extend
}
return true; // @step result`,
	cpp: `// 维护所有已到达位置能覆盖的最远下标；遇到覆盖范围以外的位置就失败。
int farthest = 0; // @step init
for (int i = 0; i < (int)nums.size(); i++) { // @step item
    if (i > farthest) { // @step blocked
        return false; // @step fail
    }
    farthest = max(farthest, i + nums[i]); // @step extend
}
return true; // @step result`,
});
