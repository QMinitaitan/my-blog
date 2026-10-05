import { solutionCodes } from "../shared/solution-code.js";
import { javascriptHeapHelpers } from "../shared/heap-card.js";
export const codes = solutionCodes(
	"findKthLargest",
	[
		["nums", "ints"],
		["k", "int"],
	],
	"int",
	{
		python: `import heapq
heap = [] # @step init
for num in nums: # @step scan
    heapq.heappush(heap, num) # @step push
    if len(heap) > k: # @step oversized
        heapq.heappop(heap) # @step pop
# k 个较大数里最小的，就是第 k 大；重复值也占排名。
return heap[0] # @step result`,
		javascript: `// 保留 k 项小根堆。例如 k=2，堆里保留 5 和 6，根 5 是第 2 大。
${javascriptHeapHelpers}
const heap=[]; // @step init
for(const num of nums){ // @step scan
    push(heap,num); // @step push
    if(heap.length>k){ // @step oversized
        pop(heap); // @step pop
    }
}
return heap[0]; // @step result`,
		java: `// 保留 k 项小根堆。例如 k=2，堆里保留 5 和 6，根 5 是第 2 大。
PriorityQueue<Integer> heap=new PriorityQueue<>(); // @step init
for(int num:nums){ // @step scan
    heap.add(num); // @step push
    if(heap.size()>k){ // @step oversized
        heap.poll(); // @step pop
    }
}
return heap.peek(); // @step result`,
		cpp: `// 保留 k 项小根堆。例如 k=2，堆里保留 5 和 6，根 5 是第 2 大。
priority_queue<int,vector<int>,greater<int>> heap; // @step init
for(int num:nums){ // @step scan
    heap.push(num); // @step push
    if((int)heap.size()>k){ // @step oversized
        heap.pop(); // @step pop
    }
}
return heap.top(); // @step result`,
	},
);
