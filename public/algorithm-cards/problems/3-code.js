import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"lengthOfLongestSubstring",
	[["s", "str"]],
	"int",
	{
		python: `# right 扩大窗口，重复字符在窗口内时推进 left。用字典记住每个字符最后出现的位置。
last = {} # @step init
left, best = 0, 0 # @step bounds
for right, char in enumerate(s): # @step item
    previous = last.get(char, -1) # @step query
    left = max(left, previous + 1) # @step left
    best = max(best, right - left + 1) # @step best
    last[char] = right # @step record
return best # @step result`,
		javascript: `// right 扩大窗口，重复字符在窗口内时推进 left。用字典记住每个字符最后出现的位置。
const last = new Map(); // @step init
let left = 0, best = 0; // @step bounds
for (let right = 0; right < s.length; right++) { // @step item
    const char = s[right];
    const previous = last.get(char) ?? -1; // @step query
    left = Math.max(left, previous + 1); // @step left
    best = Math.max(best, right - left + 1); // @step best
    last.set(char, right); // @step record
}
return best; // @step result`,
		java: `// right 扩大窗口，重复字符在窗口内时推进 left。用字典记住每个字符最后出现的位置。
Map<Character, Integer> last = new HashMap<>(); // @step init
int left = 0, best = 0; // @step bounds
for (int right = 0; right < s.length(); right++) { // @step item
    char ch = s.charAt(right);
    int previous = last.getOrDefault(ch, -1); // @step query
    left = Math.max(left, previous + 1); // @step left
    best = Math.max(best, right - left + 1); // @step best
    last.put(ch, right); // @step record
}
return best; // @step result`,
		cpp: `// right 扩大窗口，重复字符在窗口内时推进 left。用字典记住每个字符最后出现的位置。
unordered_map<char, int> last; // @step init
int left = 0, best = 0; // @step bounds
for (int right = 0; right < (int)s.size(); right++) { // @step item
    char ch = s[right];
    int previous = last.count(ch) ? last[ch] : -1; // @step query
    left = max(left, previous + 1); // @step left
    best = max(best, right - left + 1); // @step best
    last[ch] = right; // @step record
}
return best; // @step result`,
	},
);
