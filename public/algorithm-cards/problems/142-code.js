import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"detectCycle",
	[["head", "listNode"]],
	"listNode",
	{
		python: `# 设头到入口距离 a，入口到相遇点 b，环长 L。相遇时 a+b 是 L 的整数倍；因此从头和相遇点各走 a 步，会在入口相遇。
slow = fast = head # @step init
while fast and fast.next: # @step loop
    slow = slow.next # @step slow
    fast = fast.next.next # @step fast
    if slow is fast: # @step match
        finder = head # @step finder
        while finder is not slow: # @step search
            finder = finder.next # @step findMove
            slow = slow.next # @step slowMove
        return finder # @step hit
return None # @step result`,
		javascript: `// 设头到入口距离 a，入口到相遇点 b，环长 L。相遇时 a+b 是 L 的整数倍；因此从头和相遇点各走 a 步，会在入口相遇。
let slow=head,fast=head; // @step init
while (fast && fast.next) { // @step loop
    slow=slow.next; // @step slow
    fast=fast.next.next; // @step fast
    if (slow===fast) { // @step match
        let finder=head; // @step finder
        while (finder!==slow) { // @step search
            finder=finder.next; // @step findMove
            slow=slow.next; // @step slowMove
        }
        return finder; // @step hit
    }
}
return null; // @step result`,
		java: `// 设头到入口距离 a，入口到相遇点 b，环长 L。相遇时 a+b 是 L 的整数倍；因此从头和相遇点各走 a 步，会在入口相遇。
ListNode slow=head,fast=head; // @step init
while (fast!=null && fast.next!=null) { // @step loop
    slow=slow.next; // @step slow
    fast=fast.next.next; // @step fast
    if (slow==fast) { // @step match
        ListNode finder=head; // @step finder
        while (finder!=slow) { // @step search
            finder=finder.next; // @step findMove
            slow=slow.next; // @step slowMove
        }
        return finder; // @step hit
    }
}
return null; // @step result`,
		cpp: `// 设头到入口距离 a，入口到相遇点 b，环长 L。相遇时 a+b 是 L 的整数倍；因此从头和相遇点各走 a 步，会在入口相遇。
ListNode* slow=head;ListNode* fast=head; // @step init
while (fast && fast->next) { // @step loop
    slow=slow->next; // @step slow
    fast=fast->next->next; // @step fast
    if (slow==fast) { // @step match
        ListNode* finder=head; // @step finder
        while (finder!=slow) { // @step search
            finder=finder->next; // @step findMove
            slow=slow->next; // @step slowMove
        }
        return finder; // @step hit
    }
}
return nullptr; // @step result`,
	},
).map((code) => ({ ...code, resultMode: "nodeIdentity" }));
