import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"merge",
	[["intervals", "matrix"]],
	"matrix",
	{
		python: `# 按左端点排序，当前区间只需与最后一个合并结果比较；端点相等也算重叠。
intervals.sort(key=lambda interval: interval[0]) # @step sort
answer = [] # @step init
for start, end in intervals: # @step item
    if not answer or start > answer[-1][1]: # @step separate
        answer.append([start, end]) # @step append
    else:
        answer[-1][1] = max(answer[-1][1], end) # @step extend
return answer # @step result`,
		javascript: `// 按左端点排序，当前区间只需与最后一个合并结果比较；端点相等也算重叠。
intervals.sort((a, b) => a[0] - b[0]); // @step sort
const answer = []; // @step init
for (const [start, end] of intervals) { // @step item
    if (!answer.length || start > answer[answer.length - 1][1]) { // @step separate
        answer.push([start, end]); // @step append
    } else {
        answer[answer.length - 1][1] = Math.max(answer[answer.length - 1][1], end); // @step extend
    }
}
return answer; // @step result`,
		java: `// 按左端点排序，当前区间只需与最后一个合并结果比较；端点相等也算重叠。
Arrays.sort(intervals, Comparator.comparingInt(interval -> interval[0])); // @step sort
List<int[]> answer = new ArrayList<>(); // @step init
for (int[] interval : intervals) {
    int start = interval[0], end = interval[1]; // @step item
    if (answer.isEmpty() || start > answer.get(answer.size() - 1)[1]) { // @step separate
        answer.add(new int[]{start, end}); // @step append
    } else {
        answer.get(answer.size() - 1)[1] = Math.max(answer.get(answer.size() - 1)[1], end); // @step extend
    }
}
return answer.toArray(new int[0][]); // @step result`,
		cpp: `// 按左端点排序，当前区间只需与最后一个合并结果比较；端点相等也算重叠。
sort(intervals.begin(), intervals.end()); // @step sort
vector<vector<int>> answer; // @step init
for (const auto& interval : intervals) {
    int start = interval[0], end = interval[1]; // @step item
    if (answer.empty() || start > answer.back()[1]) { // @step separate
        answer.push_back({start, end}); // @step append
    } else {
        answer.back()[1] = max(answer.back()[1], end); // @step extend
    }
}
return answer; // @step result`,
	},
);
