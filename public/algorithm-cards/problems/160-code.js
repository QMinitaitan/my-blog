import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"getIntersectionNode",
	[
		["headA", "listNode"],
		["headB", "listNode"],
	],
	"listNode",
	{
		python: `# a 走 A 后再走 B，b 走 B 后再走 A，两者经过相同总长度，消除前缀差。相同值不代表相交，画面使用不同节点编号区分身份。
a, b = headA, headB # @step init
while a is not b: # @step check
    a = a.next if a else headB # @step a
    b = b.next if b else headA # @step b
return a # @step result`,
		javascript: `// a 走 A 后再走 B，b 走 B 后再走 A，两者经过相同总长度，消除前缀差。相同值不代表相交，画面使用不同节点编号区分身份。
let a=headA,b=headB; // @step init
while (a!==b) { // @step check
    a=a?a.next:headB; // @step a
    b=b?b.next:headA; // @step b
}
return a; // @step result`,
		java: `// a 走 A 后再走 B，b 走 B 后再走 A，两者经过相同总长度，消除前缀差。相同值不代表相交，画面使用不同节点编号区分身份。
ListNode a=headA,b=headB; // @step init
while (a!=b) { // @step check
    a=a!=null?a.next:headB; // @step a
    b=b!=null?b.next:headA; // @step b
}
return a; // @step result`,
		cpp: `// a 走 A 后再走 B，b 走 B 后再走 A，两者经过相同总长度，消除前缀差。相同值不代表相交，画面使用不同节点编号区分身份。
ListNode* a=headA;ListNode* b=headB; // @step init
while (a!=b) { // @step check
    a=a?a->next:headB; // @step a
    b=b?b->next:headA; // @step b
}
return a; // @step result`,
	},
).map((code) => ({ ...code, resultMode: "nodeIdentity" }));
