import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"generateParenthesis",
	[["n", "int"]],
	"stringList",
	{
		python: `# 两个条件直接保证合法：左括号没用完才放 (；尚有未关闭的左括号才放 )。例如 path="("、opened=1、closed=0 时，两种选择都可能合法。
answer, path = [], [] # @step init
def dfs(opened, closed):
    if len(path) == 2 * n: # @step complete
        answer.append(''.join(path)) # @step collect
        return # @step done
    if opened < n: # @step openCheck
        path.append('(') # @step open
        dfs(opened + 1, closed) # @step openCall
        path.pop() # @step openUndo
    if closed < opened: # @step closeCheck
        path.append(')') # @step close
        dfs(opened, closed + 1) # @step closeCall
        path.pop() # @step closeUndo
dfs(0, 0) # @step start
return answer # @step result`,
		javascript: `// 两个条件直接保证合法：左括号没用完才放 (；尚有未关闭的左括号才放 )。例如 path="("、opened=1、closed=0 时，两种选择都可能合法。
const answer=[],path=[]; // @step init
function dfs(opened,closed) {
    if (path.length===2*n) { // @step complete
        answer.push(path.join('')); // @step collect
        return; // @step done
    }
    if (opened<n) { // @step openCheck
        path.push('('); // @step open
        dfs(opened+1,closed); // @step openCall
        path.pop(); // @step openUndo
    }
    if (closed<opened) { // @step closeCheck
        path.push(')'); // @step close
        dfs(opened,closed+1); // @step closeCall
        path.pop(); // @step closeUndo
    }
}
dfs(0,0); // @step start
return answer; // @step result`,
		java: `// 两个条件直接保证合法：左括号没用完才放 (；尚有未关闭的左括号才放 )。例如 path="("、opened=1、closed=0 时，两种选择都可能合法。
List<String> answer=new ArrayList<>(); // @step init
dfs(n,0,0,new StringBuilder(),answer); // @step start
return answer; // @step result`,
		javaHelpers: `private void dfs(int n,int opened,int closed,StringBuilder path,List<String> answer) {
    if (path.length()==2*n) { // @step complete
        answer.add(path.toString()); // @step collect
        return; // @step done
    }
    if (opened<n) { // @step openCheck
        path.append('('); // @step open
        dfs(n,opened+1,closed,path,answer); // @step openCall
        path.deleteCharAt(path.length()-1); // @step openUndo
    }
    if (closed<opened) { // @step closeCheck
        path.append(')'); // @step close
        dfs(n,opened,closed+1,path,answer); // @step closeCall
        path.deleteCharAt(path.length()-1); // @step closeUndo
    }
}`,
		cpp: `// 两个条件直接保证合法：左括号没用完才放 (；尚有未关闭的左括号才放 )。例如 path="("、opened=1、closed=0 时，两种选择都可能合法。
vector<string> answer;string path; // @step init
function<void(int,int)> dfs = [&](int opened,int closed) {
    if ((int)path.size()==2*n) { // @step complete
        answer.push_back(path); // @step collect
        return; // @step done
    }
    if (opened<n) { // @step openCheck
        path.push_back('('); // @step open
        dfs(opened+1,closed); // @step openCall
        path.pop_back(); // @step openUndo
    }
    if (closed<opened) { // @step closeCheck
        path.push_back(')'); // @step close
        dfs(opened,closed+1); // @step closeCall
        path.pop_back(); // @step closeUndo
    }
};
dfs(0,0); // @step start
return answer; // @step result`,
	},
);
