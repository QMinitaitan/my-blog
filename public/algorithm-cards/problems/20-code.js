import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("isValid", [["s", "str"]], "bool", {
	python: `# 例如 ([]): ( 入栈、[ 入栈、] 弹出 [、) 弹出 (。栈顶始终是下一次必须关闭的括号。
stack = [] # @step init
pairs = {')': '(', ']': '[', '}': '{'}
for ch in s: # @step scan
    if ch in pairs: # @step close
        if not stack or stack[-1] != pairs[ch]: # @step check
            return False # @step fail
        stack.pop() # @step pop
    else:
        stack.append(ch) # @step push
return not stack # @step result`,
	javascript: `// 例如 ([]): ( 入栈、[ 入栈、] 弹出 [、) 弹出 (。栈顶始终是下一次必须关闭的括号。
const stack = []; // @step init
const pairs = {')':'(', ']':'[', '}':'{'};
for (const ch of s) { // @step scan
    if (ch in pairs) { // @step close
        if (!stack.length || stack[stack.length-1] !== pairs[ch]) { // @step check
            return false; // @step fail
        }
        stack.pop(); // @step pop
    } else {
        stack.push(ch); // @step push
    }
}
return stack.length === 0; // @step result`,
	java: `// 例如 ([]): ( 入栈、[ 入栈、] 弹出 [、) 弹出 (。栈顶始终是下一次必须关闭的括号。
Deque<Character> stack = new ArrayDeque<>(); // @step init
Map<Character,Character> pairs = Map.of(')','(',']','[','}','{');
for (char ch : s.toCharArray()) { // @step scan
    if (pairs.containsKey(ch)) { // @step close
        if (stack.isEmpty() || stack.peek() != pairs.get(ch).charValue()) { // @step check
            return false; // @step fail
        }
        stack.pop(); // @step pop
    } else {
        stack.push(ch); // @step push
    }
}
return stack.isEmpty(); // @step result`,
	cpp: `// 例如 ([]): ( 入栈、[ 入栈、] 弹出 [、) 弹出 (。栈顶始终是下一次必须关闭的括号。
vector<char> stack; // @step init
unordered_map<char,char> pairs{{')','('},{']','['},{'}','{'}};
for (char ch : s) { // @step scan
    if (pairs.count(ch)) { // @step close
        if (stack.empty() || stack.back() != pairs[ch]) { // @step check
            return false; // @step fail
        }
        stack.pop_back(); // @step pop
    } else {
        stack.push_back(ch); // @step push
    }
}
return stack.empty(); // @step result`,
});
