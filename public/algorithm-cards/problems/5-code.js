import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("longestPalindrome", [["s", "str"]], "str", {
	python: `# 回文一定有中心。分别尝试一个字符中心与两字符间的中心，左右同时扩展；停止时退回最后合法区间。
start, end = 0, 1 # @step init
def expand(left, right):
    while left >= 0 and right < len(s) and s[left] == s[right]: # @step check
        left -= 1 # @step left
        right += 1 # @step right
    return left + 1, right # @step bounds
for center in range(len(s)): # @step center
    left1, right1 = expand(center, center) # @step odd
    left2, right2 = expand(center, center + 1) # @step even
    if right1 - left1 >= right2 - left2: # @step choose
        candidateLeft, candidateRight = left1, right1 # @step oddChoice
    else:
        candidateLeft, candidateRight = left2, right2 # @step evenChoice
    if candidateRight - candidateLeft > end - start: # @step longer
        start, end = candidateLeft, candidateRight # @step update
return s[start:end] # @step result`,
	javascript: `// 回文一定有中心。分别尝试一个字符中心与两字符间的中心，左右同时扩展；停止时退回最后合法区间。
let start=0,end=1; // @step init
function expand(left,right) {
    while (left>=0 && right<s.length && s[left]===s[right]) { // @step check
        left--; // @step left
        right++; // @step right
    }
    return [left+1,right]; // @step bounds
}
for (let center=0;center<s.length;center++) { // @step center
    const [left1,right1]=expand(center,center); // @step odd
    const [left2,right2]=expand(center,center+1); // @step even
    let candidateLeft,candidateRight;
    if (right1-left1>=right2-left2) { // @step choose
        candidateLeft=left1;candidateRight=right1; // @step oddChoice
    } else {
        candidateLeft=left2;candidateRight=right2; // @step evenChoice
    }
    if (candidateRight-candidateLeft>end-start) { // @step longer
        start=candidateLeft;end=candidateRight; // @step update
    }
}
return s.slice(start,end); // @step result`,
	java: `// 回文一定有中心。分别尝试一个字符中心与两字符间的中心，左右同时扩展；停止时退回最后合法区间。
int start=0,end=1; // @step init
for (int center=0;center<s.length();center++) { // @step center
    int[] odd=expand(s,center,center); // @step odd
    int[] even=expand(s,center,center+1); // @step even
    int candidateLeft,candidateRight;
    if (odd[1]-odd[0]>=even[1]-even[0]) { // @step choose
        candidateLeft=odd[0];candidateRight=odd[1]; // @step oddChoice
    } else {
        candidateLeft=even[0];candidateRight=even[1]; // @step evenChoice
    }
    if (candidateRight-candidateLeft>end-start) { // @step longer
        start=candidateLeft;end=candidateRight; // @step update
    }
}
return s.substring(start,end); // @step result`,
	javaHelpers: `private int[] expand(String s,int left,int right) {
    while (left>=0 && right<s.length() && s.charAt(left)==s.charAt(right)) { // @step check
        left--; // @step left
        right++; // @step right
    }
    return new int[]{left+1,right}; // @step bounds
}`,
	cpp: `// 回文一定有中心。分别尝试一个字符中心与两字符间的中心，左右同时扩展；停止时退回最后合法区间。
int start=0,end=1; // @step init
auto expand = [&](int left,int right) {
    while (left>=0 && right<(int)s.size() && s[left]==s[right]) { // @step check
        left--; // @step left
        right++; // @step right
    }
    return pair<int,int>{left+1,right}; // @step bounds
};
for (int center=0;center<(int)s.size();center++) { // @step center
    auto [left1,right1]=expand(center,center); // @step odd
    auto [left2,right2]=expand(center,center+1); // @step even
    int candidateLeft,candidateRight;
    if (right1-left1>=right2-left2) { // @step choose
        candidateLeft=left1;candidateRight=right1; // @step oddChoice
    } else {
        candidateLeft=left2;candidateRight=right2; // @step evenChoice
    }
    if (candidateRight-candidateLeft>end-start) { // @step longer
        start=candidateLeft;end=candidateRight; // @step update
    }
}
return s.substr(start,end-start); // @step result`,
});
