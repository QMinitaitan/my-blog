import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("flatten", [["root", "tree"]], "void", {
	python: `# 当前节点有左子树时，找到左子树最右节点，把原右子树接到它后面，再把左子树移到 right 并清空 left。例如 1 的左侧 2→4 之后接上原右侧 5。
current = root # @step init
while current: # @step loop
    if current.left: # @step hasLeft
        previous = current.left # @step previous
        while previous.right: # @step walk
            previous = previous.right # @step advance
        previous.right = current.right # @step bridge
        current.right = current.left # @step moveLeft
        current.left = None # @step clear
    current = current.right # @step next`,
	javascript: `// 当前节点有左子树时，找到左子树最右节点，把原右子树接到它后面，再把左子树移到 right 并清空 left。例如 1 的左侧 2→4 之后接上原右侧 5。
let current=root; // @step init
while(current){ // @step loop
    if(current.left){ // @step hasLeft
        let previous=current.left; // @step previous
        while(previous.right){ // @step walk
            previous=previous.right; // @step advance
        }
        previous.right=current.right; // @step bridge
        current.right=current.left; // @step moveLeft
        current.left=null; // @step clear
    }
    current=current.right; // @step next
}`,
	java: `// 当前节点有左子树时，找到左子树最右节点，把原右子树接到它后面，再把左子树移到 right 并清空 left。例如 1 的左侧 2→4 之后接上原右侧 5。
TreeNode current=root; // @step init
while(current!=null){ // @step loop
    if(current.left!=null){ // @step hasLeft
        TreeNode previous=current.left; // @step previous
        while(previous.right!=null){ // @step walk
            previous=previous.right; // @step advance
        }
        previous.right=current.right; // @step bridge
        current.right=current.left; // @step moveLeft
        current.left=null; // @step clear
    }
    current=current.right; // @step next
}`,
	cpp: `// 当前节点有左子树时，找到左子树最右节点，把原右子树接到它后面，再把左子树移到 right 并清空 left。例如 1 的左侧 2→4 之后接上原右侧 5。
TreeNode* current=root; // @step init
while(current){ // @step loop
    if(current->left){ // @step hasLeft
        TreeNode* previous=current->left; // @step previous
        while(previous->right){ // @step walk
            previous=previous->right; // @step advance
        }
        previous->right=current->right; // @step bridge
        current->right=current->left; // @step moveLeft
        current->left=nullptr; // @step clear
    }
    current=current->right; // @step next
}`,
});
