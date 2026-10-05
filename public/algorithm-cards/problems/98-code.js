import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("isValidBST", [["root", "tree"]], "bool", {
	python: `# 搜索树的中序序列严格递增。用栈按左、根、右访问，与 previous 比较就同时检查了所有祖先范围。
stack, node, previous = [], root, None # @step init
while stack or node: # @step loop
    while node: # @step descend
        stack.append(node) # @step push
        node = node.left # @step left
    node = stack.pop() # @step pop
    if previous is not None and node.val <= previous: # @step check
        return False # @step fail
    previous = node.val # @step update
    node = node.right # @step right
return True # @step result`,
	javascript: `// 搜索树的中序序列严格递增。用栈按左、根、右访问，与 previous 比较就同时检查了所有祖先范围。
const stack=[];let node=root,previous=null; // @step init
while (stack.length || node) { // @step loop
    while (node) { // @step descend
        stack.push(node); // @step push
        node=node.left; // @step left
    }
    node=stack.pop(); // @step pop
    if (previous!==null && node.val<=previous) { // @step check
        return false; // @step fail
    }
    previous=node.val; // @step update
    node=node.right; // @step right
}
return true; // @step result`,
	java: `// 搜索树的中序序列严格递增。用栈按左、根、右访问，与 previous 比较就同时检查了所有祖先范围。
Deque<TreeNode> stack=new ArrayDeque<>();TreeNode node=root;Long previous=null; // @step init
while (!stack.isEmpty() || node!=null) { // @step loop
    while (node!=null) { // @step descend
        stack.push(node); // @step push
        node=node.left; // @step left
    }
    node=stack.pop(); // @step pop
    if (previous!=null && node.val<=previous) { // @step check
        return false; // @step fail
    }
    previous=(long)node.val; // @step update
    node=node.right; // @step right
}
return true; // @step result`,
	cpp: `// 搜索树的中序序列严格递增。用栈按左、根、右访问，与 previous 比较就同时检查了所有祖先范围。
vector<TreeNode*> stack;TreeNode* node=root;optional<int> previous; // @step init
while (!stack.empty() || node) { // @step loop
    while (node) { // @step descend
        stack.push_back(node); // @step push
        node=node->left; // @step left
    }
    node=stack.back();stack.pop_back(); // @step pop
    if (previous.has_value() && node->val<=*previous) { // @step check
        return false; // @step fail
    }
    previous=node->val; // @step update
    node=node->right; // @step right
}
return true; // @step result`,
});
