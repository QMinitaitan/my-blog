import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("maxDepth", [["root", "tree"]], "int", {
	python: `# 每次递归求出左右子树深度，选较大的一个，再加上当前根节点这一层。
if root is None: # @step check
    return 0 # @step empty
left = self.maxDepth(root.left) # @step left
right = self.maxDepth(root.right) # @step right
return 1 + max(left, right) # @step result`,
	javascript: `// 每次递归求出左右子树深度，选较大的一个，再加上当前根节点这一层。
if (root === null) { // @step check
    return 0; // @step empty
}
const left = maxDepth(root.left); // @step left
const right = maxDepth(root.right); // @step right
return 1 + Math.max(left, right); // @step result`,
	java: `// 每次递归求出左右子树深度，选较大的一个，再加上当前根节点这一层。
if (root == null) { // @step check
    return 0; // @step empty
}
int left = maxDepth(root.left); // @step left
int right = maxDepth(root.right); // @step right
return 1 + Math.max(left, right); // @step result`,
	cpp: `// 每次递归求出左右子树深度，选较大的一个，再加上当前根节点这一层。
if (root == nullptr) { // @step check
    return 0; // @step empty
}
int left = maxDepth(root->left); // @step left
int right = maxDepth(root->right); // @step right
return 1 + max(left, right); // @step result`,
});
