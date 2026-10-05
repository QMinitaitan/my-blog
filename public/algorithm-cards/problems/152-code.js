import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("maxProduct", [["nums", "ints"]], "int", {
	python: `# 负数会交换大小关系，所以同时记录以当前位置结尾的最大积和最小积。例如 -6 乘 -4 得到 24；只保存最大积会漏掉它。
maxEnding = minEnding = answer = nums[0] # @step init
for i in range(1, len(nums)):
    num = nums[i] # @step scan
    nextMax = max(num, maxEnding * num, minEnding * num) # @step max
    nextMin = min(num, maxEnding * num, minEnding * num) # @step min
    maxEnding, minEnding = nextMax, nextMin # @step update
    answer = max(answer, maxEnding) # @step best
return answer # @step result`,
	javascript: `// 负数会交换大小关系，所以同时记录以当前位置结尾的最大积和最小积。例如 -6 乘 -4 得到 24；只保存最大积会漏掉它。
let maxEnding=nums[0],minEnding=nums[0],answer=nums[0]; // @step init
for (let i=1;i<nums.length;i++) {
    const num=nums[i]; // @step scan
    const nextMax=Math.max(num,maxEnding*num,minEnding*num); // @step max
    const nextMin=Math.min(num,maxEnding*num,minEnding*num); // @step min
    maxEnding=nextMax;minEnding=nextMin; // @step update
    answer=Math.max(answer,maxEnding); // @step best
}
return answer; // @step result`,
	java: `// 负数会交换大小关系，所以同时记录以当前位置结尾的最大积和最小积。例如 -6 乘 -4 得到 24；只保存最大积会漏掉它。
int maxEnding=nums[0],minEnding=nums[0],answer=nums[0]; // @step init
for (int i=1;i<nums.length;i++) {
    int num=nums[i]; // @step scan
    int nextMax=Math.max(num,Math.max(maxEnding*num,minEnding*num)); // @step max
    int nextMin=Math.min(num,Math.min(maxEnding*num,minEnding*num)); // @step min
    maxEnding=nextMax;minEnding=nextMin; // @step update
    answer=Math.max(answer,maxEnding); // @step best
}
return answer; // @step result`,
	cpp: `// 负数会交换大小关系，所以同时记录以当前位置结尾的最大积和最小积。例如 -6 乘 -4 得到 24；只保存最大积会漏掉它。
int maxEnding=nums[0],minEnding=nums[0],answer=nums[0]; // @step init
for (int i=1;i<(int)nums.size();i++) {
    int num=nums[i]; // @step scan
    int nextMax=max(num,max(maxEnding*num,minEnding*num)); // @step max
    int nextMin=min(num,min(maxEnding*num,minEnding*num)); // @step min
    maxEnding=nextMax;minEnding=nextMin; // @step update
    answer=max(answer,maxEnding); // @step best
}
return answer; // @step result`,
});
