import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"kthSmallest",
	[
		["root", "tree"],
		["k", "int"],
	],
	"int",
	{
		python: `# 搜索树中序遍历按升序输出。栈模拟左、根、右顺序，访问第 k 个节点时提前返回，无需排序。
stack, node = [], root # @step init
while stack or node: # @step loop
    while node: # @step descend
        stack.append(node) # @step push
        node = node.left # @step left
    node = stack.pop() # @step pop
    k -= 1 # @step count
    if k == 0: # @step check
        return node.val # @step hit
    node = node.right # @step right
raise ValueError('k 超出节点数量') # @step result`,
		javascript: `// 搜索树中序遍历按升序输出。栈模拟左、根、右顺序，访问第 k 个节点时提前返回，无需排序。
const stack=[];let node=root; // @step init
while (stack.length || node) { // @step loop
    while (node) { // @step descend
        stack.push(node); // @step push
        node=node.left; // @step left
    }
    node=stack.pop(); // @step pop
    k--; // @step count
    if (k===0) { // @step check
        return node.val; // @step hit
    }
    node=node.right; // @step right
}
throw new Error('k 超出节点数量'); // @step result`,
		java: `// 搜索树中序遍历按升序输出。栈模拟左、根、右顺序，访问第 k 个节点时提前返回，无需排序。
Deque<TreeNode> stack=new ArrayDeque<>();TreeNode node=root; // @step init
while (!stack.isEmpty() || node!=null) { // @step loop
    while (node!=null) { // @step descend
        stack.push(node); // @step push
        node=node.left; // @step left
    }
    node=stack.pop(); // @step pop
    k--; // @step count
    if (k==0) { // @step check
        return node.val; // @step hit
    }
    node=node.right; // @step right
}
throw new IllegalArgumentException("k 超出节点数量"); // @step result`,
		cpp: `// 搜索树中序遍历按升序输出。栈模拟左、根、右顺序，访问第 k 个节点时提前返回，无需排序。
vector<TreeNode*> stack;TreeNode* node=root; // @step init
while (!stack.empty() || node) { // @step loop
    while (node) { // @step descend
        stack.push_back(node); // @step push
        node=node->left; // @step left
    }
    node=stack.back();stack.pop_back(); // @step pop
    k--; // @step count
    if (k==0) { // @step check
        return node->val; // @step hit
    }
    node=node->right; // @step right
}
return -1; // @step result`,
	},
);
