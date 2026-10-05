import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("numSquares", [["n", "int"]], "int", {
	python: `# 枚举最后加上的平方数 square，候选数量是 dp[amount-square]+1，再取最小值。
dp = [0] + [n + 1] * n # @step init
for amount in range(1, n + 1): # @step amount
    root = 1 # @step root
    while root * root <= amount: # @step check
        square = root * root # @step square
        dp[amount] = min(dp[amount], dp[amount - square] + 1) # @step update
        root += 1 # @step advance
return dp[n] # @step result`,
	javascript: `// 枚举最后加上的平方数 square，候选数量是 dp[amount-square]+1，再取最小值。
const dp = [0, ...Array(n).fill(n + 1)]; // @step init
for (let amount = 1; amount <= n; amount++) { // @step amount
    let root = 1; // @step root
    while (root * root <= amount) { // @step check
        const square = root * root; // @step square
        dp[amount] = Math.min(dp[amount], dp[amount - square] + 1); // @step update
        root++; // @step advance
    }
}
return dp[n]; // @step result`,
	java: `// 枚举最后加上的平方数 square，候选数量是 dp[amount-square]+1，再取最小值。
int[] dp = new int[n + 1];
Arrays.fill(dp, n + 1); dp[0] = 0; // @step init
for (int amount = 1; amount <= n; amount++) { // @step amount
    int root = 1; // @step root
    while (root * root <= amount) { // @step check
        int square = root * root; // @step square
        dp[amount] = Math.min(dp[amount], dp[amount - square] + 1); // @step update
        root++; // @step advance
    }
}
return dp[n]; // @step result`,
	cpp: `// 枚举最后加上的平方数 square，候选数量是 dp[amount-square]+1，再取最小值。
vector<int> dp(n + 1, n + 1); dp[0] = 0; // @step init
for (int amount = 1; amount <= n; amount++) { // @step amount
    int root = 1; // @step root
    while (root * root <= amount) { // @step check
        int square = root * root; // @step square
        dp[amount] = min(dp[amount], dp[amount - square] + 1); // @step update
        root++; // @step advance
    }
}
return dp[n]; // @step result`,
});
