import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"minDistance",
	[
		["word1", "str"],
		["word2", "str"],
	],
	"int",
	{
		python: `# 每个格比较最后一次操作。相同字符继承左上方；不同时，在删除、插入、替换的三个前缀状态中取最小值再加一。
m, n = len(word1), len(word2) # @step init
dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(m + 1): # @step baseRow
    dp[i][0] = i # @step deleteAll
for j in range(n + 1): # @step baseColumn
    dp[0][j] = j # @step insertAll
for i in range(1, m + 1): # @step row
    for j in range(1, n + 1): # @step column
        if word1[i-1] == word2[j-1]: # @step match
            dp[i][j] = dp[i-1][j-1] # @step same
        else:
            dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) # @step edit
return dp[m][n] # @step result`,
		javascript: `// 每个格比较最后一次操作。相同字符继承左上方；不同时，在删除、插入、替换的三个前缀状态中取最小值再加一。
const m=word1.length,n=word2.length,dp=Array.from({length:m+1},()=>Array(n+1).fill(0)); // @step init
for (let i=0;i<=m;i++) { // @step baseRow
    dp[i][0]=i; // @step deleteAll
}
for (let j=0;j<=n;j++) { // @step baseColumn
    dp[0][j]=j; // @step insertAll
}
for (let i=1;i<=m;i++) { // @step row
    for (let j=1;j<=n;j++) { // @step column
        if (word1[i-1]===word2[j-1]) { // @step match
            dp[i][j]=dp[i-1][j-1]; // @step same
        } else {
            dp[i][j]=1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]); // @step edit
        }
    }
}
return dp[m][n]; // @step result`,
		java: `// 每个格比较最后一次操作。相同字符继承左上方；不同时，在删除、插入、替换的三个前缀状态中取最小值再加一。
int m=word1.length(),n=word2.length();int[][] dp=new int[m+1][n+1]; // @step init
for (int i=0;i<=m;i++) { // @step baseRow
    dp[i][0]=i; // @step deleteAll
}
for (int j=0;j<=n;j++) { // @step baseColumn
    dp[0][j]=j; // @step insertAll
}
for (int i=1;i<=m;i++) { // @step row
    for (int j=1;j<=n;j++) { // @step column
        if (word1.charAt(i-1)==word2.charAt(j-1)) { // @step match
            dp[i][j]=dp[i-1][j-1]; // @step same
        } else {
            dp[i][j]=1+Math.min(dp[i-1][j],Math.min(dp[i][j-1],dp[i-1][j-1])); // @step edit
        }
    }
}
return dp[m][n]; // @step result`,
		cpp: `// 每个格比较最后一次操作。相同字符继承左上方；不同时，在删除、插入、替换的三个前缀状态中取最小值再加一。
int m=word1.size(),n=word2.size();vector<vector<int>> dp(m+1,vector<int>(n+1,0)); // @step init
for (int i=0;i<=m;i++) { // @step baseRow
    dp[i][0]=i; // @step deleteAll
}
for (int j=0;j<=n;j++) { // @step baseColumn
    dp[0][j]=j; // @step insertAll
}
for (int i=1;i<=m;i++) { // @step row
    for (int j=1;j<=n;j++) { // @step column
        if (word1[i-1]==word2[j-1]) { // @step match
            dp[i][j]=dp[i-1][j-1]; // @step same
        } else {
            dp[i][j]=1+min(dp[i-1][j],min(dp[i][j-1],dp[i-1][j-1])); // @step edit
        }
    }
}
return dp[m][n]; // @step result`,
	},
);
