import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("jump", [["nums", "ints"]], "int", {
	python: `end, farthest, jumps = 0, 0, 0 # @step init
for i in range(len(nums) - 1): # @step item
    farthest = max(farthest, i + nums[i]) # @step extend
    if i == end: # @step boundary
        # 到达本层边界，进入下一跳的覆盖层。
        jumps += 1 # @step count
        end = farthest # @step end
return jumps # @step result`,
	javascript: `// 把一跳可达范围看作一层。扫完本层再进入下一层，能得到最少跳数。
let end = 0, farthest = 0, jumps = 0; // @step init
for (let i = 0; i < nums.length - 1; i++) { // @step item
    farthest = Math.max(farthest, i + nums[i]); // @step extend
    if (i === end) { // @step boundary
        jumps++; // @step count
        end = farthest; // @step end
    }
}
return jumps; // @step result`,
	java: `// 把一跳可达范围看作一层。扫完本层再进入下一层，能得到最少跳数。
int end = 0, farthest = 0, jumps = 0; // @step init
for (int i = 0; i < nums.length - 1; i++) { // @step item
    farthest = Math.max(farthest, i + nums[i]); // @step extend
    if (i == end) { // @step boundary
        jumps++; // @step count
        end = farthest; // @step end
    }
}
return jumps; // @step result`,
	cpp: `// 把一跳可达范围看作一层。扫完本层再进入下一层，能得到最少跳数。
int end = 0, farthest = 0, jumps = 0; // @step init
for (int i = 0; i < (int)nums.size() - 1; i++) { // @step item
    farthest = max(farthest, i + nums[i]); // @step extend
    if (i == end) { // @step boundary
        jumps++; // @step count
        end = farthest; // @step end
    }
}
return jumps; // @step result`,
});
