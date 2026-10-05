import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"lowestCommonAncestor",
	[
		["root", "tree"],
		["p", "tree"],
		["q", "tree"],
	],
	"tree",
	{
		python: `# 遇到目标直接返回。左右各返回一个非空结果时，当前节点把两条查找路径汇合起来；只有一侧非空，就把那一侧结果继续向上交给父节点。
if root is None or root is p or root is q: # @step base
    return root # @step direct
left = self.lowestCommonAncestor(root.left, p, q) # @step left
right = self.lowestCommonAncestor(root.right, p, q) # @step right
if left and right: # @step both
    return root # @step ancestor
return left or right # @step result`,
		javascript: `// 遇到目标直接返回。左右各返回一个非空结果时，当前节点把两条查找路径汇合起来；只有一侧非空，就把那一侧结果继续向上交给父节点。
if(root===null||root===p||root===q){ // @step base
    return root; // @step direct
}
const left=lowestCommonAncestor(root.left,p,q); // @step left
const right=lowestCommonAncestor(root.right,p,q); // @step right
if(left&&right){ // @step both
    return root; // @step ancestor
}
return left||right; // @step result`,
		java: `// 遇到目标直接返回。左右各返回一个非空结果时，当前节点把两条查找路径汇合起来；只有一侧非空，就把那一侧结果继续向上交给父节点。
if(root==null||root==p||root==q){ // @step base
    return root; // @step direct
}
TreeNode left=lowestCommonAncestor(root.left,p,q); // @step left
TreeNode right=lowestCommonAncestor(root.right,p,q); // @step right
if(left!=null&&right!=null){ // @step both
    return root; // @step ancestor
}
return left!=null?left:right; // @step result`,
		cpp: `// 遇到目标直接返回。左右各返回一个非空结果时，当前节点把两条查找路径汇合起来；只有一侧非空，就把那一侧结果继续向上交给父节点。
if(!root||root==p||root==q){ // @step base
    return root; // @step direct
}
TreeNode* left=lowestCommonAncestor(root->left,p,q); // @step left
TreeNode* right=lowestCommonAncestor(root->right,p,q); // @step right
if(left&&right){ // @step both
    return root; // @step ancestor
}
return left?left:right; // @step result`,
	},
).map((c) => ({
	...c,
	targetValueArgs: ["p", "q"],
	resultMode: "treeNodeValue",
}));
