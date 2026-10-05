import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"isPalindrome",
	[["head", "listNode"]],
	"bool",
	{
		python: `# 教学版先把值存入 values，再用左右下标比较。它使用 O(n) 额外空间；题目的 O(1) 空间进阶可通过反转后半段实现。
values = [] # @step init
current = head
while current: # @step scan
    values.append(current.val) # @step collect
    current = current.next # @step next
left, right = 0, len(values) - 1 # @step ends
while left < right: # @step loop
    if values[left] != values[right]: # @step compare
        return False # @step fail
    left += 1
    right -= 1 # @step move
return True # @step result`,
		javascript: `// 教学版先把值存入 values，再用左右下标比较。它使用 O(n) 额外空间；题目的 O(1) 空间进阶可通过反转后半段实现。
const values=[];let current=head; // @step init
while (current) { // @step scan
    values.push(current.val); // @step collect
    current=current.next; // @step next
}
let left=0,right=values.length-1; // @step ends
while (left<right) { // @step loop
    if (values[left]!==values[right]) { // @step compare
        return false; // @step fail
    }
    left++;right--; // @step move
}
return true; // @step result`,
		java: `// 教学版先把值存入 values，再用左右下标比较。它使用 O(n) 额外空间；题目的 O(1) 空间进阶可通过反转后半段实现。
List<Integer> values=new ArrayList<>();ListNode current=head; // @step init
while (current!=null) { // @step scan
    values.add(current.val); // @step collect
    current=current.next; // @step next
}
int left=0,right=values.size()-1; // @step ends
while (left<right) { // @step loop
    if (!values.get(left).equals(values.get(right))) { // @step compare
        return false; // @step fail
    }
    left++;right--; // @step move
}
return true; // @step result`,
		cpp: `// 教学版先把值存入 values，再用左右下标比较。它使用 O(n) 额外空间；题目的 O(1) 空间进阶可通过反转后半段实现。
vector<int> values;ListNode* current=head; // @step init
while (current) { // @step scan
    values.push_back(current->val); // @step collect
    current=current->next; // @step next
}
int left=0,right=(int)values.size()-1; // @step ends
while (left<right) { // @step loop
    if (values[left]!=values[right]) { // @step compare
        return false; // @step fail
    }
    left++;right--; // @step move
}
return true; // @step result`,
	},
);
