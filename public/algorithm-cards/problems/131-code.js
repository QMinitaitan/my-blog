import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("partition", [["s", "str"]], "stringLists", {
	python: `# 固定 start，依次尝试各个 end。只把回文片段加入 path，递归到 end+1，再 pop 撤销。
answer, path = [], [] # @step init
def dfs(start):
    if start == len(s): # @step complete
        answer.append(path[:]) # @step collect
        return # @step done
    for end in range(start, len(s)): # @step scan
        part = s[start:end + 1] # @step part
        if part != part[::-1]: # @step palindrome
            continue # @step skip
        path.append(part) # @step choose
        dfs(end + 1) # @step recurse
        path.pop() # @step undo
dfs(0) # @step start
return answer # @step result`,
	javascript: `// 固定 start，依次尝试各个 end。只把回文片段加入 path，递归到 end+1，再 pop 撤销。
const answer=[],path=[]; // @step init
function dfs(start){
    if(start===s.length){ // @step complete
        answer.push([...path]); // @step collect
        return; // @step done
    }
    for(let end=start;end<s.length;end++){ // @step scan
        const part=s.slice(start,end+1); // @step part
        if(part!==[...part].reverse().join('')){ // @step palindrome
            continue; // @step skip
        }
        path.push(part); // @step choose
        dfs(end+1); // @step recurse
        path.pop(); // @step undo
    }
}
dfs(0); // @step start
return answer; // @step result`,
	java: `// 固定 start，依次尝试各个 end。只把回文片段加入 path，递归到 end+1，再 pop 撤销。
List<List<String>> answer=new ArrayList<>();List<String> path=new ArrayList<>(); // @step init
dfs(s,0,path,answer); // @step start
return answer; // @step result`,
	javaHelpers: `private void dfs(String s,int start,List<String> path,List<List<String>> answer){
    if(start==s.length()){ // @step complete
        answer.add(new ArrayList<>(path)); // @step collect
        return; // @step done
    }
    for(int end=start;end<s.length();end++){ // @step scan
        String part=s.substring(start,end+1); // @step part
        if(!part.equals(new StringBuilder(part).reverse().toString())){ // @step palindrome
            continue; // @step skip
        }
        path.add(part); // @step choose
        dfs(s,end+1,path,answer); // @step recurse
        path.remove(path.size()-1); // @step undo
    }
}`,
	cpp: `// 固定 start，依次尝试各个 end。只把回文片段加入 path，递归到 end+1，再 pop 撤销。
vector<vector<string>> answer;vector<string> path; // @step init
function<void(int)> dfs=[&](int start){
    if(start==(int)s.size()){ // @step complete
        answer.push_back(path); // @step collect
        return; // @step done
    }
    for(int end=start;end<(int)s.size();end++){ // @step scan
        string part=s.substr(start,end-start+1); // @step part
        string reversed=part;reverse(reversed.begin(),reversed.end());if(part!=reversed){ // @step palindrome
            continue; // @step skip
        }
        path.push_back(part); // @step choose
        dfs(end+1); // @step recurse
        path.pop_back(); // @step undo
    }
};
dfs(0); // @step start
return answer; // @step result`,
});
