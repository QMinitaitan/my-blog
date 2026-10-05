import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"pathSum",
	[
		["root", "tree"],
		["targetSum", "int"],
	],
	"int",
	{
		python: `prefix = {0: 1} # @step init
def dfs(node, curr):
    if node is None: # @step empty
        return 0 # @step nil
    curr += node.val # @step sum
    count = prefix.get(curr - targetSum, 0) # @step query
    prefix[curr] = prefix.get(curr, 0) + 1 # @step insert
    count += dfs(node.left, curr) # @step left
    count += dfs(node.right, curr) # @step right
    # 退出当前路径，避免兄弟分支使用这里的前缀。
    prefix[curr] -= 1 # @step undo
    return count # @step result
return dfs(root, 0) # @step start`,
		javascript: `// 当前前缀 curr 减去某个祖先之前的前缀，等于这段向下路径之和；因此查询 curr-targetSum 的出现次数。prefix 只包含当前根路径，递归退出时必须减回。
const prefix=new Map([[0,1]]); // @step init
function dfs(node,curr){
    if(node===null){ // @step empty
        return 0; // @step nil
    }
    curr+=node.val; // @step sum
    let count=prefix.get(curr-targetSum)||0; // @step query
    prefix.set(curr,(prefix.get(curr)||0)+1); // @step insert
    count+=dfs(node.left,curr); // @step left
    count+=dfs(node.right,curr); // @step right
    prefix.set(curr,prefix.get(curr)-1); // @step undo
    return count; // @step result
}
return dfs(root,0); // @step start`,
		java: `// 当前前缀 curr 减去某个祖先之前的前缀，等于这段向下路径之和；因此查询 curr-targetSum 的出现次数。prefix 只包含当前根路径，递归退出时必须减回。
prefix=new HashMap<>();prefix.put(0L,1); // @step init
return dfs(root,0L,targetSum); // @step start`,
		javaHelpers: `private Map<Long,Integer> prefix;
private int dfs(TreeNode node,long curr,int targetSum){
    if(node==null){ // @step empty
        return 0; // @step nil
    }
    curr+=node.val; // @step sum
    int count=prefix.getOrDefault(curr-targetSum,0); // @step query
    prefix.put(curr,prefix.getOrDefault(curr,0)+1); // @step insert
    count+=dfs(node.left,curr,targetSum); // @step left
    count+=dfs(node.right,curr,targetSum); // @step right
    prefix.put(curr,prefix.get(curr)-1); // @step undo
    return count; // @step result
}`,
		cpp: `// 当前前缀 curr 减去某个祖先之前的前缀，等于这段向下路径之和；因此查询 curr-targetSum 的出现次数。prefix 只包含当前根路径，递归退出时必须减回。
unordered_map<long long,int> prefix{{0,1}}; // @step init
function<int(TreeNode*,long long)> dfs=[&](TreeNode* node,long long curr)->int{
    if(!node){ // @step empty
        return 0; // @step nil
    }
    curr+=node->val; // @step sum
    int count=prefix.count(curr-targetSum)?prefix[curr-targetSum]:0; // @step query
    prefix[curr]++; // @step insert
    count+=dfs(node->left,curr); // @step left
    count+=dfs(node->right,curr); // @step right
    prefix[curr]--; // @step undo
    return count; // @step result
};
return dfs(root,0); // @step start`,
	},
);
