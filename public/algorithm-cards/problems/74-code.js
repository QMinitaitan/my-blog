import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"searchMatrix",
	[
		["matrix", "matrix"],
		["target", "int"],
	],
	"bool",
	{
		python: `# 矩阵按行读就是有序数组。下标 mid 用 mid//列数、mid%列数定位，不必复制扁平数组。
columns = len(matrix[0]) # @step init
left, right = 0, len(matrix) * columns - 1
while left <= right: # @step loop
    mid = (left + right) // 2 # @step mid
    row, column = divmod(mid, columns) # @step coordinate
    if matrix[row][column] == target: # @step match
        return True # @step hit
    if matrix[row][column] < target: # @step compare
        left = mid + 1 # @step left
    else:
        right = mid - 1 # @step right
return False # @step result`,
		javascript: `// 矩阵按行读就是有序数组。下标 mid 用 mid//列数、mid%列数定位，不必复制扁平数组。
const columns=matrix[0].length; let left=0,right=matrix.length*columns-1; // @step init
while (left<=right) { // @step loop
    const mid=Math.floor((left+right)/2); // @step mid
    const row=Math.floor(mid/columns),column=mid%columns; // @step coordinate
    if (matrix[row][column]===target) { // @step match
        return true; // @step hit
    }
    if (matrix[row][column]<target) { // @step compare
        left=mid+1; // @step left
    } else {
        right=mid-1; // @step right
    }
}
return false; // @step result`,
		java: `// 矩阵按行读就是有序数组。下标 mid 用 mid//列数、mid%列数定位，不必复制扁平数组。
int columns=matrix[0].length,left=0,right=matrix.length*columns-1; // @step init
while (left<=right) { // @step loop
    int mid=left+(right-left)/2; // @step mid
    int row=mid/columns,column=mid%columns; // @step coordinate
    if (matrix[row][column]==target) { // @step match
        return true; // @step hit
    }
    if (matrix[row][column]<target) { // @step compare
        left=mid+1; // @step left
    } else {
        right=mid-1; // @step right
    }
}
return false; // @step result`,
		cpp: `// 矩阵按行读就是有序数组。下标 mid 用 mid//列数、mid%列数定位，不必复制扁平数组。
int columns=matrix[0].size(),left=0,right=matrix.size()*columns-1; // @step init
while (left<=right) { // @step loop
    int mid=left+(right-left)/2; // @step mid
    int row=mid/columns,column=mid%columns; // @step coordinate
    if (matrix[row][column]==target) { // @step match
        return true; // @step hit
    }
    if (matrix[row][column]<target) { // @step compare
        left=mid+1; // @step left
    } else {
        right=mid-1; // @step right
    }
}
return false; // @step result`,
	},
);
