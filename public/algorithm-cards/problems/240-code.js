import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"searchMatrix",
	[
		["matrix", "matrix"],
		["target", "int"],
	],
	"bool",
	{
		python: `# 右上角是分界点。比目标大就向左，比目标小就向下；每次排除整行或整列。
row, column = 0, len(matrix[0]) - 1 # @step init
while row < len(matrix) and column >= 0: # @step loop
    if matrix[row][column] == target: # @step match
        return True # @step hit
    if matrix[row][column] > target: # @step compare
        column -= 1 # @step left
    else:
        row += 1 # @step down
return False # @step result`,
		javascript: `// 右上角是分界点。比目标大就向左，比目标小就向下；每次排除整行或整列。
let row=0,column=matrix[0].length-1; // @step init
while (row<matrix.length && column>=0) { // @step loop
    if (matrix[row][column]===target) { // @step match
        return true; // @step hit
    }
    if (matrix[row][column]>target) { // @step compare
        column--; // @step left
    } else {
        row++; // @step down
    }
}
return false; // @step result`,
		java: `// 右上角是分界点。比目标大就向左，比目标小就向下；每次排除整行或整列。
int row=0,column=matrix[0].length-1; // @step init
while (row<matrix.length && column>=0) { // @step loop
    if (matrix[row][column]==target) { // @step match
        return true; // @step hit
    }
    if (matrix[row][column]>target) { // @step compare
        column--; // @step left
    } else {
        row++; // @step down
    }
}
return false; // @step result`,
		cpp: `// 右上角是分界点。比目标大就向左，比目标小就向下；每次排除整行或整列。
int row=0,column=matrix[0].size()-1; // @step init
while (row<(int)matrix.size() && column>=0) { // @step loop
    if (matrix[row][column]==target) { // @step match
        return true; // @step hit
    }
    if (matrix[row][column]>target) { // @step compare
        column--; // @step left
    } else {
        row++; // @step down
    }
}
return false; // @step result`,
	},
);
