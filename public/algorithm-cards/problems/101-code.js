import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("isSymmetric", [["root", "tree"]], "bool", {
	python: `# 每次比较镜像位置上的两个节点；外侧对外侧，内侧对内侧。两个都空可跳过，只有一个空或数值不同立即失败。
from collections import deque
queue = deque([(root, root)]) # @step init
while queue: # @step loop
    a, b = queue.popleft() # @step take
    if a is None and b is None: # @step both
        continue # @step skip
    if a is None or b is None or a.val != b.val: # @step mismatch
        return False # @step false
    queue.append((a.left, b.right)) # @step outer
    queue.append((a.right, b.left)) # @step inner
return True # @step result`,
	javascript: `// 每次比较镜像位置上的两个节点；外侧对外侧，内侧对内侧。两个都空可跳过，只有一个空或数值不同立即失败。
const queue=[[root,root]];let head=0; // @step init
while(head<queue.length){ // @step loop
    const [a,b]=queue[head++]; // @step take
    if(a===null&&b===null){ // @step both
        continue; // @step skip
    }
    if(a===null||b===null||a.val!==b.val){ // @step mismatch
        return false; // @step false
    }
    queue.push([a.left,b.right]); // @step outer
    queue.push([a.right,b.left]); // @step inner
}
return true; // @step result`,
	java: `// 每次比较镜像位置上的两个节点；外侧对外侧，内侧对内侧。两个都空可跳过，只有一个空或数值不同立即失败。
Queue<TreeNode[]> queue=new ArrayDeque<>();queue.add(new TreeNode[]{root,root}); // @step init
while(!queue.isEmpty()){ // @step loop
    TreeNode[] pair=queue.remove();TreeNode a=pair[0],b=pair[1]; // @step take
    if(a==null&&b==null){ // @step both
        continue; // @step skip
    }
    if(a==null||b==null||a.val!=b.val){ // @step mismatch
        return false; // @step false
    }
    queue.add(new TreeNode[]{a.left,b.right}); // @step outer
    queue.add(new TreeNode[]{a.right,b.left}); // @step inner
}
return true; // @step result`,
	cpp: `// 每次比较镜像位置上的两个节点；外侧对外侧，内侧对内侧。两个都空可跳过，只有一个空或数值不同立即失败。
queue<pair<TreeNode*,TreeNode*>> queue;queue.push({root,root}); // @step init
while(!queue.empty()){ // @step loop
    auto [a,b]=queue.front();queue.pop(); // @step take
    if(!a&&!b){ // @step both
        continue; // @step skip
    }
    if(!a||!b||a->val!=b->val){ // @step mismatch
        return false; // @step false
    }
    queue.push({a->left,b->right}); // @step outer
    queue.push({a->right,b->left}); // @step inner
}
return true; // @step result`,
});
