import { solutionCodes } from "../shared/solution-code.js";
import { mergeListCode as merge } from "../shared/merge-list-code.js";
export const codes = solutionCodes(
	"sortList",
	[["head", "listNode"]],
	"listNode",
	{
		python: `# 快慢指针拆成两半，递归排序后合并。例如 4→2 和 1→3 排成 2→4、1→3，再逐个连接得到 1→2→3→4。
${merge.python}
if head is None or head.next is None: # @step base
    return head # @step direct
slow, fast = head, head.next # @step bounds
while fast and fast.next: # @step loop
    slow, fast = slow.next, fast.next.next # @step move
middle = slow.next # @step middle
slow.next = None # @step split
left = self.sortList(head) # @step left
right = self.sortList(middle) # @step right
return merge(left, right) # @step result`,
		javascript: `// 快慢指针拆成两半，递归排序后合并。例如 4→2 和 1→3 排成 2→4、1→3，再逐个连接得到 1→2→3→4。
${merge.javascript}
if(head===null||head.next===null){ // @step base
    return head; // @step direct
}
let slow=head,fast=head.next; // @step bounds
while(fast&&fast.next){ // @step loop
    slow=slow.next;fast=fast.next.next; // @step move
}
const middle=slow.next; // @step middle
slow.next=null; // @step split
const left=sortList(head); // @step left
const right=sortList(middle); // @step right
return merge(left,right); // @step result`,
		java: `// 快慢指针拆成两半，递归排序后合并。例如 4→2 和 1→3 排成 2→4、1→3，再逐个连接得到 1→2→3→4。
if(head==null||head.next==null){ // @step base
    return head; // @step direct
}
ListNode slow=head,fast=head.next; // @step bounds
while(fast!=null&&fast.next!=null){ // @step loop
    slow=slow.next;fast=fast.next.next; // @step move
}
ListNode middle=slow.next; // @step middle
slow.next=null; // @step split
ListNode left=sortList(head); // @step left
ListNode right=sortList(middle); // @step right
return merge(left,right); // @step result`,
		javaHelpers: merge.java,
		cpp: `// 快慢指针拆成两半，递归排序后合并。例如 4→2 和 1→3 排成 2→4、1→3，再逐个连接得到 1→2→3→4。
${merge.cpp}
if(!head||!head->next){ // @step base
    return head; // @step direct
}
ListNode* slow=head;ListNode* fast=head->next; // @step bounds
while(fast&&fast->next){ // @step loop
    slow=slow->next;fast=fast->next->next; // @step move
}
ListNode* middle=slow->next; // @step middle
slow->next=nullptr; // @step split
ListNode* left=sortList(head); // @step left
ListNode* right=sortList(middle); // @step right
return merge(left,right); // @step result`,
	},
);
