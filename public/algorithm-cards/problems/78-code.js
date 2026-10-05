import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("subsets", [["nums", "ints"]], "intLists", {
	python: `# dfs(start) 先保存当前 path，再逐一选 start 右侧的数字。下一层传 i+1，使每个子集的下标始终递增。
answer, path = [], [] # @step init
def dfs(start):
    answer.append(path[:]) # @step collect
    for i in range(start, len(nums)): # @step scan
        path.append(nums[i]) # @step choose
        dfs(i + 1) # @step recurse
        path.pop() # @step undo
dfs(0) # @step start
return answer # @step result`,
	javascript: `// dfs(start) 先保存当前 path，再逐一选 start 右侧的数字。下一层传 i+1，使每个子集的下标始终递增。
const answer=[],path=[]; // @step init
function dfs(start) {
    answer.push([...path]); // @step collect
    for (let i=start;i<nums.length;i++) { // @step scan
        path.push(nums[i]); // @step choose
        dfs(i+1); // @step recurse
        path.pop(); // @step undo
    }
}
dfs(0); // @step start
return answer; // @step result`,
	java: `// dfs(start) 先保存当前 path，再逐一选 start 右侧的数字。下一层传 i+1，使每个子集的下标始终递增。
List<List<Integer>> answer=new ArrayList<>(); // @step init
dfs(nums,0,new ArrayList<>(),answer); // @step start
return answer; // @step result`,
	javaHelpers: `private void dfs(int[] nums,int start,List<Integer> path,List<List<Integer>> answer) {
    answer.add(new ArrayList<>(path)); // @step collect
    for (int i=start;i<nums.length;i++) { // @step scan
        path.add(nums[i]); // @step choose
        dfs(nums,i+1,path,answer); // @step recurse
        path.remove(path.size()-1); // @step undo
    }
}`,
	cpp: `// dfs(start) 先保存当前 path，再逐一选 start 右侧的数字。下一层传 i+1，使每个子集的下标始终递增。
vector<vector<int>> answer;vector<int> path; // @step init
function<void(int)> dfs = [&](int start) {
    answer.push_back(path); // @step collect
    for (int i=start;i<(int)nums.size();i++) { // @step scan
        path.push_back(nums[i]); // @step choose
        dfs(i+1); // @step recurse
        path.pop_back(); // @step undo
    }
};
dfs(0); // @step start
return answer; // @step result`,
});
