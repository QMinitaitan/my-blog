import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"mergeTwoLists",
	[
		["l1", "listNode"],
		["l2", "listNode"],
	],
	"listNode",
	{
		python: `# 用 dummy 简化第一次连接。每次接较小的头节点并移动对应指针；一侧耗尽后直接接上另一侧剩余部分。
dummy = ListNode(0) # @step init
tail = dummy
while l1 and l2: # @step check
    if l1.val <= l2.val: # @step compare
        tail.next = l1 # @step linkLeft
        l1 = l1.next # @step left
    else:
        tail.next = l2 # @step linkRight
        l2 = l2.next # @step right
    tail = tail.next # @step tail
tail.next = l1 if l1 else l2 # @step rest
return dummy.next # @step result`,
		javascript: `// 用 dummy 简化第一次连接。每次接较小的头节点并移动对应指针；一侧耗尽后直接接上另一侧剩余部分。
const dummy=new ListNode(0);let tail=dummy; // @step init
while (l1 && l2) { // @step check
    if (l1.val<=l2.val) { // @step compare
        tail.next=l1; // @step linkLeft
        l1=l1.next; // @step left
    } else {
        tail.next=l2; // @step linkRight
        l2=l2.next; // @step right
    }
    tail=tail.next; // @step tail
}
tail.next=l1?l1:l2; // @step rest
return dummy.next; // @step result`,
		java: `// 用 dummy 简化第一次连接。每次接较小的头节点并移动对应指针；一侧耗尽后直接接上另一侧剩余部分。
ListNode dummy=new ListNode(0),tail=dummy; // @step init
while (l1!=null && l2!=null) { // @step check
    if (l1.val<=l2.val) { // @step compare
        tail.next=l1; // @step linkLeft
        l1=l1.next; // @step left
    } else {
        tail.next=l2; // @step linkRight
        l2=l2.next; // @step right
    }
    tail=tail.next; // @step tail
}
tail.next=l1!=null?l1:l2; // @step rest
return dummy.next; // @step result`,
		cpp: `// 用 dummy 简化第一次连接。每次接较小的头节点并移动对应指针；一侧耗尽后直接接上另一侧剩余部分。
ListNode dummy(0);ListNode* tail=&dummy; // @step init
while (l1 && l2) { // @step check
    if (l1->val<=l2->val) { // @step compare
        tail->next=l1; // @step linkLeft
        l1=l1->next; // @step left
    } else {
        tail->next=l2; // @step linkRight
        l2=l2->next; // @step right
    }
    tail=tail->next; // @step tail
}
tail->next=l1?l1:l2; // @step rest
return dummy.next; // @step result`,
	},
);
