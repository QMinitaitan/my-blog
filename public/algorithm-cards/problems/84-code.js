import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"largestRectangleArea",
	[["heights", "ints"]],
	"int",
	{
		python: `stack, answer = [], 0 # @step init
for right in range(len(heights) + 1): # @step scan
    current = heights[right] if right < len(heights) else 0 # @step height
    # 最后用虚拟高度 0 结算，不修改输入数组。
    while stack and heights[stack[-1]] > current: # @step lower
        index = stack.pop() # @step pop
        height = heights[index] # @step bar
        left = stack[-1] if stack else -1 # @step left
        width = right - left - 1 # @step width
        answer = max(answer, height * width) # @step area
    stack.append(right) # @step append
return answer # @step result`,
		javascript: `// 高度递增栈保留尚未遇到右侧更矮柱子的下标。遇到矮柱子时弹栈：新栈顶给左边界，当前 right 给右边界。
const stack=[];let answer=0; // @step init
for(let right=0;right<=heights.length;right++){ // @step scan
    const current=right<heights.length?heights[right]:0; // @step height
    while(stack.length&&heights[stack[stack.length-1]]>current){ // @step lower
        const index=stack.pop(); // @step pop
        const height=heights[index]; // @step bar
        const left=stack.length?stack[stack.length-1]:-1; // @step left
        const width=right-left-1; // @step width
        answer=Math.max(answer,height*width); // @step area
    }
    stack.push(right); // @step append
}
return answer; // @step result`,
		java: `// 高度递增栈保留尚未遇到右侧更矮柱子的下标。遇到矮柱子时弹栈：新栈顶给左边界，当前 right 给右边界。
Deque<Integer> stack=new ArrayDeque<>();int answer=0; // @step init
for(int right=0;right<=heights.length;right++){ // @step scan
    int current=right<heights.length?heights[right]:0; // @step height
    while(!stack.isEmpty()&&heights[stack.peekLast()]>current){ // @step lower
        int index=stack.removeLast(); // @step pop
        int height=heights[index]; // @step bar
        int left=stack.isEmpty()?-1:stack.peekLast(); // @step left
        int width=right-left-1; // @step width
        answer=Math.max(answer,height*width); // @step area
    }
    stack.addLast(right); // @step append
}
return answer; // @step result`,
		cpp: `// 高度递增栈保留尚未遇到右侧更矮柱子的下标。遇到矮柱子时弹栈：新栈顶给左边界，当前 right 给右边界。
vector<int> stack;int answer=0; // @step init
for(int right=0;right<=(int)heights.size();right++){ // @step scan
    int current=right<(int)heights.size()?heights[right]:0; // @step height
    while(!stack.empty()&&heights[stack.back()]>current){ // @step lower
        int index=stack.back();stack.pop_back(); // @step pop
        int height=heights[index]; // @step bar
        int left=stack.empty()?-1:stack.back(); // @step left
        int width=right-left-1; // @step width
        answer=max(answer,height*width); // @step area
    }
    stack.push_back(right); // @step append
}
return answer; // @step result`,
	},
);
