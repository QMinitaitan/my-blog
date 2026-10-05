import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"wordBreak",
	[
		["s", "str"],
		["wordDict", "stringList"],
	],
	"bool",
	{
		python: `# 例如 leetcode 在 j=4 切分：dp[4] 说明 leet 可拆，s[4:8] 是 code，于是 dp[8]=true。每个前缀枚举它的最后一个词从哪开始。
words = set(wordDict) # @step init
dp = [True] + [False] * len(s)
for i in range(1, len(s) + 1): # @step prefix
    for j in range(i): # @step split
        if dp[j] and s[j:i] in words: # @step check
            dp[i] = True # @step update
            break # @step stop
return dp[len(s)] # @step result`,
		javascript: `// 例如 leetcode 在 j=4 切分：dp[4] 说明 leet 可拆，s[4:8] 是 code，于是 dp[8]=true。每个前缀枚举它的最后一个词从哪开始。
const words=new Set(wordDict),dp=[true,...Array(s.length).fill(false)]; // @step init
for (let i=1;i<=s.length;i++) { // @step prefix
    for (let j=0;j<i;j++) { // @step split
        if (dp[j] && words.has(s.slice(j,i))) { // @step check
            dp[i]=true; // @step update
            break; // @step stop
        }
    }
}
return dp[s.length]; // @step result`,
		java: `// 例如 leetcode 在 j=4 切分：dp[4] 说明 leet 可拆，s[4:8] 是 code，于是 dp[8]=true。每个前缀枚举它的最后一个词从哪开始。
Set<String> words=new HashSet<>(wordDict);boolean[] dp=new boolean[s.length()+1];dp[0]=true; // @step init
for (int i=1;i<=s.length();i++) { // @step prefix
    for (int j=0;j<i;j++) { // @step split
        if (dp[j] && words.contains(s.substring(j,i))) { // @step check
            dp[i]=true; // @step update
            break; // @step stop
        }
    }
}
return dp[s.length()]; // @step result`,
		cpp: `// 例如 leetcode 在 j=4 切分：dp[4] 说明 leet 可拆，s[4:8] 是 code，于是 dp[8]=true。每个前缀枚举它的最后一个词从哪开始。
unordered_set<string> words(wordDict.begin(),wordDict.end());vector<bool> dp(s.size()+1,false);dp[0]=true; // @step init
for (int i=1;i<=(int)s.size();i++) { // @step prefix
    for (int j=0;j<i;j++) { // @step split
        if (dp[j] && words.count(s.substr(j,i-j))) { // @step check
            dp[i]=true; // @step update
            break; // @step stop
        }
    }
}
return dp[s.size()]; // @step result`,
	},
);
