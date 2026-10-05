import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"dailyTemperatures",
	[["temperatures", "ints"]],
	"ints",
	{
		python: `# 栈保存还没有答案的日期。当前温度更高时，连续弹出栈顶并用日期差填写答案。
answer = [0] * len(temperatures)
stack = [] # @step init
for i, temperature in enumerate(temperatures): # @step scan
    while stack and temperatures[stack[-1]] < temperature: # @step check
        previous = stack.pop() # @step pop
        answer[previous] = i - previous # @step update
    stack.append(i) # @step push
return answer # @step result`,
		javascript: `// 栈保存还没有答案的日期。当前温度更高时，连续弹出栈顶并用日期差填写答案。
const answer = Array(temperatures.length).fill(0), stack = []; // @step init
for (let i=0; i<temperatures.length; i++) { // @step scan
    const temperature = temperatures[i];
    while (stack.length && temperatures[stack[stack.length-1]] < temperature) { // @step check
        const previous = stack.pop(); // @step pop
        answer[previous] = i-previous; // @step update
    }
    stack.push(i); // @step push
}
return answer; // @step result`,
		java: `// 栈保存还没有答案的日期。当前温度更高时，连续弹出栈顶并用日期差填写答案。
int[] answer = new int[temperatures.length]; Deque<Integer> stack = new ArrayDeque<>(); // @step init
for (int i=0; i<temperatures.length; i++) { // @step scan
    int temperature = temperatures[i];
    while (!stack.isEmpty() && temperatures[stack.peek()] < temperature) { // @step check
        int previous = stack.pop(); // @step pop
        answer[previous] = i-previous; // @step update
    }
    stack.push(i); // @step push
}
return answer; // @step result`,
		cpp: `// 栈保存还没有答案的日期。当前温度更高时，连续弹出栈顶并用日期差填写答案。
vector<int> answer(temperatures.size(),0), stack; // @step init
for (int i=0; i<(int)temperatures.size(); i++) { // @step scan
    int temperature=temperatures[i];
    while (!stack.empty() && temperatures[stack.back()] < temperature) { // @step check
        int previous=stack.back(); stack.pop_back(); // @step pop
        answer[previous]=i-previous; // @step update
    }
    stack.push_back(i); // @step push
}
return answer; // @step result`,
	},
);
