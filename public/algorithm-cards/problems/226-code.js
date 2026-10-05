import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("invertTree", [["root", "tree"]], "tree", {
	python: `# 例如根 4 的孩子 2、7 先交换，再分别处理 7 和 2 的孩子。递归遇到空节点时直接返回。
if root is None: # @step empty
    return None # @step nil
root.left, root.right = root.right, root.left # @step swap
self.invertTree(root.left) # @step left
self.invertTree(root.right) # @step right
return root # @step result`,
	javascript: `// 例如根 4 的孩子 2、7 先交换，再分别处理 7 和 2 的孩子。递归遇到空节点时直接返回。
if (root===null) { // @step empty
    return null; // @step nil
}
[root.left,root.right]=[root.right,root.left]; // @step swap
invertTree(root.left); // @step left
invertTree(root.right); // @step right
return root; // @step result`,
	java: `// 例如根 4 的孩子 2、7 先交换，再分别处理 7 和 2 的孩子。递归遇到空节点时直接返回。
if (root==null) { // @step empty
    return null; // @step nil
}
TreeNode tmp=root.left;root.left=root.right;root.right=tmp; // @step swap
invertTree(root.left); // @step left
invertTree(root.right); // @step right
return root; // @step result`,
	cpp: `// 例如根 4 的孩子 2、7 先交换，再分别处理 7 和 2 的孩子。递归遇到空节点时直接返回。
if (root==nullptr) { // @step empty
    return nullptr; // @step nil
}
swap(root->left,root->right); // @step swap
invertTree(root->left); // @step left
invertTree(root->right); // @step right
return root; // @step result`,
});
