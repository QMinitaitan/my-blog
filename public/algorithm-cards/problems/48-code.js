import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("rotate", [["matrix", "matrix"]], "void", {
	python: `n = len(matrix) # @step init
# 沿主对角线转置，然后反转每一行。
for row in range(n): # @step row
    for column in range(row + 1, n): # @step column
        matrix[row][column], matrix[column][row] = matrix[column][row], matrix[row][column] # @step swap
for row in range(n): # @step reverseRow
    left, right = 0, n - 1 # @step ends
    while left < right: # @step check
        matrix[row][left], matrix[row][right] = matrix[row][right], matrix[row][left] # @step flip
        left += 1
        right -= 1 # @step move
return # @step result`,
	javascript: `// 原位置 (row,column) 先转置到 (column,row)，再行内反转到 (column,n-1-row)，这正是顺时针旋转位置。
const n=matrix.length; // @step init
for (let row=0;row<n;row++) { // @step row
    for (let column=row+1;column<n;column++) { // @step column
        [matrix[row][column],matrix[column][row]]=[matrix[column][row],matrix[row][column]]; // @step swap
    }
}
for (let row=0;row<n;row++) { // @step reverseRow
    let left=0,right=n-1; // @step ends
    while (left<right) { // @step check
        [matrix[row][left],matrix[row][right]]=[matrix[row][right],matrix[row][left]]; // @step flip
        left++;right--; // @step move
    }
}
return; // @step result`,
	java: `// 原位置 (row,column) 先转置到 (column,row)，再行内反转到 (column,n-1-row)，这正是顺时针旋转位置。
int n=matrix.length; // @step init
for (int row=0;row<n;row++) { // @step row
    for (int column=row+1;column<n;column++) { // @step column
        int tmp=matrix[row][column];matrix[row][column]=matrix[column][row];matrix[column][row]=tmp; // @step swap
    }
}
for (int row=0;row<n;row++) { // @step reverseRow
    int left=0,right=n-1; // @step ends
    while (left<right) { // @step check
        int tmp=matrix[row][left];matrix[row][left]=matrix[row][right];matrix[row][right]=tmp; // @step flip
        left++;right--; // @step move
    }
}
return; // @step result`,
	cpp: `// 原位置 (row,column) 先转置到 (column,row)，再行内反转到 (column,n-1-row)，这正是顺时针旋转位置。
int n=matrix.size(); // @step init
for (int row=0;row<n;row++) { // @step row
    for (int column=row+1;column<n;column++) { // @step column
        swap(matrix[row][column],matrix[column][row]); // @step swap
    }
}
for (int row=0;row<n;row++) { // @step reverseRow
    int left=0,right=n-1; // @step ends
    while (left<right) { // @step check
        swap(matrix[row][left],matrix[row][right]); // @step flip
        left++;right--; // @step move
    }
}
return; // @step result`,
});
