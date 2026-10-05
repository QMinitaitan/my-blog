import { defineCode } from "../shared/code-resource.js";
export const codes = [
	defineCode(
		"python",
		`class MinStack:
    def __init__(self):
        self.stack = [] # @step init

    def push(self, val: int) -> None:
        if not self.stack: # @step empty
            minimum = val # @step first
        else:
            minimum = min(val, self.stack[-1][1]) # @step minimum
        self.stack.append((val, minimum)) # @step push

    def pop(self) -> None:
        self.stack.pop() # @step pop

    def top(self) -> int:
        return self.stack[-1][0] # @step top

    def getMin(self) -> int:
        return self.stack[-1][1] # @step min`,
	),
	defineCode(
		"javascript",
		`class MinStack {
    constructor() { this.stack=[]; } // @step init
    push(val) {
        let minimum;
        if (!this.stack.length) { // @step empty
            minimum=val; // @step first
        } else {
            minimum=Math.min(val,this.stack[this.stack.length-1][1]); // @step minimum
        }
        this.stack.push([val,minimum]); // @step push
    }
    pop() { this.stack.pop(); } // @step pop
    top() { return this.stack[this.stack.length-1][0]; } // @step top
    getMin() { return this.stack[this.stack.length-1][1]; } // @step min
}`,
	),
	defineCode(
		"java",
		`import java.util.*;
class MinStack {
    private Deque<int[]> stack;
    public MinStack() { stack=new ArrayDeque<>(); } // @step init
    public void push(int val) {
        int minimum;
        if (stack.isEmpty()) { // @step empty
            minimum=val; // @step first
        } else {
            minimum=Math.min(val,stack.peek()[1]); // @step minimum
        }
        stack.push(new int[]{val,minimum}); // @step push
    }
    public void pop() { stack.pop(); } // @step pop
    public int top() { return stack.peek()[0]; } // @step top
    public int getMin() { return stack.peek()[1]; } // @step min
}`,
	),
	defineCode(
		"cpp",
		`#include <vector>
#include <algorithm>
using namespace std;
class MinStack {
    vector<pair<int,int>> stack;
public:
    MinStack() { stack.clear(); } // @step init
    void push(int val) {
        int minimum;
        if (stack.empty()) { // @step empty
            minimum=val; // @step first
        } else {
            minimum=min(val,stack.back().second); // @step minimum
        }
        stack.emplace_back(val,minimum); // @step push
    }
    void pop() { stack.pop_back(); } // @step pop
    int top() { return stack.back().first; } // @step top
    int getMin() { return stack.back().second; } // @step min
};`,
	),
].map((code) => ({ ...code, operationClass: "MinStack" }));
