import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("hasCycle", [["head", "listNode"]], "bool", {
	python: `# 慢指针每次一步，快指针每次两步。无环时快指针到达空指针；有环时快指针在环内追上慢指针。
slow = fast = head # @step init
while fast and fast.next: # @step loop
    slow = slow.next # @step slow
    fast = fast.next.next # @step fast
    if slow is fast: # @step match
        return True # @step hit
return False # @step result`,
	javascript: `// 慢指针每次一步，快指针每次两步。无环时快指针到达空指针；有环时快指针在环内追上慢指针。
let slow=head,fast=head; // @step init
while (fast && fast.next) { // @step loop
    slow=slow.next; // @step slow
    fast=fast.next.next; // @step fast
    if (slow===fast) { // @step match
        return true; // @step hit
    }
}
return false; // @step result`,
	java: `// 慢指针每次一步，快指针每次两步。无环时快指针到达空指针；有环时快指针在环内追上慢指针。
ListNode slow=head,fast=head; // @step init
while (fast!=null && fast.next!=null) { // @step loop
    slow=slow.next; // @step slow
    fast=fast.next.next; // @step fast
    if (slow==fast) { // @step match
        return true; // @step hit
    }
}
return false; // @step result`,
	cpp: `// 慢指针每次一步，快指针每次两步。无环时快指针到达空指针；有环时快指针在环内追上慢指针。
ListNode* slow=head;ListNode* fast=head; // @step init
while (fast && fast->next) { // @step loop
    slow=slow->next; // @step slow
    fast=fast->next->next; // @step fast
    if (slow==fast) { // @step match
        return true; // @step hit
    }
}
return false; // @step result`,
});
