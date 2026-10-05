import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes("permute", [["nums", "ints"]], "intLists", {
	python: `# 每一层选一个尚未使用的数字。到长度 n 时保存 path[:]；返回时先 pop，再取消 used 标记，恢复进入该分支前的状态。
answer, path = [], [] # @step init
used = [False] * len(nums)
def dfs():
    if len(path) == len(nums): # @step complete
        answer.append(path[:]) # @step collect
        return # @step done
    for i in range(len(nums)): # @step scan
        if used[i]: # @step check
            continue # @step skip
        used[i] = True # @step mark
        path.append(nums[i]) # @step choose
        dfs() # @step recurse
        path.pop() # @step undo
        used[i] = False # @step unmark
dfs() # @step start
return answer # @step result`,
	javascript: `// 每一层选一个尚未使用的数字。到长度 n 时保存 path[:]；返回时先 pop，再取消 used 标记，恢复进入该分支前的状态。
const answer=[],path=[],used=Array(nums.length).fill(false); // @step init
function dfs() {
    if (path.length===nums.length) { // @step complete
        answer.push([...path]); // @step collect
        return; // @step done
    }
    for (let i=0;i<nums.length;i++) { // @step scan
        if (used[i]) { // @step check
            continue; // @step skip
        }
        used[i]=true; // @step mark
        path.push(nums[i]); // @step choose
        dfs(); // @step recurse
        path.pop(); // @step undo
        used[i]=false; // @step unmark
    }
}
dfs(); // @step start
return answer; // @step result`,
	java: `// 每一层选一个尚未使用的数字。到长度 n 时保存 path[:]；返回时先 pop，再取消 used 标记，恢复进入该分支前的状态。
List<List<Integer>> answer=new ArrayList<>(); // @step init
dfs(nums,new boolean[nums.length],new ArrayList<>(),answer); // @step start
return answer; // @step result`,
	javaHelpers: `private void dfs(int[] nums,boolean[] used,List<Integer> path,List<List<Integer>> answer) {
    if (path.size()==nums.length) { // @step complete
        answer.add(new ArrayList<>(path)); // @step collect
        return; // @step done
    }
    for (int i=0;i<nums.length;i++) { // @step scan
        if (used[i]) { // @step check
            continue; // @step skip
        }
        used[i]=true; // @step mark
        path.add(nums[i]); // @step choose
        dfs(nums,used,path,answer); // @step recurse
        path.remove(path.size()-1); // @step undo
        used[i]=false; // @step unmark
    }
}`,
	cpp: `// 每一层选一个尚未使用的数字。到长度 n 时保存 path[:]；返回时先 pop，再取消 used 标记，恢复进入该分支前的状态。
vector<vector<int>> answer;vector<int> path;vector<bool> used(nums.size(),false); // @step init
function<void()> dfs = [&]() {
    if (path.size()==nums.size()) { // @step complete
        answer.push_back(path); // @step collect
        return; // @step done
    }
    for (int i=0;i<(int)nums.size();i++) { // @step scan
        if (used[i]) { // @step check
            continue; // @step skip
        }
        used[i]=true; // @step mark
        path.push_back(nums[i]); // @step choose
        dfs(); // @step recurse
        path.pop_back(); // @step undo
        used[i]=false; // @step unmark
    }
};
dfs(); // @step start
return answer; // @step result`,
});
