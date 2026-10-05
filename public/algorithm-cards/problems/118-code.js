import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"generate",
	[["numRows", "int"]],
	"intLists",
	{
		python: `# 第 r 行有 r+1 个格。先填 1，再只更新内部下标 1～r-1；如 [1,2,1] 的下一行内部是 1+2、2+1。
triangle = [] # @step init
for r in range(numRows): # @step row
    rowValues = [1] * (r + 1) # @step create
    for c in range(1, r): # @step column
        rowValues[c] = triangle[r-1][c-1] + triangle[r-1][c] # @step update
    triangle.append(rowValues) # @step append
return triangle # @step result`,
		javascript: `// 第 r 行有 r+1 个格。先填 1，再只更新内部下标 1～r-1；如 [1,2,1] 的下一行内部是 1+2、2+1。
const triangle=[]; // @step init
for (let r=0;r<numRows;r++) { // @step row
    const rowValues=Array(r+1).fill(1); // @step create
    for (let c=1;c<r;c++) { // @step column
        rowValues[c]=triangle[r-1][c-1]+triangle[r-1][c]; // @step update
    }
    triangle.push(rowValues); // @step append
}
return triangle; // @step result`,
		java: `// 第 r 行有 r+1 个格。先填 1，再只更新内部下标 1～r-1；如 [1,2,1] 的下一行内部是 1+2、2+1。
List<List<Integer>> triangle=new ArrayList<>(); // @step init
for (int r=0;r<numRows;r++) { // @step row
    List<Integer> rowValues=new ArrayList<>(Collections.nCopies(r+1,1)); // @step create
    for (int c=1;c<r;c++) { // @step column
        rowValues.set(c,triangle.get(r-1).get(c-1)+triangle.get(r-1).get(c)); // @step update
    }
    triangle.add(rowValues); // @step append
}
return triangle; // @step result`,
		cpp: `// 第 r 行有 r+1 个格。先填 1，再只更新内部下标 1～r-1；如 [1,2,1] 的下一行内部是 1+2、2+1。
vector<vector<int>> triangle; // @step init
for (int r=0;r<numRows;r++) { // @step row
    vector<int> rowValues(r+1,1); // @step create
    for (int c=1;c<r;c++) { // @step column
        rowValues[c]=triangle[r-1][c-1]+triangle[r-1][c]; // @step update
    }
    triangle.push_back(rowValues); // @step append
}
return triangle; // @step result`,
	},
);
