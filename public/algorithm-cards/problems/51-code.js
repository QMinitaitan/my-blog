import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"solveNQueens",
	[["n", "int"]],
	"stringLists",
	{
		python: `# 按行递归自然避免同行。列号 col 相同或 row-col、row+col 相同表示冲突。
board = [['.'] * n for _ in range(n)]
cols, down, up, answer = set(), set(), set(), [] # @step init
def dfs(row):
    if row == n: # @step complete
        answer.append([''.join(line) for line in board]) # @step collect
        return # @step done
    for col in range(n): # @step scan
        if col in cols or row - col in down or row + col in up: # @step conflict
            continue # @step skip
        board[row][col] = 'Q' # @step place
        cols.add(col); down.add(row - col); up.add(row + col) # @step mark
        dfs(row + 1) # @step recurse
        cols.remove(col); down.remove(row - col); up.remove(row + col) # @step unmark
        board[row][col] = '.' # @step undo
dfs(0) # @step start
return answer # @step result`,
		javascript: `// 按行递归自然避免同行。列号 col 相同或 row-col、row+col 相同表示冲突。
const board=Array.from({length:n},()=>Array(n).fill('.')),cols=new Set(),down=new Set(),up=new Set(),answer=[]; // @step init
function dfs(row){
    if(row===n){ // @step complete
        answer.push(board.map(line=>line.join(''))); // @step collect
        return; // @step done
    }
    for(let col=0;col<n;col++){ // @step scan
        if(cols.has(col)||down.has(row-col)||up.has(row+col)){ // @step conflict
            continue; // @step skip
        }
        board[row][col]='Q'; // @step place
        cols.add(col);down.add(row-col);up.add(row+col); // @step mark
        dfs(row+1); // @step recurse
        cols.delete(col);down.delete(row-col);up.delete(row+col); // @step unmark
        board[row][col]='.'; // @step undo
    }
}
dfs(0); // @step start
return answer; // @step result`,
		java: `// 按行递归自然避免同行。列号 col 相同或 row-col、row+col 相同表示冲突。
List<List<String>> answer=new ArrayList<>();char[][] board=new char[n][n];for(char[] line:board)Arrays.fill(line,'.');Set<Integer> cols=new HashSet<>(),down=new HashSet<>(),up=new HashSet<>(); // @step init
dfs(0,n,board,cols,down,up,answer); // @step start
return answer; // @step result`,
		javaHelpers: `private void dfs(int row,int n,char[][] board,Set<Integer> cols,Set<Integer> down,Set<Integer> up,List<List<String>> answer){
    if(row==n){ // @step complete
        List<String> solution=new ArrayList<>();for(char[] line:board)solution.add(new String(line));answer.add(solution); // @step collect
        return; // @step done
    }
    for(int col=0;col<n;col++){ // @step scan
        if(cols.contains(col)||down.contains(row-col)||up.contains(row+col)){ // @step conflict
            continue; // @step skip
        }
        board[row][col]='Q'; // @step place
        cols.add(col);down.add(row-col);up.add(row+col); // @step mark
        dfs(row+1,n,board,cols,down,up,answer); // @step recurse
        cols.remove(col);down.remove(row-col);up.remove(row+col); // @step unmark
        board[row][col]='.'; // @step undo
    }
}`,
		cpp: `// 按行递归自然避免同行。列号 col 相同或 row-col、row+col 相同表示冲突。
vector<string> board(n,string(n,'.'));unordered_set<int> cols,down,up;vector<vector<string>> answer; // @step init
function<void(int)> dfs=[&](int row){
    if(row==n){ // @step complete
        answer.push_back(board); // @step collect
        return; // @step done
    }
    for(int col=0;col<n;col++){ // @step scan
        if(cols.count(col)||down.count(row-col)||up.count(row+col)){ // @step conflict
            continue; // @step skip
        }
        board[row][col]='Q'; // @step place
        cols.insert(col);down.insert(row-col);up.insert(row+col); // @step mark
        dfs(row+1); // @step recurse
        cols.erase(col);down.erase(row-col);up.erase(row+col); // @step unmark
        board[row][col]='.'; // @step undo
    }
};
dfs(0); // @step start
return answer; // @step result`,
	},
);
