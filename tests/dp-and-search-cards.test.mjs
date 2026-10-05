import test from 'node:test';
import assert from 'node:assert/strict';
const ids=['35','153','70','198','300','416'];
const resources=await Promise.all(ids.map(async id=>({id,m:await import(`../public/algorithm-cards/problems/${id}.js`),codes:(await import(`../public/algorithm-cards/problems/${id}-code.js`)).codes})));
const executable=(codes,name)=>new Function(`${codes.find(c=>c.id==='javascript').source};return ${name};`)();
function subsets(nums,mode){let best=0;for(let mask=0;mask<1<<nums.length;mask++){let sum=0,last=-Infinity,length=0,valid=true;for(let i=0;i<nums.length;i++)if(mask>>i&1){sum+=nums[i];if(mode==='rob'&&i>0&&(mask>>(i-1)&1))valid=false;if(mode==='lis'&&nums[i]<=last)valid=false;last=nums[i];length++;}if(mode==='partition'&&sum*2===nums.reduce((a,b)=>a+b,0))return true;if(valid)best=Math.max(best,mode==='lis'?length:sum);}return mode==='partition'?false:best;}
test('binary search and DP results agree with independent enumeration',()=>{
 let seed=416;const random=()=>seed=(seed*1664525+1013904223)>>>0;
 for(let t=0;t<300;t++){
  const nums=Array.from({length:1+random()%8},()=>1+random()%9),sorted=[...new Set(nums)].sort((a,b)=>a-b),target=random()%12,k=random()%sorted.length,rotated=[...sorted.slice(k),...sorted.slice(0,k)];
  const expected=sorted.findIndex(v=>v>=target);
  const cases={'35':[{nums:sorted,target},expected<0?sorted.length:expected],'153':[{nums:rotated},sorted[0]],'198':[{nums},subsets(nums,'rob')],'300':[{nums},subsets(nums,'lis')],'416':[{nums},subsets(nums,'partition')]};
  for(const r of resources.filter(r=>r.id!=='70')){const [e,answer]=cases[r.id];assert.equal(r.m.buildTrace(e).at(-1).answer,answer,r.id);const args=r.codes[0].args.map(name=>e[name]);assert.equal(executable(r.codes,r.codes[0].method)(...args),answer,r.id);}
 }
 const r=resources.find(r=>r.id==='70');let a=1,b=1;for(let n=1;n<=45;n++){assert.equal(r.m.buildTrace({input:n}).at(-1).answer,b);assert.equal(executable(r.codes,'climbStairs')(n),b);[a,b]=[b,a+b];}
});
test('DP transitions preserve old cells and all language mappings exist',()=>{
 for(const {m,codes} of resources)for(const e of m.examples){const steps=m.buildTrace(e);for(const s of steps)for(const code of codes)assert.ok(code.source.split('\n')[code.lines[s.line]-1]?.trim());}
 const partition=resources.find(r=>r.id==='416').m;
 const steps=partition.buildTrace({nums:[1,2,5]});assert.equal(steps.at(-1).answer,false);assert.ok(steps.some(s=>s.line==='capacity'&&s.j===4&&s.num===1));assert.deepEqual(steps.find(s=>s.line==='base').values,[true,false,false,false,false]);
 const climb=resources.find(r=>r.id==='70').m.buildTrace({input:5});assert.deepEqual(climb[0].values,[0,0,0,0,0,0]);assert.equal(climb.at(-1).values[5],8);
});
