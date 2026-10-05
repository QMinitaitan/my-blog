import test from 'node:test';
import assert from 'node:assert/strict';
import * as stock from '../public/algorithm-cards/problems/121.js';
import * as reach from '../public/algorithm-cards/problems/55.js';
import * as jumps from '../public/algorithm-cards/problems/45.js';
import * as partition from '../public/algorithm-cards/problems/763.js';
import { codes as stockCodes } from '../public/algorithm-cards/problems/121-code.js';
import { codes as reachCodes } from '../public/algorithm-cards/problems/55-code.js';
import { codes as jumpsCodes } from '../public/algorithm-cards/problems/45-code.js';
import { codes as partitionCodes } from '../public/algorithm-cards/problems/763-code.js';
const solver=(codes,name)=>new Function(`${codes.find(c=>c.id==='javascript').source};return ${name};`)();
function minJumps(nums){const dist=Array(nums.length).fill(Infinity);dist[0]=0;for(let i=0;i<nums.length;i++)for(let j=i+1;j<=Math.min(nums.length-1,i+nums[i]);j++)dist[j]=Math.min(dist[j],dist[i]+1);return dist.at(-1);}
function profit(prices){let best=0;for(let i=0;i<prices.length;i++)for(let j=i+1;j<prices.length;j++)best=Math.max(best,prices[j]-prices[i]);return best;}
function brutePartition(s){let best=[];for(let mask=0;mask<(1<<(s.length-1));mask++){const pieces=[];let start=0;for(let i=0;i<s.length;i++)if(i===s.length-1 || mask>>i&1){pieces.push(s.slice(start,i+1));start=i+1;}const used=new Set();let valid=true;for(const piece of pieces){const chars=new Set(piece);if([...chars].some(c=>used.has(c)))valid=false;for(const c of chars)used.add(c);}if(valid&&pieces.length>best.length)best=pieces.map(p=>p.length);}return best;}
test('greedy results agree with exhaustive or shortest-path independent solvers',()=>{
 let seed=763;const random=()=>seed=(seed*1664525+1013904223)>>>0;
 const solveStock=solver(stockCodes,'maxProfit'),solveReach=solver(reachCodes,'canJump'),solveJumps=solver(jumpsCodes,'jump'),solvePartition=solver(partitionCodes,'partitionLabels');
 for(let t=0;t<500;t++){
  const nums=Array.from({length:1+random()%8},()=>random()%5);
  assert.equal(stock.buildTrace({nums}).at(-1).answer,profit(nums));assert.equal(solveStock(nums),profit(nums));
  const distance=minJumps(nums),reachable=Number.isFinite(distance);
  assert.equal(reach.buildTrace({nums}).at(-1).answer,reachable);assert.equal(solveReach(nums),reachable);
  if(reachable){assert.equal(jumps.buildTrace({nums}).at(-1).answer,distance);assert.equal(solveJumps(nums),distance);}
  const input=Array.from({length:1+random()%8},()=>String.fromCharCode(97+random()%3)).join('');
  assert.deepEqual(partition.buildTrace({input}).at(-1).answer,brutePartition(input));assert.deepEqual(solvePartition(input),brutePartition(input));
 }
});
test('samples, failure return, and every language-specific stage are covered',()=>{
 for(const [m,codes] of [[stock,stockCodes],[reach,reachCodes],[jumps,jumpsCodes],[partition,partitionCodes]])for(const e of m.examples){const trace=m.buildTrace(e);for(const step of trace)for(const code of codes)assert.ok(code.source.split('\n')[code.lines[step.line]-1]?.trim());}
 assert.equal(reach.buildTrace({nums:[0,1]}).at(-1).line,'fail');
 assert.equal(jumps.buildTrace({nums:[0]}).length,2);
 const trace=partition.buildTrace({input:'aba'});assert.deepEqual(trace.find(s=>s.line==='last').last,{a:0});assert.deepEqual(trace.at(-1).last,{a:2,b:1});
});
