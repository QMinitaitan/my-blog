import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"findMedianSortedArrays",
	[
		["nums1", "ints"],
		["nums2", "ints"],
	],
	"float",
	{
		python: `# 在较短数组上二分切口 i，另一个切口 j=half-i，使左侧总数固定。只需左A≤右B、左B≤右A，就能保证所有左侧值不大于右侧值。
a, b = nums1, nums2 # @step arrays
if len(a) > len(b): # @step shorter
    a, b = b, a # @step swap
m, n = len(a), len(b)
left, right, half = 0, m, (m + n + 1) // 2 # @step init
while left <= right: # @step loop
    i = (left + right) // 2 # @step cutA
    j = half - i # @step cutB
    leftA = a[i-1] if i else float('-inf') # @step leftA
    rightA = a[i] if i < m else float('inf') # @step rightA
    leftB = b[j-1] if j else float('-inf') # @step leftB
    rightB = b[j] if j < n else float('inf') # @step rightB
    if leftA <= rightB and leftB <= rightA: # @step valid
        if (m + n) % 2: # @step odd
            return float(max(leftA, leftB)) # @step oddResult
        return (max(leftA, leftB) + min(rightA, rightB)) / 2 # @step evenResult
    if leftA > rightB: # @step direction
        right = i - 1 # @step decrease
    else:
        left = i + 1 # @step increase
raise ValueError('输入应为已排序数组') # @step error`,
		javascript: `// 在较短数组上二分切口 i，另一个切口 j=half-i，使左侧总数固定。只需左A≤右B、左B≤右A，就能保证所有左侧值不大于右侧值。
let a=nums1,b=nums2; // @step arrays
if (a.length>b.length) { // @step shorter
    [a,b]=[b,a]; // @step swap
}
const m=a.length,n=b.length,half=Math.floor((m+n+1)/2);let left=0,right=m; // @step init
while (left<=right) { // @step loop
    const i=Math.floor((left+right)/2); // @step cutA
    const j=half-i; // @step cutB
    const leftA=i?a[i-1]:-Infinity; // @step leftA
    const rightA=i<m?a[i]:Infinity; // @step rightA
    const leftB=j?b[j-1]:-Infinity; // @step leftB
    const rightB=j<n?b[j]:Infinity; // @step rightB
    if (leftA<=rightB && leftB<=rightA) { // @step valid
        if ((m+n)%2) { // @step odd
            return Math.max(leftA,leftB); // @step oddResult
        }
        return (Math.max(leftA,leftB)+Math.min(rightA,rightB))/2; // @step evenResult
    }
    if (leftA>rightB) { // @step direction
        right=i-1; // @step decrease
    } else {
        left=i+1; // @step increase
    }
}
throw new Error('输入应为已排序数组'); // @step error`,
		java: `// 在较短数组上二分切口 i，另一个切口 j=half-i，使左侧总数固定。只需左A≤右B、左B≤右A，就能保证所有左侧值不大于右侧值。
int[] a=nums1,b=nums2; // @step arrays
if (a.length>b.length) { // @step shorter
    int[] tmp=a;a=b;b=tmp; // @step swap
}
int m=a.length,n=b.length,half=(m+n+1)/2,left=0,right=m; // @step init
while (left<=right) { // @step loop
    int i=left+(right-left)/2; // @step cutA
    int j=half-i; // @step cutB
    double leftA=i>0?a[i-1]:Double.NEGATIVE_INFINITY; // @step leftA
    double rightA=i<m?a[i]:Double.POSITIVE_INFINITY; // @step rightA
    double leftB=j>0?b[j-1]:Double.NEGATIVE_INFINITY; // @step leftB
    double rightB=j<n?b[j]:Double.POSITIVE_INFINITY; // @step rightB
    if (leftA<=rightB && leftB<=rightA) { // @step valid
        if ((m+n)%2==1) { // @step odd
            return Math.max(leftA,leftB); // @step oddResult
        }
        return (Math.max(leftA,leftB)+Math.min(rightA,rightB))/2; // @step evenResult
    }
    if (leftA>rightB) { // @step direction
        right=i-1; // @step decrease
    } else {
        left=i+1; // @step increase
    }
}
throw new IllegalArgumentException("输入应为已排序数组"); // @step error`,
		cpp: `// 在较短数组上二分切口 i，另一个切口 j=half-i，使左侧总数固定。只需左A≤右B、左B≤右A，就能保证所有左侧值不大于右侧值。
auto* a=&nums1;auto* b=&nums2; // @step arrays
if (a->size()>b->size()) { // @step shorter
    swap(a,b); // @step swap
}
int m=a->size(),n=b->size(),half=(m+n+1)/2,left=0,right=m; // @step init
while (left<=right) { // @step loop
    int i=left+(right-left)/2; // @step cutA
    int j=half-i; // @step cutB
    double leftA=i>0?(*a)[i-1]:-numeric_limits<double>::infinity(); // @step leftA
    double rightA=i<m?(*a)[i]:numeric_limits<double>::infinity(); // @step rightA
    double leftB=j>0?(*b)[j-1]:-numeric_limits<double>::infinity(); // @step leftB
    double rightB=j<n?(*b)[j]:numeric_limits<double>::infinity(); // @step rightB
    if (leftA<=rightB && leftB<=rightA) { // @step valid
        if ((m+n)%2) { // @step odd
            return max(leftA,leftB); // @step oddResult
        }
        return (max(leftA,leftB)+min(rightA,rightB))/2; // @step evenResult
    }
    if (leftA>rightB) { // @step direction
        right=i-1; // @step decrease
    } else {
        left=i+1; // @step increase
    }
}
return 0; // @step error`,
	},
);
