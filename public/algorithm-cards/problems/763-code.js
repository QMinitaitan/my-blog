import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"partitionLabels",
	[["s", "str"]],
	"intList",
	{
		python: `# 先记住每个字母的最后下标。片段必须覆盖内部所有字母的最后位置，到达这个边界才可以切分。
last = {} # @step init
for i, char in enumerate(s): # @step index
    last[char] = i # @step last
start, end = 0, 0 # @step bounds
answer = [] # @step answer
for i, char in enumerate(s): # @step item
    end = max(end, last[char]) # @step extend
    if i == end: # @step boundary
        answer.append(end - start + 1) # @step append
        start = i + 1 # @step next
return answer # @step result`,
		javascript: `// 先记住每个字母的最后下标。片段必须覆盖内部所有字母的最后位置，到达这个边界才可以切分。
const last = new Map(); // @step init
for (let i = 0; i < s.length; i++) { // @step index
    last.set(s[i], i); // @step last
}
let start = 0, end = 0; // @step bounds
const answer = []; // @step answer
for (let i = 0; i < s.length; i++) { // @step item
    end = Math.max(end, last.get(s[i])); // @step extend
    if (i === end) { // @step boundary
        answer.push(end - start + 1); // @step append
        start = i + 1; // @step next
    }
}
return answer; // @step result`,
		java: `// 先记住每个字母的最后下标。片段必须覆盖内部所有字母的最后位置，到达这个边界才可以切分。
Map<Character, Integer> last = new HashMap<>(); // @step init
for (int i = 0; i < s.length(); i++) { // @step index
    last.put(s.charAt(i), i); // @step last
}
int start = 0, end = 0; // @step bounds
List<Integer> answer = new ArrayList<>(); // @step answer
for (int i = 0; i < s.length(); i++) { // @step item
    end = Math.max(end, last.get(s.charAt(i))); // @step extend
    if (i == end) { // @step boundary
        answer.add(end - start + 1); // @step append
        start = i + 1; // @step next
    }
}
return answer; // @step result`,
		cpp: `// 先记住每个字母的最后下标。片段必须覆盖内部所有字母的最后位置，到达这个边界才可以切分。
unordered_map<char, int> last; // @step init
for (int i = 0; i < (int)s.size(); i++) { // @step index
    last[s[i]] = i; // @step last
}
int start = 0, end = 0; // @step bounds
vector<int> answer; // @step answer
for (int i = 0; i < (int)s.size(); i++) { // @step item
    end = max(end, last[s[i]]); // @step extend
    if (i == end) { // @step boundary
        answer.push_back(end - start + 1); // @step append
        start = i + 1; // @step next
    }
}
return answer; // @step result`,
	},
);
