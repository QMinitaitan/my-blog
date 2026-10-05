import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"swapPairs",
	[["head", "listNode"]],
	"listNode",
	{
		python: `# 维护 previous、first、second 三个引用。依次连接 previous→second、first→剩余部分、second→first，再让 previous 移到这一对的新尾节点。
dummy = ListNode(0, head) # @step init
previous = dummy
while previous.next and previous.next.next: # @step check
    first = previous.next # @step first
    second = first.next # @step second
    previous.next = second # @step front
    first.next = second.next # @step rest
    second.next = first # @step back
    previous = first # @step previous
return dummy.next # @step result`,
		javascript: `// 维护 previous、first、second 三个引用。依次连接 previous→second、first→剩余部分、second→first，再让 previous 移到这一对的新尾节点。
const dummy=new ListNode(0,head);let previous=dummy; // @step init
while (previous.next && previous.next.next) { // @step check
    const first=previous.next; // @step first
    const second=first.next; // @step second
    previous.next=second; // @step front
    first.next=second.next; // @step rest
    second.next=first; // @step back
    previous=first; // @step previous
}
return dummy.next; // @step result`,
		java: `// 维护 previous、first、second 三个引用。依次连接 previous→second、first→剩余部分、second→first，再让 previous 移到这一对的新尾节点。
ListNode dummy=new ListNode(0,head),previous=dummy; // @step init
while (previous.next!=null && previous.next.next!=null) { // @step check
    ListNode first=previous.next; // @step first
    ListNode second=first.next; // @step second
    previous.next=second; // @step front
    first.next=second.next; // @step rest
    second.next=first; // @step back
    previous=first; // @step previous
}
return dummy.next; // @step result`,
		cpp: `// 维护 previous、first、second 三个引用。依次连接 previous→second、first→剩余部分、second→first，再让 previous 移到这一对的新尾节点。
ListNode dummy(0,head);ListNode* previous=&dummy; // @step init
while (previous->next && previous->next->next) { // @step check
    ListNode* first=previous->next; // @step first
    ListNode* second=first->next; // @step second
    previous->next=second; // @step front
    first->next=second->next; // @step rest
    second->next=first; // @step back
    previous=first; // @step previous
}
return dummy.next; // @step result`,
	},
);
