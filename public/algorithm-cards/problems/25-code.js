import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"reverseKGroup",
	[
		["head", "listNode"],
		["k", "int"],
	],
	"listNode",
	{
		python: `# 先找到 kth 确认完整组，再以 group_next 为停止边界逐个反转。previous 初始指向 group_next，让旧组头自动接上剩余链表。
dummy = ListNode(0, head)
group_previous = dummy # @step init
while True: # @step loop
    kth = group_previous # @step kth
    for _ in range(k): # @step scan
        kth = kth.next # @step advance
        if kth is None: # @step short
            return dummy.next # @step result
    group_next = kth.next # @step boundary
    previous, current = group_next, group_previous.next # @step bounds
    while current is not group_next: # @step reverse
        following = current.next # @step remember
        current.next = previous # @step link
        previous, current = current, following # @step move
    old_head = group_previous.next # @step old
    group_previous.next = kth # @step front
    group_previous = old_head # @step nextGroup`,
		javascript: `// 先找到 kth 确认完整组，再以 group_next 为停止边界逐个反转。previous 初始指向 group_next，让旧组头自动接上剩余链表。
const dummy=new ListNode(0,head);let group_previous=dummy; // @step init
while(true){ // @step loop
    let kth=group_previous; // @step kth
    for(let count=0;count<k;count++){ // @step scan
        kth=kth.next; // @step advance
        if(kth===null){ // @step short
            return dummy.next; // @step result
        }
    }
    const group_next=kth.next; // @step boundary
    let previous=group_next,current=group_previous.next; // @step bounds
    while(current!==group_next){ // @step reverse
        const following=current.next; // @step remember
        current.next=previous; // @step link
        previous=current;current=following; // @step move
    }
    const old_head=group_previous.next; // @step old
    group_previous.next=kth; // @step front
    group_previous=old_head; // @step nextGroup
}`,
		java: `// 先找到 kth 确认完整组，再以 group_next 为停止边界逐个反转。previous 初始指向 group_next，让旧组头自动接上剩余链表。
ListNode dummy=new ListNode(0,head),group_previous=dummy; // @step init
while(true){ // @step loop
    ListNode kth=group_previous; // @step kth
    for(int count=0;count<k;count++){ // @step scan
        kth=kth.next; // @step advance
        if(kth==null){ // @step short
            return dummy.next; // @step result
        }
    }
    ListNode group_next=kth.next; // @step boundary
    ListNode previous=group_next,current=group_previous.next; // @step bounds
    while(current!=group_next){ // @step reverse
        ListNode following=current.next; // @step remember
        current.next=previous; // @step link
        previous=current;current=following; // @step move
    }
    ListNode old_head=group_previous.next; // @step old
    group_previous.next=kth; // @step front
    group_previous=old_head; // @step nextGroup
}`,
		cpp: `// 先找到 kth 确认完整组，再以 group_next 为停止边界逐个反转。previous 初始指向 group_next，让旧组头自动接上剩余链表。
ListNode dummy(0,head);ListNode* group_previous=&dummy; // @step init
while(true){ // @step loop
    ListNode* kth=group_previous; // @step kth
    for(int count=0;count<k;count++){ // @step scan
        kth=kth->next; // @step advance
        if(!kth){ // @step short
            return dummy.next; // @step result
        }
    }
    ListNode* group_next=kth->next; // @step boundary
    ListNode* previous=group_next;ListNode* current=group_previous->next; // @step bounds
    while(current!=group_next){ // @step reverse
        ListNode* following=current->next; // @step remember
        current->next=previous; // @step link
        previous=current;current=following; // @step move
    }
    ListNode* old_head=group_previous->next; // @step old
    group_previous->next=kth; // @step front
    group_previous=old_head; // @step nextGroup
}`,
	},
);
