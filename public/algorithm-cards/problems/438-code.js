import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"findAnagrams",
	[
		["s", "str"],
		["p", "str"],
	],
	"intList",
	{
		python: `# 固定长度窗口：进入时加一，超长时移走最左字符。
need, window = [0] * 26, [0] * 26
for ch in p:
    need[ord(ch) - ord('a')] += 1
answer = [] # @step init
for right, ch in enumerate(s): # @step scan
    window[ord(ch) - ord('a')] += 1 # @step add
    if right >= len(p): # @step oversized
        window[ord(s[right - len(p)]) - ord('a')] -= 1 # @step remove
    if right >= len(p) - 1 and window == need: # @step match
        answer.append(right - len(p) + 1) # @step collect
return answer # @step result`,
		javascript: `// 例如 p=ab，窗口 ba 也满足要求。保持长度为 len(p) 的窗口，每步加右边字符，再移走超长的左边字符，比较 26 个字符计数。
const need=Array(26).fill(0),window=Array(26).fill(0);
for(const ch of p)need[ch.charCodeAt(0)-97]++;
const answer=[]; // @step init
for(let right=0;right<s.length;right++){const ch=s[right]; // @step scan
    window[ch.charCodeAt(0)-97]++; // @step add
    if(right>=p.length){ // @step oversized
        window[s.charCodeAt(right-p.length)-97]--; // @step remove
    }
    if(right>=p.length-1&&window.every((count,i)=>count===need[i])){ // @step match
        answer.push(right-p.length+1); // @step collect
    }
}
return answer; // @step result`,
		java: `// 例如 p=ab，窗口 ba 也满足要求。保持长度为 len(p) 的窗口，每步加右边字符，再移走超长的左边字符，比较 26 个字符计数。
int[] need=new int[26],window=new int[26];for(char ch:p.toCharArray())need[ch-'a']++;
List<Integer> answer=new ArrayList<>(); // @step init
for(int right=0;right<s.length();right++){char ch=s.charAt(right); // @step scan
    window[ch-'a']++; // @step add
    if(right>=p.length()){ // @step oversized
        window[s.charAt(right-p.length())-'a']--; // @step remove
    }
    if(right>=p.length()-1&&Arrays.equals(window,need)){ // @step match
        answer.add(right-p.length()+1); // @step collect
    }
}
return answer; // @step result`,
		cpp: `// 例如 p=ab，窗口 ba 也满足要求。保持长度为 len(p) 的窗口，每步加右边字符，再移走超长的左边字符，比较 26 个字符计数。
vector<int> need(26),window(26);for(char ch:p)need[ch-'a']++;
vector<int> answer; // @step init
for(int right=0;right<(int)s.size();right++){char ch=s[right]; // @step scan
    window[ch-'a']++; // @step add
    if(right>=(int)p.size()){ // @step oversized
        window[s[right-p.size()]-'a']--; // @step remove
    }
    if(right>=(int)p.size()-1&&window==need){ // @step match
        answer.push_back(right-p.size()+1); // @step collect
    }
}
return answer; // @step result`,
	},
);
