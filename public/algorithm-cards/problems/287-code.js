import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("findDuplicate", [["nums", "ints"]], "int", {
	python: `# 把 nums[i] 当作从下标 i 指向的下一位置。多个下标指向同一数字会形成可达环，重复值就是入口；套用快慢指针找入口。
slow = fast = 0 # @step init
while True: # @step loop
    slow = nums[slow] # @step slow
    fast = nums[nums[fast]] # @step fast
    if slow == fast: # @step match
        break # @step stop
finder = 0 # @step finder
while finder != slow: # @step search
    finder = nums[finder] # @step findMove
    slow = nums[slow] # @step slowMove
return finder # @step result`,
	javascript: `// 把 nums[i] 当作从下标 i 指向的下一位置。多个下标指向同一数字会形成可达环，重复值就是入口；套用快慢指针找入口。
let slow=0,fast=0; // @step init
while (true) { // @step loop
    slow=nums[slow]; // @step slow
    fast=nums[nums[fast]]; // @step fast
    if (slow===fast) { // @step match
        break; // @step stop
    }
}
let finder=0; // @step finder
while (finder!==slow) { // @step search
    finder=nums[finder]; // @step findMove
    slow=nums[slow]; // @step slowMove
}
return finder; // @step result`,
	java: `// 把 nums[i] 当作从下标 i 指向的下一位置。多个下标指向同一数字会形成可达环，重复值就是入口；套用快慢指针找入口。
int slow=0,fast=0; // @step init
while (true) { // @step loop
    slow=nums[slow]; // @step slow
    fast=nums[nums[fast]]; // @step fast
    if (slow==fast) { // @step match
        break; // @step stop
    }
}
int finder=0; // @step finder
while (finder!=slow) { // @step search
    finder=nums[finder]; // @step findMove
    slow=nums[slow]; // @step slowMove
}
return finder; // @step result`,
	cpp: `// 把 nums[i] 当作从下标 i 指向的下一位置。多个下标指向同一数字会形成可达环，重复值就是入口；套用快慢指针找入口。
int slow=0,fast=0; // @step init
while (true) { // @step loop
    slow=nums[slow]; // @step slow
    fast=nums[nums[fast]]; // @step fast
    if (slow==fast) { // @step match
        break; // @step stop
    }
}
int finder=0; // @step finder
while (finder!=slow) { // @step search
    finder=nums[finder]; // @step findMove
    slow=nums[slow]; // @step slowMove
}
return finder; // @step result`,
});
