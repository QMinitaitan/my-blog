import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"sortedArrayToBST",
	[["nums", "ints"]],
	"tree",
	{
		python: `# 中点作根，较小数在左半区，较大数在右半区。每次按中点分割，区间长度大致减半。
def build(left, right):
    if left > right: # @step empty
        return None # @step nil
    middle = (left + right) // 2 # @step middle
    node = TreeNode(nums[middle]) # @step node
    node.left = build(left, middle - 1) # @step left
    node.right = build(middle + 1, right) # @step right
    return node # @step result
return build(0, len(nums) - 1) # @step start`,
		javascript: `// 中点作根，较小数在左半区，较大数在右半区。每次按中点分割，区间长度大致减半。
function build(left,right){
    if(left>right){ // @step empty
        return null; // @step nil
    }
    const middle=Math.floor((left+right)/2); // @step middle
    const node=new TreeNode(nums[middle]); // @step node
    node.left=build(left,middle-1); // @step left
    node.right=build(middle+1,right); // @step right
    return node; // @step result
}
return build(0,nums.length-1); // @step start`,
		java: `// 中点作根，较小数在左半区，较大数在右半区。每次按中点分割，区间长度大致减半。
return build(nums,0,nums.length-1); // @step start`,
		javaHelpers: `private TreeNode build(int[] nums,int left,int right){
    if(left>right){ // @step empty
        return null; // @step nil
    }
    int middle=left+(right-left)/2; // @step middle
    TreeNode node=new TreeNode(nums[middle]); // @step node
    node.left=build(nums,left,middle-1); // @step left
    node.right=build(nums,middle+1,right); // @step right
    return node; // @step result
}`,
		cpp: `// 中点作根，较小数在左半区，较大数在右半区。每次按中点分割，区间长度大致减半。
function<TreeNode*(int,int)> build=[&](int left,int right)->TreeNode*{
    if(left>right){ // @step empty
        return nullptr; // @step nil
    }
    int middle=left+(right-left)/2; // @step middle
    TreeNode* node=new TreeNode(nums[middle]); // @step node
    node->left=build(left,middle-1); // @step left
    node->right=build(middle+1,right); // @step right
    return node; // @step result
};
return build(0,(int)nums.size()-1); // @step start`,
	},
);
