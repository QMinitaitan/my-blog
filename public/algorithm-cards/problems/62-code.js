import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"uniquePaths",
	[
		["m", "int"],
		["n", "int"],
	],
	"int",
	{
		python: `dp = [[1] * n for _ in range(m)] # @step init
# 第一行与第一列只有一种走法。
for row in range(1, m): # @step row
    for column in range(1, n): # @step column
        dp[row][column] = dp[row-1][column] + dp[row][column-1] # @step update
return dp[m-1][n-1] # @step result`,
		javascript: `// 到一个内部格的最后一步只能来自上方或左方，把两者路径数相加。网格显示的数字就是实际 dp 数组。
const dp=Array.from({length:m},()=>Array(n).fill(1)); // @step init
for (let row=1;row<m;row++) { // @step row
    for (let column=1;column<n;column++) { // @step column
        dp[row][column]=dp[row-1][column]+dp[row][column-1]; // @step update
    }
}
return dp[m-1][n-1]; // @step result`,
		java: `// 到一个内部格的最后一步只能来自上方或左方，把两者路径数相加。网格显示的数字就是实际 dp 数组。
int[][] dp=new int[m][n]; for(int[] line:dp) Arrays.fill(line,1); // @step init
for (int row=1;row<m;row++) { // @step row
    for (int column=1;column<n;column++) { // @step column
        dp[row][column]=dp[row-1][column]+dp[row][column-1]; // @step update
    }
}
return dp[m-1][n-1]; // @step result`,
		cpp: `// 到一个内部格的最后一步只能来自上方或左方，把两者路径数相加。网格显示的数字就是实际 dp 数组。
vector<vector<int>> dp(m,vector<int>(n,1)); // @step init
for (int row=1;row<m;row++) { // @step row
    for (int column=1;column<n;column++) { // @step column
        dp[row][column]=dp[row-1][column]+dp[row][column-1]; // @step update
    }
}
return dp[m-1][n-1]; // @step result`,
	},
);
