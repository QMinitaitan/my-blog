import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("minPathSum", [["grid", "matrix"]], "int", {
	python: `# dp[row][column] 表示走到当前格的最小和。内部格选上方、左方中较小的路径，再加当前值；首行首列单独处理。
m, n = len(grid), len(grid[0]) # @step init
dp = [[0] * n for _ in range(m)]
for row in range(m): # @step row
    for column in range(n): # @step column
        if row == 0 and column == 0: # @step start
            dp[row][column] = grid[row][column] # @step origin
        elif row == 0: # @step top
            dp[row][column] = dp[row][column-1] + grid[row][column] # @step fromLeft
        elif column == 0: # @step edge
            dp[row][column] = dp[row-1][column] + grid[row][column] # @step fromTop
        else:
            dp[row][column] = min(dp[row-1][column], dp[row][column-1]) + grid[row][column] # @step update
return dp[m-1][n-1] # @step result`,
	javascript: `// dp[row][column] 表示走到当前格的最小和。内部格选上方、左方中较小的路径，再加当前值；首行首列单独处理。
const m=grid.length,n=grid[0].length,dp=Array.from({length:m},()=>Array(n).fill(0)); // @step init
for (let row=0;row<m;row++) { // @step row
    for (let column=0;column<n;column++) { // @step column
        if (row===0 && column===0) { // @step start
            dp[row][column]=grid[row][column]; // @step origin
        } else if (row===0) { // @step top
            dp[row][column]=dp[row][column-1]+grid[row][column]; // @step fromLeft
        } else if (column===0) { // @step edge
            dp[row][column]=dp[row-1][column]+grid[row][column]; // @step fromTop
        } else {
            dp[row][column]=Math.min(dp[row-1][column],dp[row][column-1])+grid[row][column]; // @step update
        }
    }
}
return dp[m-1][n-1]; // @step result`,
	java: `// dp[row][column] 表示走到当前格的最小和。内部格选上方、左方中较小的路径，再加当前值；首行首列单独处理。
int m=grid.length,n=grid[0].length; int[][] dp=new int[m][n]; // @step init
for (int row=0;row<m;row++) { // @step row
    for (int column=0;column<n;column++) { // @step column
        if (row==0 && column==0) { // @step start
            dp[row][column]=grid[row][column]; // @step origin
        } else if (row==0) { // @step top
            dp[row][column]=dp[row][column-1]+grid[row][column]; // @step fromLeft
        } else if (column==0) { // @step edge
            dp[row][column]=dp[row-1][column]+grid[row][column]; // @step fromTop
        } else {
            dp[row][column]=Math.min(dp[row-1][column],dp[row][column-1])+grid[row][column]; // @step update
        }
    }
}
return dp[m-1][n-1]; // @step result`,
	cpp: `// dp[row][column] 表示走到当前格的最小和。内部格选上方、左方中较小的路径，再加当前值；首行首列单独处理。
int m=grid.size(),n=grid[0].size(); vector<vector<int>> dp(m,vector<int>(n,0)); // @step init
for (int row=0;row<m;row++) { // @step row
    for (int column=0;column<n;column++) { // @step column
        if (row==0 && column==0) { // @step start
            dp[row][column]=grid[row][column]; // @step origin
        } else if (row==0) { // @step top
            dp[row][column]=dp[row][column-1]+grid[row][column]; // @step fromLeft
        } else if (column==0) { // @step edge
            dp[row][column]=dp[row-1][column]+grid[row][column]; // @step fromTop
        } else {
            dp[row][column]=min(dp[row-1][column],dp[row][column-1])+grid[row][column]; // @step update
        }
    }
}
return dp[m-1][n-1]; // @step result`,
});
