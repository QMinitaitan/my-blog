import test from 'node:test';
import assert from 'node:assert/strict';
import { codes as code283 } from '../public/algorithm-cards/problems/283-code.js';
import { codes as code11 } from '../public/algorithm-cards/problems/11-code.js';
import { codes as code15 } from '../public/algorithm-cards/problems/15-code.js';
import { codes as code42 } from '../public/algorithm-cards/problems/42-code.js';
import * as move from '../public/algorithm-cards/problems/283.js';
import * as area from '../public/algorithm-cards/problems/11.js';
import * as three from '../public/algorithm-cards/problems/15.js';
import * as water from '../public/algorithm-cards/problems/42.js';
const executable = (codes, name) => new Function(`${codes.find(c => c.id === 'javascript').source}; return ${name};`)();
const canonical = groups => groups.map(g => [...g].sort((a,b)=>a-b).join(',')).sort();
function bruteArea(h) {let best=0;for(let i=0;i<h.length;i++)for(let j=i+1;j<h.length;j++)best=Math.max(best,Math.min(h[i],h[j])*(j-i));return best;}
function bruteWater(h) {return h.reduce((sum,v,i)=>sum+Math.max(0,Math.min(Math.max(...h.slice(0,i+1)),Math.max(...h.slice(i)))-v),0);}
function bruteThree(nums) {const groups=new Map();for(let i=0;i<nums.length;i++)for(let j=i+1;j<nums.length;j++)for(let k=j+1;k<nums.length;k++)if(nums[i]+nums[j]+nums[k]===0){const g=[nums[i],nums[j],nums[k]].sort((a,b)=>a-b);groups.set(g.join(','),g);}return [...groups.values()];}
test('four sequence algorithms agree with independent solvers and copied code',()=>{
 let seed=42;const random=()=>seed=(seed*1664525+1013904223)>>>0;
 const solveMove=executable(code283,'moveZeroes'),solveArea=executable(code11,'maxArea'),solveThree=executable(code15,'threeSum'),solveWater=executable(code42,'trap');
 for(let trial=0;trial<500;trial++) {
  const nums=Array.from({length:3+random()%9},()=>random()%11-5),height=nums.map(Math.abs);
  const expected=[...nums.filter(n=>n!==0),...nums.filter(n=>n===0)];
  assert.deepEqual(move.buildTrace({nums}).at(-1).answer,expected);const copied=[...nums];assert.equal(solveMove(copied),undefined);assert.deepEqual(copied,expected);
  assert.equal(area.buildTrace({height}).at(-1).answer,bruteArea(height));assert.equal(solveArea(height),bruteArea(height));
  assert.deepEqual(canonical(three.buildTrace({nums}).at(-1).answer),canonical(bruteThree(nums)));assert.deepEqual(canonical(solveThree([...nums])),canonical(bruteThree(nums)));
  assert.equal(water.buildTrace({height}).at(-1).answer,bruteWater(height));assert.equal(solveWater(height),bruteWater(height));
 }
});
test('every observed stage maps explicitly to four languages and old states stay independent',()=>{
 for(const [problem,codes] of [[move,code283],[area,code11],[three,code15],[water,code42]]) {
  assert.equal(codes.length,4);
  for(const e of problem.examples) {
   const input=structuredClone(e),steps=problem.buildTrace(e);
   assert.deepEqual(e,input,'trace must not mutate the selected example');
   for(const s of steps)for(const code of codes)assert.ok(code.source.split('\n')[code.lines[s.line]-1]?.trim(),`${code.id}:${s.line}`);
   const first=structuredClone(steps[0]);steps.at(-1).values[0]=999;assert.deepEqual(steps[0],first);
  }
 }
});
test('branch order, repeat skipping and zero index are visible',()=>{
 const t=three.buildTrace({nums:[-2,0,0,2,2]});assert.ok(t.some(s=>s.line==='leftSkip'));assert.ok(t.some(s=>s.line==='duplicate'));
 const w=water.buildTrace({height:[3,0,2]});assert.ok(w.some(s=>s.line==='rightWater'));assert.ok(w.some(s=>s.line==='leftWater'));assert.equal(w.at(-1).water,2);
 const m=move.buildTrace({nums:[0,1]});assert.deepEqual(m.find(s=>s.line==='swap').values,[1,0]);assert.equal(m.find(s=>s.line==='swap').write,0);
});
