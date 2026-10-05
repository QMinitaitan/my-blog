import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"diameterOfBinaryTree",
	[["root", "tree"]],
	"int",
	{
		python: `# 每个节点比较“左侧高度 + 右侧高度”。向父节点返回单侧高度，整条路径长度保存在全局 answer 中；两者含义不同。
answer = 0 # @step init
def height(node):
    nonlocal answer
    if node is None: # @step empty
        return 0 # @step nil
    left = height(node.left) # @step left
    right = height(node.right) # @step right
    answer = max(answer, left + right) # @step update
    return max(left, right) + 1 # @step height
height(root) # @step start
return answer # @step result`,
		javascript: `// 每个节点比较“左侧高度 + 右侧高度”。向父节点返回单侧高度，整条路径长度保存在全局 answer 中；两者含义不同。
let answer=0; // @step init
function height(node) {
    if (node===null) { // @step empty
        return 0; // @step nil
    }
    const left=height(node.left); // @step left
    const right=height(node.right); // @step right
    answer=Math.max(answer,left+right); // @step update
    return Math.max(left,right)+1; // @step height
}
height(root); // @step start
return answer; // @step result`,
		java: `// 每个节点比较“左侧高度 + 右侧高度”。向父节点返回单侧高度，整条路径长度保存在全局 answer 中；两者含义不同。
answer=0; // @step init
height(root); // @step start
return answer; // @step result`,
		javaHelpers: `private int answer;
private int height(TreeNode node) {
    if (node==null) { // @step empty
        return 0; // @step nil
    }
    int left=height(node.left); // @step left
    int right=height(node.right); // @step right
    answer=Math.max(answer,left+right); // @step update
    return Math.max(left,right)+1; // @step height
}`,
		cpp: `// 每个节点比较“左侧高度 + 右侧高度”。向父节点返回单侧高度，整条路径长度保存在全局 answer 中；两者含义不同。
int answer=0; // @step init
function<int(TreeNode*)> height = [&](TreeNode* node) -> int {
    if (node==nullptr) { // @step empty
        return 0; // @step nil
    }
    int left=height(node->left); // @step left
    int right=height(node->right); // @step right
    answer=max(answer,left+right); // @step update
    return max(left,right)+1; // @step height
};
height(root); // @step start
return answer; // @step result`,
	},
);
