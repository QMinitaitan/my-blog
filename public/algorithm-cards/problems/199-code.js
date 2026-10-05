import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"rightSideView",
	[["root", "tree"]],
	"intList",
	{
		python: `# 层序遍历从左到右出队，每层最后一个就是可见节点。右子树缺少更深节点时，左子树也可能出现在右视图。
from collections import deque
if root is None: # @step empty
    return [] # @step fail
queue, answer = deque([root]), [] # @step init
while queue: # @step loop
    size = len(queue) # @step size
    for i in range(size): # @step scan
        node = queue.popleft() # @step pop
        if i == size - 1: # @step last
            answer.append(node.val) # @step collect
        if node.left: # @step left
            queue.append(node.left) # @step pushLeft
        if node.right: # @step right
            queue.append(node.right) # @step pushRight
return answer # @step result`,
		javascript: `// 层序遍历从左到右出队，每层最后一个就是可见节点。右子树缺少更深节点时，左子树也可能出现在右视图。
if (root===null) { // @step empty
    return []; // @step fail
}
const queue=[root],answer=[];let head=0; // @step init
while (head<queue.length) { // @step loop
    const size=queue.length-head; // @step size
    for (let i=0;i<size;i++) { // @step scan
        const node=queue[head++]; // @step pop
        if (i===size-1) { // @step last
            answer.push(node.val); // @step collect
        }
        if (node.left) { // @step left
            queue.push(node.left); // @step pushLeft
        }
        if (node.right) { // @step right
            queue.push(node.right); // @step pushRight
        }
    }
}
return answer; // @step result`,
		java: `// 层序遍历从左到右出队，每层最后一个就是可见节点。右子树缺少更深节点时，左子树也可能出现在右视图。
if (root==null) { // @step empty
    return new ArrayList<>(); // @step fail
}
Deque<TreeNode> queue=new ArrayDeque<>();queue.add(root);List<Integer> answer=new ArrayList<>(); // @step init
while (!queue.isEmpty()) { // @step loop
    int size=queue.size(); // @step size
    for (int i=0;i<size;i++) { // @step scan
        TreeNode node=queue.remove(); // @step pop
        if (i==size-1) { // @step last
            answer.add(node.val); // @step collect
        }
        if (node.left!=null) { // @step left
            queue.add(node.left); // @step pushLeft
        }
        if (node.right!=null) { // @step right
            queue.add(node.right); // @step pushRight
        }
    }
}
return answer; // @step result`,
		cpp: `// 层序遍历从左到右出队，每层最后一个就是可见节点。右子树缺少更深节点时，左子树也可能出现在右视图。
if (root==nullptr) { // @step empty
    return {}; // @step fail
}
queue<TreeNode*> pending;pending.push(root);vector<int> answer; // @step init
while (!pending.empty()) { // @step loop
    int size=pending.size(); // @step size
    for (int i=0;i<size;i++) { // @step scan
        TreeNode* node=pending.front();pending.pop(); // @step pop
        if (i==size-1) { // @step last
            answer.push_back(node->val); // @step collect
        }
        if (node->left) { // @step left
            pending.push(node->left); // @step pushLeft
        }
        if (node->right) { // @step right
            pending.push(node->right); // @step pushRight
        }
    }
}
return answer; // @step result`,
	},
);
