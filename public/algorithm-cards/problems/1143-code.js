import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"longestCommonSubsequence",
	[
		["text1", "str"],
		["text2", "str"],
	],
	"int",
	{
		python: `# 表格的行列代表前缀长度。末尾相同就从左上加一；不同就比较上方、左方，选择跳过一个末尾后更长的结果。
m, n = len(text1), len(text2) # @step init
dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(1, m + 1): # @step row
    for j in range(1, n + 1): # @step column
        if text1[i-1] == text2[j-1]: # @step match
            dp[i][j] = dp[i-1][j-1] + 1 # @step diagonal
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1]) # @step skip
return dp[m][n] # @step result`,
		javascript: `// 表格的行列代表前缀长度。末尾相同就从左上加一；不同就比较上方、左方，选择跳过一个末尾后更长的结果。
const m=text1.length,n=text2.length,dp=Array.from({length:m+1},()=>Array(n+1).fill(0)); // @step init
for (let i=1;i<=m;i++) { // @step row
    for (let j=1;j<=n;j++) { // @step column
        if (text1[i-1]===text2[j-1]) { // @step match
            dp[i][j]=dp[i-1][j-1]+1; // @step diagonal
        } else {
            dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]); // @step skip
        }
    }
}
return dp[m][n]; // @step result`,
		java: `// 表格的行列代表前缀长度。末尾相同就从左上加一；不同就比较上方、左方，选择跳过一个末尾后更长的结果。
int m=text1.length(),n=text2.length();int[][] dp=new int[m+1][n+1]; // @step init
for (int i=1;i<=m;i++) { // @step row
    for (int j=1;j<=n;j++) { // @step column
        if (text1.charAt(i-1)==text2.charAt(j-1)) { // @step match
            dp[i][j]=dp[i-1][j-1]+1; // @step diagonal
        } else {
            dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]); // @step skip
        }
    }
}
return dp[m][n]; // @step result`,
		cpp: `// 表格的行列代表前缀长度。末尾相同就从左上加一；不同就比较上方、左方，选择跳过一个末尾后更长的结果。
int m=text1.size(),n=text2.size();vector<vector<int>> dp(m+1,vector<int>(n+1,0)); // @step init
for (int i=1;i<=m;i++) { // @step row
    for (int j=1;j<=n;j++) { // @step column
        if (text1[i-1]==text2[j-1]) { // @step match
            dp[i][j]=dp[i-1][j-1]+1; // @step diagonal
        } else {
            dp[i][j]=max(dp[i-1][j],dp[i][j-1]); // @step skip
        }
    }
}
return dp[m][n]; // @step result`,
	},
);
