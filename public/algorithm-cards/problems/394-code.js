import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("decodeString", [["s", "str"]], "str", {
	python: `# 栈记住外层上下文。读到左括号时先保存前缀与次数，右括号时取回并展开。
stack, current, number = [], "", 0 # @step init
for ch in s: # @step scan
    if ch.isdigit(): # @step digit
        number = number * 10 + int(ch) # @step number
    elif ch == '[': # @step open
        stack.append((current, number)) # @step push
        current, number = "", 0 # @step reset
    elif ch == ']': # @step close
        previous, repeat = stack.pop() # @step pop
        current = previous + current * repeat # @step expand
    else:
        current += ch # @step letter
return current # @step result`,
	javascript: `// 栈记住外层上下文。读到左括号时先保存前缀与次数，右括号时取回并展开。
const stack=[];let current='',number=0; // @step init
for(const ch of s){ // @step scan
    if(ch>='0'&&ch<='9'){ // @step digit
        number=number*10+Number(ch); // @step number
    }else if(ch==='['){ // @step open
        stack.push([current,number]); // @step push
        current='';number=0; // @step reset
    }else if(ch===']'){ // @step close
        const [previous,repeat]=stack.pop(); // @step pop
        current=previous+current.repeat(repeat); // @step expand
    }else{
        current+=ch; // @step letter
    }
}
return current; // @step result`,
	java: `// 栈记住外层上下文。读到左括号时先保存前缀与次数，右括号时取回并展开。
Deque<String> prefixes=new ArrayDeque<>();Deque<Integer> counts=new ArrayDeque<>();String current="";int number=0; // @step init
for(char ch:s.toCharArray()){ // @step scan
    if(Character.isDigit(ch)){ // @step digit
        number=number*10+ch-'0'; // @step number
    }else if(ch=='['){ // @step open
        prefixes.addLast(current);counts.addLast(number); // @step push
        current="";number=0; // @step reset
    }else if(ch==']'){ // @step close
        String previous=prefixes.removeLast();int repeat=counts.removeLast(); // @step pop
        StringBuilder expanded=new StringBuilder(previous);for(int i=0;i<repeat;i++)expanded.append(current);current=expanded.toString(); // @step expand
    }else{
        current+=ch; // @step letter
    }
}
return current; // @step result`,
	cpp: `// 栈记住外层上下文。读到左括号时先保存前缀与次数，右括号时取回并展开。
vector<pair<string,int>> stack;string current;int number=0; // @step init
for(char ch:s){ // @step scan
    if(ch>='0'&&ch<='9'){ // @step digit
        number=number*10+ch-'0'; // @step number
    }else if(ch=='['){ // @step open
        stack.push_back({current,number}); // @step push
        current="";number=0; // @step reset
    }else if(ch==']'){ // @step close
        auto [previous,repeat]=stack.back();stack.pop_back(); // @step pop
        string expanded=previous;for(int i=0;i<repeat;i++)expanded+=current;current=expanded; // @step expand
    }else{
        current+=ch; // @step letter
    }
}
return current; // @step result`,
});
