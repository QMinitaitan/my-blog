import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"letterCombinations",
	[["digits", "str"]],
	"stringList",
	{
		python: `# 每层处理一个数字，从它对应的字母中选一个。path 的长度就是已处理数字数；选完全部数字才保存结果。
if not digits: # @step empty
    return [] # @step fail
mapping = {'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'} # @step init
answer, path = [], []
def dfs(index):
    if index == len(digits): # @step complete
        answer.append(''.join(path)) # @step collect
        return # @step done
    for ch in mapping[digits[index]]: # @step scan
        path.append(ch) # @step choose
        dfs(index + 1) # @step recurse
        path.pop() # @step undo
dfs(0) # @step start
return answer # @step result`,
		javascript: `// 每层处理一个数字，从它对应的字母中选一个。path 的长度就是已处理数字数；选完全部数字才保存结果。
if (!digits.length) { // @step empty
    return []; // @step fail
}
const mapping={'2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz'},answer=[],path=[]; // @step init
function dfs(index) {
    if (index===digits.length) { // @step complete
        answer.push(path.join('')); // @step collect
        return; // @step done
    }
    for (const ch of mapping[digits[index]]) { // @step scan
        path.push(ch); // @step choose
        dfs(index+1); // @step recurse
        path.pop(); // @step undo
    }
}
dfs(0); // @step start
return answer; // @step result`,
		java: `// 每层处理一个数字，从它对应的字母中选一个。path 的长度就是已处理数字数；选完全部数字才保存结果。
if (digits.isEmpty()) { // @step empty
    return new ArrayList<>(); // @step fail
}
String[] mapping={"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};List<String> answer=new ArrayList<>(); // @step init
dfs(digits,0,mapping,new StringBuilder(),answer); // @step start
return answer; // @step result`,
		javaHelpers: `private void dfs(String digits,int index,String[] mapping,StringBuilder path,List<String> answer) {
    if (index==digits.length()) { // @step complete
        answer.add(path.toString()); // @step collect
        return; // @step done
    }
    for (char ch:mapping[digits.charAt(index)-'0'].toCharArray()) { // @step scan
        path.append(ch); // @step choose
        dfs(digits,index+1,mapping,path,answer); // @step recurse
        path.deleteCharAt(path.length()-1); // @step undo
    }
}`,
		cpp: `// 每层处理一个数字，从它对应的字母中选一个。path 的长度就是已处理数字数；选完全部数字才保存结果。
if (digits.empty()) { // @step empty
    return {}; // @step fail
}
vector<string> mapping{"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"},answer;string path; // @step init
function<void(int)> dfs = [&](int index) {
    if (index==(int)digits.size()) { // @step complete
        answer.push_back(path); // @step collect
        return; // @step done
    }
    for (char ch:mapping[digits[index]-'0']) { // @step scan
        path.push_back(ch); // @step choose
        dfs(index+1); // @step recurse
        path.pop_back(); // @step undo
    }
};
dfs(0); // @step start
return answer; // @step result`,
	},
);
