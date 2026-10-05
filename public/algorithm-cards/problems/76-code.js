import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"minWindow",
	[
		["s", "str"],
		["t", "str"],
	],
	"str",
	{
		python: `# need 可以为负：负数表示窗口里多出的字符。
need = [0] * 128
for ch in t:
    need[ord(ch)] += 1
missing, left, best_start, best_length = len(t), 0, 0, len(s) + 1 # @step init
for right, ch in enumerate(s): # @step scan
    if need[ord(ch)] > 0: # @step useful
        missing -= 1 # @step satisfy
    need[ord(ch)] -= 1 # @step add
    while missing == 0: # @step covered
        if right - left + 1 < best_length: # @step better
            best_start, best_length = left, right - left + 1 # @step best
        need[ord(s[left])] += 1 # @step remove
        if need[ord(s[left])] > 0: # @step lost
            missing += 1 # @step missing
        left += 1 # @step move
return "" if best_length > len(s) else s[best_start:best_start + best_length] # @step result`,
		javascript: `// 右端扩张补足需求，missing 变成 0 后左端收缩。例如 ABC 覆盖好后，可以丢掉多余的 D、O，但移出最后一个必需 A 时就要重新扩张。
const need=Array(128).fill(0);for(const ch of t)need[ch.charCodeAt(0)]++;
let missing=t.length,left=0,best_start=0,best_length=s.length+1; // @step init
for(let right=0;right<s.length;right++){const ch=s[right]; // @step scan
    if(need[ch.charCodeAt(0)]>0){ // @step useful
        missing--; // @step satisfy
    }
    need[ch.charCodeAt(0)]--; // @step add
    while(missing===0){ // @step covered
        if(right-left+1<best_length){ // @step better
            best_start=left;best_length=right-left+1; // @step best
        }
        need[s.charCodeAt(left)]++; // @step remove
        if(need[s.charCodeAt(left)]>0){ // @step lost
            missing++; // @step missing
        }
        left++; // @step move
    }
}
return best_length>s.length?'':s.slice(best_start,best_start+best_length); // @step result`,
		java: `// 右端扩张补足需求，missing 变成 0 后左端收缩。例如 ABC 覆盖好后，可以丢掉多余的 D、O，但移出最后一个必需 A 时就要重新扩张。
int[] need=new int[128];for(char ch:t.toCharArray())need[ch]++;
int missing=t.length(),left=0,best_start=0,best_length=s.length()+1; // @step init
for(int right=0;right<s.length();right++){char ch=s.charAt(right); // @step scan
    if(need[ch]>0){ // @step useful
        missing--; // @step satisfy
    }
    need[ch]--; // @step add
    while(missing==0){ // @step covered
        if(right-left+1<best_length){ // @step better
            best_start=left;best_length=right-left+1; // @step best
        }
        need[s.charAt(left)]++; // @step remove
        if(need[s.charAt(left)]>0){ // @step lost
            missing++; // @step missing
        }
        left++; // @step move
    }
}
return best_length>s.length()?"":s.substring(best_start,best_start+best_length); // @step result`,
		cpp: `// 右端扩张补足需求，missing 变成 0 后左端收缩。例如 ABC 覆盖好后，可以丢掉多余的 D、O，但移出最后一个必需 A 时就要重新扩张。
vector<int> need(128);for(char ch:t)need[ch]++;
int missing=t.size(),left=0,best_start=0,best_length=s.size()+1; // @step init
for(int right=0;right<(int)s.size();right++){char ch=s[right]; // @step scan
    if(need[ch]>0){ // @step useful
        missing--; // @step satisfy
    }
    need[ch]--; // @step add
    while(missing==0){ // @step covered
        if(right-left+1<best_length){ // @step better
            best_start=left;best_length=right-left+1; // @step best
        }
        need[s[left]]++; // @step remove
        if(need[s[left]]>0){ // @step lost
            missing++; // @step missing
        }
        left++; // @step move
    }
}
return best_length>(int)s.size()?"":s.substr(best_start,best_length); // @step result`,
	},
);
