import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"exist",
	[
		["board", "charMatrix"],
		["word", "str"],
	],
	"bool",
	{
		python: `# 每个格都尝试作起点，匹配成功就标记当前路径，再试四个方向。失败时撤销标记，让其他路径仍可使用该格。
rows, columns = len(board), len(board[0])
visited = set() # @step init
def dfs(row, col, index):
    if index == len(word): # @step complete
        return True # @step done
    if not (0 <= row < rows and 0 <= col < columns) or (row, col) in visited or board[row][col] != word[index]: # @step invalid
        return False # @step reject
    visited.add((row, col)) # @step mark
    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]: # @step direction
        if dfs(row + dr, col + dc, index + 1): # @step recurse
            visited.remove((row, col)) # @step restoreHit
            return True # @step hit
    visited.remove((row, col)) # @step undo
    return False # @step fail
for row in range(rows): # @step row
    for col in range(columns): # @step col
        if dfs(row, col, 0): # @step start
            return True # @step found
return False # @step result`,
		javascript: `// 每个格都尝试作起点，匹配成功就标记当前路径，再试四个方向。失败时撤销标记，让其他路径仍可使用该格。
const rows=board.length,columns=board[0].length,visited=new Set(); // @step init
function dfs(row,col,index){
    if(index===word.length){ // @step complete
        return true; // @step done
    }
    if(row<0||row>=rows||col<0||col>=columns||visited.has(row*columns+col)||board[row][col]!==word[index]){ // @step invalid
        return false; // @step reject
    }
    visited.add(row*columns+col); // @step mark
    for(const [dr,dc] of [[1,0],[-1,0],[0,1],[0,-1]]){ // @step direction
        if(dfs(row+dr,col+dc,index+1)){ // @step recurse
            visited.delete(row*columns+col); // @step restoreHit
            return true; // @step hit
        }
    }
    visited.delete(row*columns+col); // @step undo
    return false; // @step fail
}
for(let row=0;row<rows;row++){ // @step row
    for(let col=0;col<columns;col++){ // @step col
        if(dfs(row,col,0)){ // @step start
            return true; // @step found
        }
    }
}
return false; // @step result`,
		java: `// 每个格都尝试作起点，匹配成功就标记当前路径，再试四个方向。失败时撤销标记，让其他路径仍可使用该格。
int rows=board.length,columns=board[0].length;boolean[][] visited=new boolean[rows][columns]; // @step init
for(int row=0;row<rows;row++){ // @step row
    for(int col=0;col<columns;col++){ // @step col
        if(dfs(board,word,visited,row,col,0)){ // @step start
            return true; // @step found
        }
    }
}
return false; // @step result`,
		javaHelpers: `private boolean dfs(char[][] board,String word,boolean[][] visited,int row,int col,int index){
    if(index==word.length()){ // @step complete
        return true; // @step done
    }
    if(row<0||row>=board.length||col<0||col>=board[0].length||visited[row][col]||board[row][col]!=word.charAt(index)){ // @step invalid
        return false; // @step reject
    }
    visited[row][col]=true; // @step mark
    for(int[] direction:new int[][]{{1,0},{-1,0},{0,1},{0,-1}}){int dr=direction[0],dc=direction[1]; // @step direction
        if(dfs(board,word,visited,row+dr,col+dc,index+1)){ // @step recurse
            visited[row][col]=false; // @step restoreHit
            return true; // @step hit
        }
    }
    visited[row][col]=false; // @step undo
    return false; // @step fail
}`,
		cpp: `// 每个格都尝试作起点，匹配成功就标记当前路径，再试四个方向。失败时撤销标记，让其他路径仍可使用该格。
int rows=board.size(),columns=board[0].size();vector<vector<bool>> visited(rows,vector<bool>(columns)); // @step init
function<bool(int,int,int)> dfs=[&](int row,int col,int index)->bool{
    if(index==(int)word.size()){ // @step complete
        return true; // @step done
    }
    if(row<0||row>=rows||col<0||col>=columns||visited[row][col]||board[row][col]!=word[index]){ // @step invalid
        return false; // @step reject
    }
    visited[row][col]=true; // @step mark
    for(auto [dr,dc]:vector<pair<int,int>>{{1,0},{-1,0},{0,1},{0,-1}}){ // @step direction
        if(dfs(row+dr,col+dc,index+1)){ // @step recurse
            visited[row][col]=false; // @step restoreHit
            return true; // @step hit
        }
    }
    visited[row][col]=false; // @step undo
    return false; // @step fail
};
for(int row=0;row<rows;row++){ // @step row
    for(int col=0;col<columns;col++){ // @step col
        if(dfs(row,col,0)){ // @step start
            return true; // @step found
        }
    }
}
return false; // @step result`,
	},
);
