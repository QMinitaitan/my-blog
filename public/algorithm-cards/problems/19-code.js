import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"removeNthFromEnd",
	[
		["head", "listNode"],
		["n", "int"],
	],
	"listNode",
	{
		python: `# 两个指针从 dummy 出发，fast 先走 n 步，再同步走到 fast 位于末尾。slow 刚好位于目标前一个节点，只需改一次 next。
dummy = ListNode(0, head) # @step init
fast = slow = dummy
for i in range(n): # @step lead
    fast = fast.next # @step advance
while fast.next: # @step check
    fast = fast.next # @step fast
    slow = slow.next # @step slow
slow.next = slow.next.next # @step remove
return dummy.next # @step result`,
		javascript: `// 两个指针从 dummy 出发，fast 先走 n 步，再同步走到 fast 位于末尾。slow 刚好位于目标前一个节点，只需改一次 next。
const dummy=new ListNode(0,head);let fast=dummy,slow=dummy; // @step init
for (let i=0;i<n;i++) { // @step lead
    fast=fast.next; // @step advance
}
while (fast.next) { // @step check
    fast=fast.next; // @step fast
    slow=slow.next; // @step slow
}
slow.next=slow.next.next; // @step remove
return dummy.next; // @step result`,
		java: `// 两个指针从 dummy 出发，fast 先走 n 步，再同步走到 fast 位于末尾。slow 刚好位于目标前一个节点，只需改一次 next。
ListNode dummy=new ListNode(0,head),fast=dummy,slow=dummy; // @step init
for (int i=0;i<n;i++) { // @step lead
    fast=fast.next; // @step advance
}
while (fast.next!=null) { // @step check
    fast=fast.next; // @step fast
    slow=slow.next; // @step slow
}
slow.next=slow.next.next; // @step remove
return dummy.next; // @step result`,
		cpp: `// 两个指针从 dummy 出发，fast 先走 n 步，再同步走到 fast 位于末尾。slow 刚好位于目标前一个节点，只需改一次 next。
ListNode dummy(0,head);ListNode* fast=&dummy;ListNode* slow=&dummy; // @step init
for (int i=0;i<n;i++) { // @step lead
    fast=fast->next; // @step advance
}
while (fast->next) { // @step check
    fast=fast->next; // @step fast
    slow=slow->next; // @step slow
}
slow->next=slow->next->next; // @step remove
return dummy.next; // @step result`,
	},
);
