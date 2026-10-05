import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"addTwoNumbers",
	[
		["l1", "listNode"],
		["l2", "listNode"],
	],
	"listNode",
	{
		python: `# 像竖式加法，每次相加当前两位和 carry。total%10 留在本位，total//10 传给下一位；输入结束但仍有进位时继续。
dummy, carry = ListNode(0), 0 # @step init
tail = dummy
while l1 or l2 or carry: # @step check
    x = l1.val if l1 else 0 # @step x
    y = l2.val if l2 else 0 # @step y
    total = x + y + carry # @step sum
    carry = total // 10 # @step carry
    tail.next = ListNode(total % 10) # @step create
    tail = tail.next # @step tail
    if l1: # @step leftCheck
        l1 = l1.next # @step left
    if l2: # @step rightCheck
        l2 = l2.next # @step right
return dummy.next # @step result`,
		javascript: `// 像竖式加法，每次相加当前两位和 carry。total%10 留在本位，total//10 传给下一位；输入结束但仍有进位时继续。
const dummy=new ListNode(0);let tail=dummy,carry=0; // @step init
while (l1 || l2 || carry) { // @step check
    const x=l1?l1.val:0; // @step x
    const y=l2?l2.val:0; // @step y
    const total=x+y+carry; // @step sum
    carry=Math.floor(total/10); // @step carry
    tail.next=new ListNode(total%10); // @step create
    tail=tail.next; // @step tail
    if (l1) { // @step leftCheck
        l1=l1.next; // @step left
    }
    if (l2) { // @step rightCheck
        l2=l2.next; // @step right
    }
}
return dummy.next; // @step result`,
		java: `// 像竖式加法，每次相加当前两位和 carry。total%10 留在本位，total//10 传给下一位；输入结束但仍有进位时继续。
ListNode dummy=new ListNode(0),tail=dummy;int carry=0; // @step init
while (l1!=null || l2!=null || carry!=0) { // @step check
    int x=l1!=null?l1.val:0; // @step x
    int y=l2!=null?l2.val:0; // @step y
    int total=x+y+carry; // @step sum
    carry=total/10; // @step carry
    tail.next=new ListNode(total%10); // @step create
    tail=tail.next; // @step tail
    if (l1!=null) { // @step leftCheck
        l1=l1.next; // @step left
    }
    if (l2!=null) { // @step rightCheck
        l2=l2.next; // @step right
    }
}
return dummy.next; // @step result`,
		cpp: `// 像竖式加法，每次相加当前两位和 carry。total%10 留在本位，total//10 传给下一位；输入结束但仍有进位时继续。
ListNode dummy(0);ListNode* tail=&dummy;int carry=0; // @step init
while (l1 || l2 || carry) { // @step check
    int x=l1?l1->val:0; // @step x
    int y=l2?l2->val:0; // @step y
    int total=x+y+carry; // @step sum
    carry=total/10; // @step carry
    tail->next=new ListNode(total%10); // @step create
    tail=tail->next; // @step tail
    if (l1) { // @step leftCheck
        l1=l1->next; // @step left
    }
    if (l2) { // @step rightCheck
        l2=l2->next; // @step right
    }
}
return dummy.next; // @step result`,
	},
);
