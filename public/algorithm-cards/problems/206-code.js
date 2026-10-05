import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"reverseList",
	[["head", "listNode"]],
	"listNode",
	{
		python: `# 每次维护已反转部分和未处理部分。先保存 following，改 next，再移动 previous、current；四步顺序不可交换。
previous, current = None, head # @step init
while current: # @step check
    following = current.next # @step save
    current.next = previous # @step link
    previous = current # @step previous
    current = following # @step current
return previous # @step result`,
		javascript: `// 每次维护已反转部分和未处理部分。先保存 following，改 next，再移动 previous、current；四步顺序不可交换。
let previous=null,current=head; // @step init
while (current) { // @step check
    const following=current.next; // @step save
    current.next=previous; // @step link
    previous=current; // @step previous
    current=following; // @step current
}
return previous; // @step result`,
		java: `// 每次维护已反转部分和未处理部分。先保存 following，改 next，再移动 previous、current；四步顺序不可交换。
ListNode previous=null,current=head; // @step init
while (current!=null) { // @step check
    ListNode following=current.next; // @step save
    current.next=previous; // @step link
    previous=current; // @step previous
    current=following; // @step current
}
return previous; // @step result`,
		cpp: `// 每次维护已反转部分和未处理部分。先保存 following，改 next，再移动 previous、current；四步顺序不可交换。
ListNode* previous=nullptr;ListNode* current=head; // @step init
while (current) { // @step check
    ListNode* following=current->next; // @step save
    current->next=previous; // @step link
    previous=current; // @step previous
    current=following; // @step current
}
return previous; // @step result`,
	},
);
