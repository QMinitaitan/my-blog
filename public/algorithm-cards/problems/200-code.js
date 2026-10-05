import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"numIslands",
	[["grid", "charMatrix"]],
	"int",
	{
		python: `# 扫描发现一个未访问的 1 就计一个岛，用显式栈把整块连通陆地改为 0。入栈前标记，避免重复搜索；不使用递归，长条岛也不会耗尽调用栈。
m, n, answer = len(grid), len(grid[0]), 0 # @step init
for r in range(m): # @step scanRow
    for c in range(n): # @step scanColumn
        if grid[r][c] == '1': # @step land
            answer += 1 # @step island
            grid[r][c] = '0' # @step markStart
            stack = [(r, c)] # @step initStack
            while stack: # @step loop
                row, column = stack.pop() # @step pop
                for dr, dc in [(0,1),(1,0),(0,-1),(-1,0)]:
                    nr, nc = row + dr, column + dc # @step neighbor
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1': # @step check
                        grid[nr][nc] = '0' # @step mark
                        stack.append((nr,nc)) # @step push
return answer # @step result`,
		javascript: `// 扫描发现一个未访问的 1 就计一个岛，用显式栈把整块连通陆地改为 0。入栈前标记，避免重复搜索；不使用递归，长条岛也不会耗尽调用栈。
const m=grid.length,n=grid[0].length;let answer=0; // @step init
for (let r=0;r<m;r++) { // @step scanRow
    for (let c=0;c<n;c++) { // @step scanColumn
        if (grid[r][c]==='1') { // @step land
            answer++; // @step island
            grid[r][c]='0'; // @step markStart
            const stack=[[r,c]]; // @step initStack
            while (stack.length) { // @step loop
                const [row,column]=stack.pop(); // @step pop
                for (const [dr,dc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
                    const nr=row+dr,nc=column+dc; // @step neighbor
                    if (nr>=0 && nr<m && nc>=0 && nc<n && grid[nr][nc]==='1') { // @step check
                        grid[nr][nc]='0'; // @step mark
                        stack.push([nr,nc]); // @step push
                    }
                }
            }
        }
    }
}
return answer; // @step result`,
		java: `// 扫描发现一个未访问的 1 就计一个岛，用显式栈把整块连通陆地改为 0。入栈前标记，避免重复搜索；不使用递归，长条岛也不会耗尽调用栈。
int m=grid.length,n=grid[0].length,answer=0;int[][] directions={{0,1},{1,0},{0,-1},{-1,0}}; // @step init
for (int r=0;r<m;r++) { // @step scanRow
    for (int c=0;c<n;c++) { // @step scanColumn
        if (grid[r][c]=='1') { // @step land
            answer++; // @step island
            grid[r][c]='0'; // @step markStart
            Deque<int[]> stack=new ArrayDeque<>();stack.push(new int[]{r,c}); // @step initStack
            while (!stack.isEmpty()) { // @step loop
                int[] node=stack.pop();int row=node[0],column=node[1]; // @step pop
                for (int[] direction:directions) {
                    int nr=row+direction[0],nc=column+direction[1]; // @step neighbor
                    if (nr>=0 && nr<m && nc>=0 && nc<n && grid[nr][nc]=='1') { // @step check
                        grid[nr][nc]='0'; // @step mark
                        stack.push(new int[]{nr,nc}); // @step push
                    }
                }
            }
        }
    }
}
return answer; // @step result`,
		cpp: `// 扫描发现一个未访问的 1 就计一个岛，用显式栈把整块连通陆地改为 0。入栈前标记，避免重复搜索；不使用递归，长条岛也不会耗尽调用栈。
int m=grid.size(),n=grid[0].size(),answer=0;vector<pair<int,int>> directions{{0,1},{1,0},{0,-1},{-1,0}}; // @step init
for (int r=0;r<m;r++) { // @step scanRow
    for (int c=0;c<n;c++) { // @step scanColumn
        if (grid[r][c]=='1') { // @step land
            answer++; // @step island
            grid[r][c]='0'; // @step markStart
            vector<pair<int,int>> stack{{r,c}}; // @step initStack
            while (!stack.empty()) { // @step loop
                auto [row,column]=stack.back();stack.pop_back(); // @step pop
                for (auto [dr,dc]:directions) {
                    int nr=row+dr,nc=column+dc; // @step neighbor
                    if (nr>=0 && nr<m && nc>=0 && nc<n && grid[nr][nc]=='1') { // @step check
                        grid[nr][nc]='0'; // @step mark
                        stack.emplace_back(nr,nc); // @step push
                    }
                }
            }
        }
    }
}
return answer; // @step result`,
	},
);
