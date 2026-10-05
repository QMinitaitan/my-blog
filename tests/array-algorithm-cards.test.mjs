import test from 'node:test';
import assert from 'node:assert/strict';
import * as kadane from '../public/algorithm-cards/problems/53.js';
import * as merge from '../public/algorithm-cards/problems/56.js';
import * as rotate from '../public/algorithm-cards/problems/189.js';
import * as product from '../public/algorithm-cards/problems/238.js';
import * as missing from '../public/algorithm-cards/problems/41.js';
const modules=[[kadane,'53','maxSubArray'],[merge,'56','merge'],[rotate,'189','rotate'],[product,'238','productExceptSelf'],[missing,'41','firstMissingPositive']];
const resources=await Promise.all(modules.map(async([m,id,name])=>[m,(await import(`../public/algorithm-cards/problems/${id}-code.js`)).codes,name]));
const executable=(codes,name)=>new Function(`${codes.find(c=>c.id==='javascript').source};return ${name};`)();
function maxSum(nums){let best=-Infinity;for(let i=0;i<nums.length;i++){let sum=0;for(let j=i;j<nums.length;j++){sum+=nums[j];best=Math.max(best,sum);}}return best;}
function products(nums){return nums.map((_,i)=>nums.reduce((p,v,j)=>j===i?p:p*v,1));}
function firstMissing(nums){const set=new Set(nums);let n=1;while(set.has(n))n++;return n;}
function independentMerge(intervals){const remaining=intervals.map(a=>[...a]),out=[];while(remaining.length){const current=remaining.pop();let changed=true;while(changed){changed=false;for(let i=remaining.length-1;i>=0;i--){const a=remaining[i];if(a[0]<=current[1]&&current[0]<=a[1]){current[0]=Math.min(current[0],a[0]);current[1]=Math.max(current[1],a[1]);remaining.splice(i,1);changed=true;}}}out.push(current);}return out.sort((a,b)=>a[0]-b[0]);}
test('array traces and copied JavaScript agree with independent solvers',()=>{
 let seed=238;const random=()=>seed=(seed*1664525+1013904223)>>>0;
 const solvers=Object.fromEntries(resources.map(([,c,n])=>[n,executable(c,n)]));
 for(let t=0;t<500;t++){
  const nums=Array.from({length:2+random()%7},()=>random()%9-4),k=random()%20;
  assert.equal(kadane.buildTrace({nums}).at(-1).answer,maxSum(nums));assert.equal(solvers.maxSubArray(nums),maxSum(nums));
  assert.deepEqual(product.buildTrace({nums}).at(-1).answer,products(nums));assert.deepEqual(solvers.productExceptSelf(nums),products(nums));
  assert.equal(missing.buildTrace({nums}).at(-1).answer,firstMissing(nums));assert.equal(solvers.firstMissingPositive([...nums]),firstMissing(nums));
  const expected=nums.map((_,i)=>nums[(i-k%nums.length+nums.length)%nums.length]),copy=[...nums];
  assert.deepEqual(rotate.buildTrace({nums,k}).at(-1).answer,expected);assert.equal(solvers.rotate(copy,k),undefined);assert.deepEqual(copy,expected);
  const input=Array.from({length:1+random()%7},()=>{const a=random()%10,b=random()%10;return [Math.min(a,b),Math.max(a,b)];});
  assert.deepEqual(merge.buildTrace({input}).at(-1).answer,independentMerge(input));assert.deepEqual(solvers.merge(structuredClone(input)),independentMerge(input));
 }
});
test('sample stages have four explicit code mappings, including helper calls and early return',()=>{
 for(const [m,codes] of resources)for(const e of m.examples){const original=structuredClone(e),trace=m.buildTrace(e);assert.deepEqual(e,original);for(const step of trace)for(const code of codes)assert.ok(code.source.split('\n')[code.lines[step.line]-1]?.trim(),`${code.id}:${step.line}`);}
 assert.equal(missing.buildTrace({nums:[1,1]}).at(-1).answer,2);
 assert.equal(kadane.buildTrace({nums:[-5]}).at(-1).answer,-5);
});
