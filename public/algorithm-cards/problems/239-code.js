import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"maxSlidingWindow",
	[
		["nums", "ints"],
		["k", "int"],
	],
	"ints",
	{
		python: `from collections import deque
queue, answer = deque(), [] # @step init
for right, num in enumerate(nums): # @step scan
    if queue and queue[0] <= right - k: # @step expired
        queue.popleft() # @step remove
    # 更小的旧值在未来不会成为最大值。
    while queue and nums[queue[-1]] <= num: # @step smaller
        queue.pop() # @step pop
    queue.append(right) # @step append
    if right >= k - 1: # @step ready
        answer.append(nums[queue[0]]) # @step collect
return answer # @step result`,
		javascript: `// head 表示逻辑队首，避免 shift 每次搬移整个数组。
const queue=[],answer=[];let head=0; // @step init
for(let right=0;right<nums.length;right++){const num=nums[right]; // @step scan
    if(head<queue.length&&queue[head]<=right-k){ // @step expired
        head++; // @step remove
    }
    while(head<queue.length&&nums[queue[queue.length-1]]<=num){ // @step smaller
        queue.pop(); // @step pop
    }
    queue.push(right); // @step append
    if(right>=k-1){ // @step ready
        answer.push(nums[queue[head]]); // @step collect
    }
}
return answer; // @step result`,
		java: `// 用递减队列保存候选下标。例如 5 进入时，旧的 3 和 -1 都更小且更早，可以丢掉。
Deque<Integer> queue=new ArrayDeque<>();List<Integer> answer=new ArrayList<>(); // @step init
for(int right=0;right<nums.length;right++){int num=nums[right]; // @step scan
    if(!queue.isEmpty()&&queue.peekFirst()<=right-k){ // @step expired
        queue.removeFirst(); // @step remove
    }
    while(!queue.isEmpty()&&nums[queue.peekLast()]<=num){ // @step smaller
        queue.removeLast(); // @step pop
    }
    queue.addLast(right); // @step append
    if(right>=k-1){ // @step ready
        answer.add(nums[queue.peekFirst()]); // @step collect
    }
}
return answer.stream().mapToInt(Integer::intValue).toArray(); // @step result`,
		cpp: `// 用递减队列保存候选下标。例如 5 进入时，旧的 3 和 -1 都更小且更早，可以丢掉。
deque<int> queue;vector<int> answer; // @step init
for(int right=0;right<(int)nums.size();right++){int num=nums[right]; // @step scan
    if(!queue.empty()&&queue.front()<=right-k){ // @step expired
        queue.pop_front(); // @step remove
    }
    while(!queue.empty()&&nums[queue.back()]<=num){ // @step smaller
        queue.pop_back(); // @step pop
    }
    queue.push_back(right); // @step append
    if(right>=k-1){ // @step ready
        answer.push_back(nums[queue.front()]); // @step collect
    }
}
return answer; // @step result`,
	},
);
