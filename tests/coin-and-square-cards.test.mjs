import test from 'node:test';
import assert from 'node:assert/strict';
import * as squares from '../public/algorithm-cards/problems/279.js';
import * as coins from '../public/algorithm-cards/problems/322.js';
import { codes as code279 } from '../public/algorithm-cards/problems/279-code.js';
import { codes as code322 } from '../public/algorithm-cards/problems/322-code.js';
const solve=codes=>new Function(`${codes[1].source};return ${codes[0].method};`)();
function bfs(amount,values){const queue=[[0,0]],seen=new Set([0]);for(let i=0;i<queue.length;i++){const [total,count]=queue[i];if(total===amount)return count;for(const value of values){const next=total+value;if(next<=amount&&!seen.has(next)){seen.add(next);queue.push([next,count+1]);}}}return -1;}
test('minimum counts agree with breadth-first shortest paths',()=>{
 const numSquares=solve(code279),coinChange=solve(code322);
 for(let n=1;n<=35;n++){const values=Array.from({length:Math.floor(Math.sqrt(n))},(_,i)=>(i+1)**2),expected=bfs(n,values);assert.equal(squares.buildTrace({input:n}).at(-1).answer,expected);assert.equal(numSquares(n),expected);}
 for(const values of [[1,2,5],[2],[1,3,4],[3,5],[2,7]])for(let amount=0;amount<=30;amount++){const expected=bfs(amount,values);assert.equal(coins.buildTrace({nums:values,amount}).at(-1).answer,expected);assert.equal(coinChange(values,amount),expected);}
});
test('unreachable return and all four execution mappings are explicit',()=>{
 assert.equal(coins.buildTrace({nums:[2],amount:3}).at(-1).line,'fail');
 for(const [m,codes] of [[squares,code279],[coins,code322]])for(const e of m.examples)for(const s of m.buildTrace(e))for(const c of codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim());
});
