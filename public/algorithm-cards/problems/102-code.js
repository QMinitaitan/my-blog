import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"levelOrder",
	[["root", "tree"]],
	"intLists",
	{
		python: `# 队列记录待访问节点。每层开始先固定 size，避免把刚加入的下一层节点混进本层。
from collections import deque
if root is None: # @step empty
    return [] # @step fail
queue = deque([root]) # @step init
answer = []
while queue: # @step loop
    size = len(queue) # @step size
    level = []
    for _ in range(size): # @step scan
        node = queue.popleft() # @step pop
        level.append(node.val) # @step collect
        if node.left: # @step left
            queue.append(node.left) # @step pushLeft
        if node.right: # @step right
            queue.append(node.right) # @step pushRight
    answer.append(level) # @step level
return answer # @step result`,
		javascript: `// 队列记录待访问节点。每层开始先固定 size，避免把刚加入的下一层节点混进本层。
if (root===null) { // @step empty
    return []; // @step fail
}
const queue=[root],answer=[];let head=0; // @step init
while (head<queue.length) { // @step loop
    const size=queue.length-head,level=[]; // @step size
    for (let count=0;count<size;count++) { // @step scan
        const node=queue[head++]; // @step pop
        level.push(node.val); // @step collect
        if (node.left) { // @step left
            queue.push(node.left); // @step pushLeft
        }
        if (node.right) { // @step right
            queue.push(node.right); // @step pushRight
        }
    }
    answer.push(level); // @step level
}
return answer; // @step result`,
		java: `// 队列记录待访问节点。每层开始先固定 size，避免把刚加入的下一层节点混进本层。
if (root==null) { // @step empty
    return new ArrayList<>(); // @step fail
}
Deque<TreeNode> queue=new ArrayDeque<>();queue.add(root);List<List<Integer>> answer=new ArrayList<>(); // @step init
while (!queue.isEmpty()) { // @step loop
    int size=queue.size();List<Integer> level=new ArrayList<>(); // @step size
    for (int count=0;count<size;count++) { // @step scan
        TreeNode node=queue.remove(); // @step pop
        level.add(node.val); // @step collect
        if (node.left!=null) { // @step left
            queue.add(node.left); // @step pushLeft
        }
        if (node.right!=null) { // @step right
            queue.add(node.right); // @step pushRight
        }
    }
    answer.add(level); // @step level
}
return answer; // @step result`,
		cpp: `// 队列记录待访问节点。每层开始先固定 size，避免把刚加入的下一层节点混进本层。
if (root==nullptr) { // @step empty
    return {}; // @step fail
}
queue<TreeNode*> pending;pending.push(root);vector<vector<int>> answer; // @step init
while (!pending.empty()) { // @step loop
    int size=pending.size();vector<int> level; // @step size
    for (int count=0;count<size;count++) { // @step scan
        TreeNode* node=pending.front();pending.pop(); // @step pop
        level.push_back(node->val); // @step collect
        if (node->left) { // @step left
            pending.push(node->left); // @step pushLeft
        }
        if (node->right) { // @step right
            pending.push(node->right); // @step pushRight
        }
    }
    answer.push_back(level); // @step level
}
return answer; // @step result`,
	},
);
