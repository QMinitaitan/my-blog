import { solutionCodes } from "../shared/solution-code.js";
export const codes = solutionCodes(
	"setZeroes",
	[["matrix", "matrix"]],
	"void",
	{
		python: `rows, columns = set(), set() # @step init
for row in range(len(matrix)): # @step scanRow
    for column in range(len(matrix[0])): # @step scanColumn
        if matrix[row][column] == 0: # @step zero
            rows.add(row)
            columns.add(column) # @step mark
# 必须先记录原来的零，避免新写的零再次扩散。
for row in range(len(matrix)): # @step writeRow
    for column in range(len(matrix[0])): # @step writeColumn
        if row in rows or column in columns: # @step check
            matrix[row][column] = 0 # @step clear
return # @step result`,
		javascript: `// 教学版使用行列集合：先只读原矩阵，记录零的位置；第二轮写入，避免把新写的零当成原始零继续扩散。
const rows=new Set(),columns=new Set(); // @step init
for (let row=0;row<matrix.length;row++) { // @step scanRow
    for (let column=0;column<matrix[0].length;column++) { // @step scanColumn
        if (matrix[row][column]===0) { // @step zero
            rows.add(row);columns.add(column); // @step mark
        }
    }
}
for (let row=0;row<matrix.length;row++) { // @step writeRow
    for (let column=0;column<matrix[0].length;column++) { // @step writeColumn
        if (rows.has(row) || columns.has(column)) { // @step check
            matrix[row][column]=0; // @step clear
        }
    }
}
return; // @step result`,
		java: `// 教学版使用行列集合：先只读原矩阵，记录零的位置；第二轮写入，避免把新写的零当成原始零继续扩散。
Set<Integer> rows=new HashSet<>(),columns=new HashSet<>(); // @step init
for (int row=0;row<matrix.length;row++) { // @step scanRow
    for (int column=0;column<matrix[0].length;column++) { // @step scanColumn
        if (matrix[row][column]==0) { // @step zero
            rows.add(row);columns.add(column); // @step mark
        }
    }
}
for (int row=0;row<matrix.length;row++) { // @step writeRow
    for (int column=0;column<matrix[0].length;column++) { // @step writeColumn
        if (rows.contains(row) || columns.contains(column)) { // @step check
            matrix[row][column]=0; // @step clear
        }
    }
}
return; // @step result`,
		cpp: `// 教学版使用行列集合：先只读原矩阵，记录零的位置；第二轮写入，避免把新写的零当成原始零继续扩散。
unordered_set<int> rows,columns; // @step init
for (int row=0;row<(int)matrix.size();row++) { // @step scanRow
    for (int column=0;column<(int)matrix[0].size();column++) { // @step scanColumn
        if (matrix[row][column]==0) { // @step zero
            rows.insert(row);columns.insert(column); // @step mark
        }
    }
}
for (int row=0;row<(int)matrix.size();row++) { // @step writeRow
    for (int column=0;column<(int)matrix[0].size();column++) { // @step writeColumn
        if (rows.count(row) || columns.count(column)) { // @step check
            matrix[row][column]=0; // @step clear
        }
    }
}
return; // @step result`,
	},
);
