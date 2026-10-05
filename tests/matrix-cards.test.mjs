import test from 'node:test';import assert from 'node:assert/strict';
const ids=['74','240','62','64','48','73'];
const modules=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}.js`)));
const resources=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}-code.js`)));
const solves=resources.map(({codes})=>new Function(`${codes[1].source};return ${codes[0].method};`)());
test('matrix search compares with exhaustive membership',()=>{
 for(let m=1;m<=7;m++)for(let n=1;n<=7;n++){
  const strict=Array.from({length:m},(_,r)=>Array.from({length:n},(_,c)=>(r*n+c)*2));
  const interleaved=Array.from({length:m},(_,r)=>Array.from({length:n},(_,c)=>r+c*2));
  for(const [i,matrix] of [[0,strict],[1,interleaved]])for(let target=-1;target<=matrix.at(-1).at(-1)+1;target++){
   const expected=matrix.flat().includes(target);assert.equal(solves[i](matrix,target),expected);assert.equal(modules[i].buildTrace({matrix,target}).at(-1).answer,expected);
  }
 }
});
test('grid dynamic programming agrees with direct path enumeration',()=>{
 function paths(grid,r=0,c=0){if(r===grid.length-1&&c===grid[0].length-1)return [grid[r][c]];return [...(r+1<grid.length?paths(grid,r+1,c):[]),...(c+1<grid[0].length?paths(grid,r,c+1):[])].map(sum=>sum+grid[r][c]);}
 for(let m=1;m<=5;m++)for(let n=1;n<=5;n++){
  const grid=Array.from({length:m},(_,r)=>Array.from({length:n},(_,c)=>(r*7+c*3)%6)),values=paths(grid);
  assert.equal(solves[2](m,n),values.length);assert.equal(modules[2].buildTrace({m,n}).at(-1).answer,values.length);
  assert.equal(solves[3](grid),Math.min(...values));assert.equal(modules[3].buildTrace({grid}).at(-1).answer,Math.min(...values));
 }
});
test('rotation and zeroing agree with coordinate-based references',()=>{
 for(let n=1;n<=12;n++){
  const matrix=Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>r*n+c)),expected=Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>matrix[n-1-c][r]));
  const copy=structuredClone(matrix);assert.equal(solves[4](copy),undefined);assert.deepEqual(copy,expected);assert.deepEqual(modules[4].buildTrace({matrix}).at(-1).answer,expected);
 }
 for(let seed=0;seed<100;seed++){
  const matrix=Array.from({length:1+seed%5},(_,r)=>Array.from({length:1+seed%7},(_,c)=>(seed+r*3+c*7)%11));
  const expected=matrix.map((row,r)=>row.map((v,c)=>matrix[r].includes(0)||matrix.some(line=>line[c]===0)?0:v));const copy=structuredClone(matrix);
  solves[5](copy);assert.deepEqual(copy,expected);assert.deepEqual(modules[5].buildTrace({matrix}).at(-1).answer,expected);
 }
});
test('matrix snapshots keep original coordinates and code mappings',()=>{
 for(let i=0;i<ids.length;i++)for(const e of modules[i].examples)for(const s of modules[i].buildTrace(e))for(const c of resources[i].codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim(),`${ids[i]} ${c.id} ${s.line}`);
 const matrix=Array.from({length:40},(_,r)=>Array.from({length:40},(_,c)=>r*40+c)),trace=modules[0].buildTrace({matrix,target:1357});
 assert.equal(trace.at(-1).answer,true);for(const step of trace){assert.ok(step.matrix.length<=8);assert.ok(step.matrix[0].length<=8);if(step.current)assert.equal(step.matrix[step.matrixRowIndices.indexOf(step.row)][step.matrixColumnIndices.indexOf(step.column)],matrix[step.row][step.column]);}
});
