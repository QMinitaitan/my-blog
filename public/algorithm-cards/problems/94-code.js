import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"inorderTraversal",
	[["root", "tree"]],
	"intList",
	{
		python: `# 用栈保存暂时等待的节点，先走到最左，弹出访问后再去右子树。
stack = [] # @step init
answer = [] # @step answer
node = root # @step root
while node is not None or stack: # @step outer
    while node is not None: # @step inner
        stack.append(node) # @step push
        node = node.left # @step left
    node = stack.pop() # @step pop
    answer.append(node.val) # @step visit
    node = node.right # @step right
return answer # @step result`,
		javascript: `// 用栈保存暂时等待的节点，先走到最左，弹出访问后再去右子树。
const stack = []; // @step init
const answer = []; // @step answer
let node = root; // @step root
while (node !== null || stack.length) { // @step outer
    while (node !== null) { // @step inner
        stack.push(node); // @step push
        node = node.left; // @step left
    }
    node = stack.pop(); // @step pop
    answer.push(node.val); // @step visit
    node = node.right; // @step right
}
return answer; // @step result`,
		java: `// 用栈保存暂时等待的节点，先走到最左，弹出访问后再去右子树。
Deque<TreeNode> stack = new ArrayDeque<>(); // @step init
List<Integer> answer = new ArrayList<>(); // @step answer
TreeNode node = root; // @step root
while (node != null || !stack.isEmpty()) { // @step outer
    while (node != null) { // @step inner
        stack.push(node); // @step push
        node = node.left; // @step left
    }
    node = stack.pop(); // @step pop
    answer.add(node.val); // @step visit
    node = node.right; // @step right
}
return answer; // @step result`,
		cpp: `// 用栈保存暂时等待的节点，先走到最左，弹出访问后再去右子树。
std::stack<TreeNode*> stack; // @step init
vector<int> answer; // @step answer
TreeNode* node = root; // @step root
while (node != nullptr || !stack.empty()) { // @step outer
    while (node != nullptr) { // @step inner
        stack.push(node); // @step push
        node = node->left; // @step left
    }
    node = stack.top(); stack.pop(); // @step pop
    answer.push_back(node->val); // @step visit
    node = node->right; // @step right
}
return answer; // @step result`,
	},
);
