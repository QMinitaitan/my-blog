import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"buildTree",
	[
		["preorder", "ints"],
		["inorder", "ints"],
	],
	"tree",
	{
		python: `pos = {value: i for i, value in enumerate(inorder)}
next_index = 0 # @step init
def build(left, right):
    nonlocal next_index
    if left > right: # @step empty
        return None # @step nil
    value = preorder[next_index] # @step value
    next_index += 1 # @step advance
    middle = pos[value] # @step middle
    node = TreeNode(value) # @step node
    # 前序先左后右，消耗游标的顺序必须一致。
    node.left = build(left, middle - 1) # @step left
    node.right = build(middle + 1, right) # @step right
    return node # @step result
return build(0, len(inorder) - 1) # @step start`,
		javascript: `// 前序游标读根，中序字典找分界。例如根 3 在中序 [9,3,15,20,7] 的下标 1，左边只有 9。
const pos=new Map(inorder.map((value,i)=>[value,i]));let next_index=0; // @step init
function build(left,right){
    if(left>right){ // @step empty
        return null; // @step nil
    }
    const value=preorder[next_index]; // @step value
    next_index++; // @step advance
    const middle=pos.get(value); // @step middle
    const node=new TreeNode(value); // @step node
    node.left=build(left,middle-1); // @step left
    node.right=build(middle+1,right); // @step right
    return node; // @step result
}
return build(0,inorder.length-1); // @step start`,
		java: `// 前序游标读根，中序字典找分界。例如根 3 在中序 [9,3,15,20,7] 的下标 1，左边只有 9。
pos=new HashMap<>();for(int i=0;i<inorder.length;i++)pos.put(inorder[i],i);next_index=0; // @step init
return build(preorder,0,inorder.length-1); // @step start`,
		javaHelpers: `private Map<Integer,Integer> pos;private int next_index;
private TreeNode build(int[] preorder,int left,int right){
    if(left>right){ // @step empty
        return null; // @step nil
    }
    int value=preorder[next_index]; // @step value
    next_index++; // @step advance
    int middle=pos.get(value); // @step middle
    TreeNode node=new TreeNode(value); // @step node
    node.left=build(preorder,left,middle-1); // @step left
    node.right=build(preorder,middle+1,right); // @step right
    return node; // @step result
}`,
		cpp: `// 前序游标读根，中序字典找分界。例如根 3 在中序 [9,3,15,20,7] 的下标 1，左边只有 9。
unordered_map<int,int> pos;for(int i=0;i<(int)inorder.size();i++)pos[inorder[i]]=i;int next_index=0; // @step init
function<TreeNode*(int,int)> build=[&](int left,int right)->TreeNode*{
    if(left>right){ // @step empty
        return nullptr; // @step nil
    }
    int value=preorder[next_index]; // @step value
    next_index++; // @step advance
    int middle=pos[value]; // @step middle
    TreeNode* node=new TreeNode(value); // @step node
    node->left=build(left,middle-1); // @step left
    node->right=build(middle+1,right); // @step right
    return node; // @step result
};
return build(0,(int)inorder.size()-1); // @step start`,
	},
);
