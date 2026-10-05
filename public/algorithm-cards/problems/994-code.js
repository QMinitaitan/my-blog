import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"orangesRotting",
	[["grid", "matrix"]],
	"int",
	{
		python: `# 把全部初始腐烂格同时加入 BFS。每分钟先固定队列长度，新感染格留给下一分钟；入队立即标记为 2，防止重复计数。
from collections import deque
m, n = len(grid), len(grid[0])
queue, fresh, minutes = deque(), 0, 0 # @step init
for r in range(m): # @step row
    for c in range(n): # @step column
        if grid[r][c] == 2: # @step rotten
            queue.append((r,c)) # @step seed
        elif grid[r][c] == 1: # @step freshCheck
            fresh += 1 # @step fresh
while queue and fresh > 0: # @step loop
    size = len(queue) # @step size
    minutes += 1 # @step minute
    for _ in range(size): # @step scan
        row, column = queue.popleft() # @step pop
        for dr, dc in [(0,1),(1,0),(0,-1),(-1,0)]:
            nr, nc = row + dr, column + dc # @step neighbor
            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1: # @step check
                grid[nr][nc] = 2 # @step infect
                fresh -= 1 # @step decrease
                queue.append((nr,nc)) # @step push
if fresh > 0: # @step remaining
    return -1 # @step fail
return minutes # @step result`,
		javascript: `const m=grid.length,n=grid[0].length,queue=[];let fresh=0,minutes=0,head=0; // @step init
for (let r=0;r<m;r++) { // @step row
    for (let c=0;c<n;c++) { // @step column
        if (grid[r][c]===2) { // @step rotten
            queue.push([r,c]); // @step seed
        } else if (grid[r][c]===1) { // @step freshCheck
            fresh++; // @step fresh
        }
    }
}
// head 前的项已经处理，待处理队列为 queue.slice(head)。
while (head<queue.length && fresh>0) { // @step loop
    const size=queue.length-head; // @step size
    minutes++; // @step minute
    for (let count=0;count<size;count++) { // @step scan
        const [row,column]=queue[head++]; // @step pop
        for (const [dr,dc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
            const nr=row+dr,nc=column+dc; // @step neighbor
            if (nr>=0 && nr<m && nc>=0 && nc<n && grid[nr][nc]===1) { // @step check
                grid[nr][nc]=2; // @step infect
                fresh--; // @step decrease
                queue.push([nr,nc]); // @step push
            }
        }
    }
}
if (fresh>0) { // @step remaining
    return -1; // @step fail
}
return minutes; // @step result`,
		java: `// 把全部初始腐烂格同时加入 BFS。每分钟先固定队列长度，新感染格留给下一分钟；入队立即标记为 2，防止重复计数。
int m=grid.length,n=grid[0].length,fresh=0,minutes=0;Deque<int[]> queue=new ArrayDeque<>();int[][] directions={{0,1},{1,0},{0,-1},{-1,0}}; // @step init
for (int r=0;r<m;r++) { // @step row
    for (int c=0;c<n;c++) { // @step column
        if (grid[r][c]==2) { // @step rotten
            queue.add(new int[]{r,c}); // @step seed
        } else if (grid[r][c]==1) { // @step freshCheck
            fresh++; // @step fresh
        }
    }
}
while (!queue.isEmpty() && fresh>0) { // @step loop
    int size=queue.size(); // @step size
    minutes++; // @step minute
    for (int count=0;count<size;count++) { // @step scan
        int[] node=queue.remove();int row=node[0],column=node[1]; // @step pop
        for (int[] direction:directions) {
            int nr=row+direction[0],nc=column+direction[1]; // @step neighbor
            if (nr>=0 && nr<m && nc>=0 && nc<n && grid[nr][nc]==1) { // @step check
                grid[nr][nc]=2; // @step infect
                fresh--; // @step decrease
                queue.add(new int[]{nr,nc}); // @step push
            }
        }
    }
}
if (fresh>0) { // @step remaining
    return -1; // @step fail
}
return minutes; // @step result`,
		cpp: `// 把全部初始腐烂格同时加入 BFS。每分钟先固定队列长度，新感染格留给下一分钟；入队立即标记为 2，防止重复计数。
int m=grid.size(),n=grid[0].size(),fresh=0,minutes=0;queue<pair<int,int>> pending;vector<pair<int,int>> directions{{0,1},{1,0},{0,-1},{-1,0}}; // @step init
for (int r=0;r<m;r++) { // @step row
    for (int c=0;c<n;c++) { // @step column
        if (grid[r][c]==2) { // @step rotten
            pending.emplace(r,c); // @step seed
        } else if (grid[r][c]==1) { // @step freshCheck
            fresh++; // @step fresh
        }
    }
}
while (!pending.empty() && fresh>0) { // @step loop
    int size=pending.size(); // @step size
    minutes++; // @step minute
    for (int count=0;count<size;count++) { // @step scan
        auto [row,column]=pending.front();pending.pop(); // @step pop
        for (auto [dr,dc]:directions) {
            int nr=row+dr,nc=column+dc; // @step neighbor
            if (nr>=0 && nr<m && nc>=0 && nc<n && grid[nr][nc]==1) { // @step check
                grid[nr][nc]=2; // @step infect
                fresh--; // @step decrease
                pending.emplace(nr,nc); // @step push
            }
        }
    }
}
if (fresh>0) { // @step remaining
    return -1; // @step fail
}
return minutes; // @step result`,
	},
);
