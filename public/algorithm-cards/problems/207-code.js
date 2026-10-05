import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"canFinish",
	[
		["numCourses", "int"],
		["prerequisites", "matrix"],
	],
	"bool",
	{
		python: `# 入度记录仍需等待的先修数量。队列只放入度 0 的课程；完成一门就降低它的后继入度。
from collections import deque
graph = [[] for _ in range(numCourses)]
indegree = [0] * numCourses # @step init
for course, prerequisite in prerequisites: # @step edge
    graph[prerequisite].append(course) # @step link
    indegree[course] += 1 # @step degree
queue = deque() # @step queue
for course in range(numCourses): # @step scan
    if indegree[course] == 0: # @step zero
        queue.append(course) # @step seed
completed = 0 # @step count
while queue: # @step loop
    course = queue.popleft() # @step pop
    completed += 1 # @step complete
    for following in graph[course]: # @step neighbor
        indegree[following] -= 1 # @step decrease
        if indegree[following] == 0: # @step ready
            queue.append(following) # @step push
return completed == numCourses # @step result`,
		javascript: `// 入度记录仍需等待的先修数量。队列只放入度 0 的课程；完成一门就降低它的后继入度。
const graph=Array.from({length:numCourses},()=>[]),indegree=Array(numCourses).fill(0); // @step init
for (const [course,prerequisite] of prerequisites) { // @step edge
    graph[prerequisite].push(course); // @step link
    indegree[course]++; // @step degree
}
const queue=[];let head=0; // @step queue
for (let course=0;course<numCourses;course++) { // @step scan
    if (indegree[course]===0) { // @step zero
        queue.push(course); // @step seed
    }
}
let completed=0; // @step count
while (head<queue.length) { // @step loop
    const course=queue[head++]; // @step pop
    completed++; // @step complete
    for (const following of graph[course]) { // @step neighbor
        indegree[following]--; // @step decrease
        if (indegree[following]===0) { // @step ready
            queue.push(following); // @step push
        }
    }
}
return completed===numCourses; // @step result`,
		java: `// 入度记录仍需等待的先修数量。队列只放入度 0 的课程；完成一门就降低它的后继入度。
List<List<Integer>> graph=new ArrayList<>();for(int i=0;i<numCourses;i++)graph.add(new ArrayList<>());int[] indegree=new int[numCourses]; // @step init
for (int[] pair:prerequisites) { // @step edge
    int course=pair[0],prerequisite=pair[1];
    graph.get(prerequisite).add(course); // @step link
    indegree[course]++; // @step degree
}
Deque<Integer> queue=new ArrayDeque<>(); // @step queue
for (int course=0;course<numCourses;course++) { // @step scan
    if (indegree[course]==0) { // @step zero
        queue.add(course); // @step seed
    }
}
int completed=0; // @step count
while (!queue.isEmpty()) { // @step loop
    int course=queue.remove(); // @step pop
    completed++; // @step complete
    for (int following:graph.get(course)) { // @step neighbor
        indegree[following]--; // @step decrease
        if (indegree[following]==0) { // @step ready
            queue.add(following); // @step push
        }
    }
}
return completed==numCourses; // @step result`,
		cpp: `// 入度记录仍需等待的先修数量。队列只放入度 0 的课程；完成一门就降低它的后继入度。
vector<vector<int>> graph(numCourses);vector<int> indegree(numCourses,0); // @step init
for (const auto& pair:prerequisites) { // @step edge
    int course=pair[0],prerequisite=pair[1];
    graph[prerequisite].push_back(course); // @step link
    indegree[course]++; // @step degree
}
queue<int> pending; // @step queue
for (int course=0;course<numCourses;course++) { // @step scan
    if (indegree[course]==0) { // @step zero
        pending.push(course); // @step seed
    }
}
int completed=0; // @step count
while (!pending.empty()) { // @step loop
    int course=pending.front();pending.pop(); // @step pop
    completed++; // @step complete
    for (int following:graph[course]) { // @step neighbor
        indegree[following]--; // @step decrease
        if (indegree[following]==0) { // @step ready
            pending.push(following); // @step push
        }
    }
}
return completed==numCourses; // @step result`,
	},
);
