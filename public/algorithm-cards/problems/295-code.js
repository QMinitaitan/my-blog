import { defineCode } from "../shared/code-resource.js";
import { javascriptHeapHelpers } from "../shared/heap-card.js";
export const codes = [
	defineCode(
		"python",
		`import heapq
class MedianFinder:
    def __init__(self):
        # low 保存相反数：小根堆的根对应原数的最大值。
        self.low, self.high = [], [] # @step init
    def addNum(self, num: int) -> None:
        heapq.heappush(self.low, -num) # @step push
        heapq.heappush(self.high, -heapq.heappop(self.low)) # @step transfer
        if len(self.low) < len(self.high): # @step balance
            heapq.heappush(self.low, -heapq.heappop(self.high)) # @step rebalance
    def findMedian(self) -> float:
        if len(self.low) > len(self.high): # @step odd
            return -self.low[0] # @step single
        return (-self.low[0] + self.high[0]) / 2 # @step average`,
	),
	defineCode(
		"javascript",
		`${javascriptHeapHelpers}
class MedianFinder {
    constructor(){this.low=[];this.high=[];} // @step init
    addNum(num){
        push(this.low,-num); // @step push
        push(this.high,-pop(this.low)); // @step transfer
        if(this.low.length<this.high.length){ // @step balance
            push(this.low,-pop(this.high)); // @step rebalance
        }
    }
    findMedian(){
        if(this.low.length>this.high.length){ // @step odd
            return -this.low[0]; // @step single
        }
        return (-this.low[0]+this.high[0])/2; // @step average
    }
}`,
	),
	defineCode(
		"java",
		`import java.util.*;
class MedianFinder {
    private PriorityQueue<Integer> low,high;
    public MedianFinder(){low=new PriorityQueue<>();high=new PriorityQueue<>();} // @step init
    public void addNum(int num){
        low.add(-num); // @step push
        high.add(-low.poll()); // @step transfer
        if(low.size()<high.size()){ // @step balance
            low.add(-high.poll()); // @step rebalance
        }
    }
    public double findMedian(){
        if(low.size()>high.size()){ // @step odd
            return -low.peek(); // @step single
        }
        return ((double)-low.peek()+high.peek())/2; // @step average
    }
}`,
	),
	defineCode(
		"cpp",
		`#include <queue>
#include <vector>
#include <functional>
using namespace std;
class MedianFinder {
    priority_queue<int,vector<int>,greater<int>> low,high;
public:
    MedianFinder(){} // @step init
    void addNum(int num){
        low.push(-num); // @step push
        int value=-low.top();low.pop();high.push(value); // @step transfer
        if(low.size()<high.size()){ // @step balance
            int value=-high.top();high.pop();low.push(value); // @step rebalance
        }
    }
    double findMedian(){
        if(low.size()>high.size()){ // @step odd
            return -low.top(); // @step single
        }
        return ((double)-low.top()+high.top())/2; // @step average
    }
};`,
	),
].map((c) => ({ ...c, operationClass: "MedianFinder" }));
