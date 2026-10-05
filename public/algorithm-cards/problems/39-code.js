import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"combinationSum",
	[
		["candidates", "ints"],
		["target", "int"],
	],
	"intLists",
	{
		python: `# dfs(start,remaining) 只向右选，避免交换顺序造成重复。选择下标 i 后仍传 i，允许重复；本题与子集传 i+1 的含义不同。
answer, path = [], [] # @step init
def dfs(start, remaining):
    if remaining == 0: # @step complete
        answer.append(path[:]) # @step collect
        return # @step done
    for i in range(start, len(candidates)): # @step scan
        if candidates[i] > remaining: # @step check
            continue # @step skip
        path.append(candidates[i]) # @step choose
        dfs(i, remaining - candidates[i]) # @step recurse
        path.pop() # @step undo
dfs(0, target) # @step start
return answer # @step result`,
		javascript: `// dfs(start,remaining) 只向右选，避免交换顺序造成重复。选择下标 i 后仍传 i，允许重复；本题与子集传 i+1 的含义不同。
const answer=[],path=[]; // @step init
function dfs(start,remaining) {
    if (remaining===0) { // @step complete
        answer.push([...path]); // @step collect
        return; // @step done
    }
    for (let i=start;i<candidates.length;i++) { // @step scan
        if (candidates[i]>remaining) { // @step check
            continue; // @step skip
        }
        path.push(candidates[i]); // @step choose
        dfs(i,remaining-candidates[i]); // @step recurse
        path.pop(); // @step undo
    }
}
dfs(0,target); // @step start
return answer; // @step result`,
		java: `// dfs(start,remaining) 只向右选，避免交换顺序造成重复。选择下标 i 后仍传 i，允许重复；本题与子集传 i+1 的含义不同。
List<List<Integer>> answer=new ArrayList<>(); // @step init
dfs(candidates,0,target,new ArrayList<>(),answer); // @step start
return answer; // @step result`,
		javaHelpers: `private void dfs(int[] candidates,int start,int remaining,List<Integer> path,List<List<Integer>> answer) {
    if (remaining==0) { // @step complete
        answer.add(new ArrayList<>(path)); // @step collect
        return; // @step done
    }
    for (int i=start;i<candidates.length;i++) { // @step scan
        if (candidates[i]>remaining) { // @step check
            continue; // @step skip
        }
        path.add(candidates[i]); // @step choose
        dfs(candidates,i,remaining-candidates[i],path,answer); // @step recurse
        path.remove(path.size()-1); // @step undo
    }
}`,
		cpp: `// dfs(start,remaining) 只向右选，避免交换顺序造成重复。选择下标 i 后仍传 i，允许重复；本题与子集传 i+1 的含义不同。
vector<vector<int>> answer;vector<int> path; // @step init
function<void(int,int)> dfs = [&](int start,int remaining) {
    if (remaining==0) { // @step complete
        answer.push_back(path); // @step collect
        return; // @step done
    }
    for (int i=start;i<(int)candidates.size();i++) { // @step scan
        if (candidates[i]>remaining) { // @step check
            continue; // @step skip
        }
        path.push_back(candidates[i]); // @step choose
        dfs(i,remaining-candidates[i]); // @step recurse
        path.pop_back(); // @step undo
    }
};
dfs(0,target); // @step start
return answer; // @step result`,
	},
);
