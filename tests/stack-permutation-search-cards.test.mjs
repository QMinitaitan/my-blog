import test from 'node:test';
import assert from 'node:assert/strict';
const ids=['20','739','31','34','33'];
const modules=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}.js`)));
const resources=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}-code.js`)));
const solves=resources.map(({codes})=>new Function(`${codes[1].source};return ${codes[0].method};`)());
test('stack results agree with grammar reduction and forward scanning',()=>{
 const alphabet='()[]{}';let seed=67;const random=n=>((seed=(seed*1664525+1013904223)>>>0)%n);
 for(let trial=0;trial<500;trial++){
  const s=Array.from({length:1+random(12)},()=>alphabet[random(6)]).join('');let reduced=s;
  while(/\(\)|\[\]|\{\}/.test(reduced))reduced=reduced.replace(/\(\)|\[\]|\{\}/g,'');
  assert.equal(solves[0](s),reduced==='');assert.equal(modules[0].buildTrace({s}).at(-1).answer,reduced==='');
  const temperatures=Array.from({length:1+random(15)},()=>30+random(71));
  const expected=temperatures.map((v,i)=>{const next=temperatures.findIndex((w,j)=>j>i&&w>v);return next<0?0:next-i;});
  assert.deepEqual(solves[1](temperatures),expected);assert.deepEqual(modules[1].buildTrace({temperatures}).at(-1).answer,expected);
 }
});
test('next permutation agrees with exhaustive unique permutation ordering',()=>{
 function permutations(values){if(!values.length)return [[]];return values.flatMap((v,i)=>permutations(values.filter((_,j)=>i!==j)).map(rest=>[v,...rest]));}
 for(const base of [[1],[1,2,3],[1,1,2],[1,2,3,4]]){
  const ordered=[...new Set(permutations(base).map(a=>a.join(',')))].sort().map(s=>s.split(',').map(Number));
  for(let i=0;i<ordered.length;i++){const nums=[...ordered[i]],expected=ordered[(i+1)%ordered.length];assert.equal(solves[2](nums),undefined);assert.deepEqual(nums,expected);assert.deepEqual(modules[2].buildTrace({nums:ordered[i]}).at(-1).answer,expected);}
 }
});
test('binary boundaries and rotated search agree with linear search',()=>{
 for(let n=0;n<30;n++)for(let target=-2;target<12;target++){
  const nums=Array.from({length:n},(_,i)=>Math.floor(i/3));const expected=[nums.indexOf(target),nums.lastIndexOf(target)];
  assert.deepEqual(solves[3](nums,target),expected);assert.deepEqual(modules[3].buildTrace({nums,target}).at(-1).answer,expected);
 }
 for(let n=1;n<20;n++)for(let offset=0;offset<n;offset++)for(let target=-1;target<=n;target++){
  const sorted=Array.from({length:n},(_,i)=>i),nums=[...sorted.slice(offset),...sorted.slice(0,offset)];
  assert.equal(solves[4](nums,target),nums.indexOf(target));assert.equal(modules[4].buildTrace({nums,target}).at(-1).answer,nums.indexOf(target));
 }
});
test('each trace has independent snapshots and explicit four-language mappings',()=>{
 for(let i=0;i<ids.length;i++)for(const e of modules[i].examples){const trace=modules[i].buildTrace(e);assert.ok(trace.length);for(const s of trace)for(const c of resources[i].codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim(),`${ids[i]} ${c.id} ${s.line}`);}
 const trace=modules[1].buildTrace(modules[1].examples[0]);assert.deepEqual(trace[0].stack,[]);assert.deepEqual(trace[0].answer,Array(8).fill(0));
});
