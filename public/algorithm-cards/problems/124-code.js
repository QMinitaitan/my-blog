import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("maxPathSum", [["root", "tree"]], "int", {
	python: `# 每个节点比较“左侧可接贡献 + 右侧可接贡献”。向父节点返回单侧贡献（负贡献取 0），整条路径长度保存在全局 answer 中；两者含义不同。
answer = float("-inf") # @step init
def height(node):
    nonlocal answer
    if node is None: # @step empty
        return 0 # @step nil
    left = max(0, height(node.left)) # @step left
    right = max(0, height(node.right)) # @step right
    answer = max(answer, node.val + left + right) # @step update
    return node.val + max(left, right) # @step height
height(root) # @step start
return answer # @step result`,
	javascript: `// 每个节点比较“左侧可接贡献 + 右侧可接贡献”。向父节点返回单侧贡献（负贡献取 0），整条路径长度保存在全局 answer 中；两者含义不同。
let answer=-Infinity; // @step init
function height(node) {
    if (node===null) { // @step empty
        return 0; // @step nil
    }
    const left=Math.max(0,height(node.left)); // @step left
    const right=Math.max(0,height(node.right)); // @step right
    answer=Math.max(answer,node.val+left+right); // @step update
    return node.val+Math.max(left,right); // @step height
}
height(root); // @step start
return answer; // @step result`,
	java: `// 每个节点比较“左侧可接贡献 + 右侧可接贡献”。向父节点返回单侧贡献（负贡献取 0），整条路径长度保存在全局 answer 中；两者含义不同。
answer=Integer.MIN_VALUE; // @step init
height(root); // @step start
return answer; // @step result`,
	javaHelpers: `private int answer;
private int height(TreeNode node) {
    if (node==null) { // @step empty
        return 0; // @step nil
    }
    int left=Math.max(0,height(node.left)); // @step left
    int right=Math.max(0,height(node.right)); // @step right
    answer=Math.max(answer,node.val+left+right); // @step update
    return node.val+Math.max(left,right); // @step height
}`,
	cpp: `// 每个节点比较“左侧可接贡献 + 右侧可接贡献”。向父节点返回单侧贡献（负贡献取 0），整条路径长度保存在全局 answer 中；两者含义不同。
int answer=INT_MIN; // @step init
function<int(TreeNode*)> height = [&](TreeNode* node) -> int {
    if (node==nullptr) { // @step empty
        return 0; // @step nil
    }
    int left=max(0,height(node->left)); // @step left
    int right=max(0,height(node->right)); // @step right
    answer=max(answer,node->val+left+right); // @step update
    return node->val+max(left,right); // @step height
};
height(root); // @step start
return answer; // @step result`,
});
