import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"spiralOrder",
	[["matrix", "matrix"]],
	"intList",
	{
		python: `# 教学版记录 visited，并按右、下、左、上循环。每次先读取，再判断下一格是否可进入；遇阻就顺时针转向。
m, n = len(matrix), len(matrix[0]) # @step init
visited = [[False] * n for _ in range(m)]
directions = [(0,1), (1,0), (0,-1), (-1,0)]
row = column = direction = 0
answer = []
for _ in range(m * n): # @step scan
    answer.append(matrix[row][column]) # @step collect
    visited[row][column] = True # @step mark
    nextRow = row + directions[direction][0] # @step nextRow
    nextColumn = column + directions[direction][1] # @step nextColumn
    if not (0 <= nextRow < m and 0 <= nextColumn < n) or visited[nextRow][nextColumn]: # @step check
        direction = (direction + 1) % 4 # @step turn
    row += directions[direction][0]
    column += directions[direction][1] # @step move
return answer # @step result`,
		javascript: `// 教学版记录 visited，并按右、下、左、上循环。每次先读取，再判断下一格是否可进入；遇阻就顺时针转向。
const m=matrix.length,n=matrix[0].length,visited=Array.from({length:m},()=>Array(n).fill(false)),directions=[[0,1],[1,0],[0,-1],[-1,0]],answer=[];let row=0,column=0,direction=0; // @step init
for (let count=0;count<m*n;count++) { // @step scan
    answer.push(matrix[row][column]); // @step collect
    visited[row][column]=true; // @step mark
    const nextRow=row+directions[direction][0]; // @step nextRow
    const nextColumn=column+directions[direction][1]; // @step nextColumn
    if (nextRow<0 || nextRow>=m || nextColumn<0 || nextColumn>=n || visited[nextRow][nextColumn]) { // @step check
        direction=(direction+1)%4; // @step turn
    }
    row+=directions[direction][0];column+=directions[direction][1]; // @step move
}
return answer; // @step result`,
		java: `// 教学版记录 visited，并按右、下、左、上循环。每次先读取，再判断下一格是否可进入；遇阻就顺时针转向。
int m=matrix.length,n=matrix[0].length,row=0,column=0,direction=0;boolean[][] visited=new boolean[m][n];int[][] directions={{0,1},{1,0},{0,-1},{-1,0}};List<Integer> answer=new ArrayList<>(); // @step init
for (int count=0;count<m*n;count++) { // @step scan
    answer.add(matrix[row][column]); // @step collect
    visited[row][column]=true; // @step mark
    int nextRow=row+directions[direction][0]; // @step nextRow
    int nextColumn=column+directions[direction][1]; // @step nextColumn
    if (nextRow<0 || nextRow>=m || nextColumn<0 || nextColumn>=n || visited[nextRow][nextColumn]) { // @step check
        direction=(direction+1)%4; // @step turn
    }
    row+=directions[direction][0];column+=directions[direction][1]; // @step move
}
return answer; // @step result`,
		cpp: `// 教学版记录 visited，并按右、下、左、上循环。每次先读取，再判断下一格是否可进入；遇阻就顺时针转向。
int m=matrix.size(),n=matrix[0].size(),row=0,column=0,direction=0;vector<vector<bool>> visited(m,vector<bool>(n,false));vector<vector<int>> directions{{0,1},{1,0},{0,-1},{-1,0}};vector<int> answer; // @step init
for (int count=0;count<m*n;count++) { // @step scan
    answer.push_back(matrix[row][column]); // @step collect
    visited[row][column]=true; // @step mark
    int nextRow=row+directions[direction][0]; // @step nextRow
    int nextColumn=column+directions[direction][1]; // @step nextColumn
    if (nextRow<0 || nextRow>=m || nextColumn<0 || nextColumn>=n || visited[nextRow][nextColumn]) { // @step check
        direction=(direction+1)%4; // @step turn
    }
    row+=directions[direction][0];column+=directions[direction][1]; // @step move
}
return answer; // @step result`,
	},
);
