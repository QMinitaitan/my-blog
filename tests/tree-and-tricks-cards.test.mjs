import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeTree } from '../public/algorithm-cards/shared/tree-card.js';
const ids=['94','104','136','169','75'];
const cards=await Promise.all(ids.map(async id=>({id,m:await import(`../public/algorithm-cards/problems/${id}.js`),codes:(await import(`../public/algorithm-cards/problems/${id}-code.js`)).codes})));
const solve=r=>new Function(`${r.codes.find(c=>c.id==='javascript').source};return ${r.codes[0].method};`)();
function recursiveInorder(root){return root?[...recursiveInorder(root.left),root.val,...recursiveInorder(root.right)]:[];}
function breadthDepth(root){if(!root)return 0;let level=[root],depth=0;while(level.length){depth++;level=level.flatMap(n=>[n.left,n.right]).filter(Boolean);}return depth;}
test('tree samples use the correct level-order structure, stack and actual recursion returns',()=>{
 for(const r of cards.filter(r=>['94','104'].includes(r.id)))for(const e of r.m.examples){const root=decodeTree(e.input),expected=r.id==='94'?recursiveInorder(root):breadthDepth(root);assert.deepEqual(r.m.buildTrace(e).at(-1).answer,expected);assert.deepEqual(solve(r)(root),expected);}
 const tree=decodeTree([1,null,2,3]);assert.equal(tree.right.left.val,3);assert.equal(tree.left,null);
 const depth=cards.find(r=>r.id==='104').m.buildTrace({input:[1,2,3]});assert.ok(depth.some(s=>s.line==='empty'&&s.answer===0));assert.ok(depth.some(s=>s.line==='left'&&s.variables.find(v=>v.name==='left').value===1));assert.equal(depth.at(-1).final,true);
});
test('bitwise, vote and color algorithms agree with independent counts and sorting',()=>{
 let seed=169;const random=()=>seed=(seed*1664525+1013904223)>>>0;
 for(let t=0;t<300;t++){
  const unique=random()%30-15,a=random()%30+40,b=random()%30-60,nums=[a,unique,b,a,b];
  const single=cards.find(r=>r.id==='136');assert.equal(single.m.buildTrace({nums}).at(-1).answer,unique);assert.equal(solve(single)(nums),unique);
  const majority=random()%10,others=Array.from({length:random()%6},()=>random()%10),votes=[...others,...Array(others.length+1).fill(majority)];const vote=cards.find(r=>r.id==='169');assert.equal(vote.m.buildTrace({nums:votes}).at(-1).answer,majority);assert.equal(solve(vote)(votes),majority);
  const colors=Array.from({length:1+random()%12},()=>random()%3),sort=cards.find(r=>r.id==='75'),copy=[...colors];assert.deepEqual(sort.m.buildTrace({nums:colors}).at(-1).answer,[...colors].sort());assert.equal(solve(sort)(copy),undefined);assert.deepEqual(copy,[...colors].sort());
 }
});
test('all executed phases map in every language and tree snapshots remain independent',()=>{
 for(const r of cards)for(const e of r.m.examples){const steps=r.m.buildTrace(e);for(const s of steps)for(const c of r.codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim());}
 const trace=cards.find(r=>r.id==='94').m.buildTrace({input:[2,1,3]});trace.at(-1).tree.val=999;assert.equal(trace[0].tree.val,2);assert.deepEqual(trace.find(s=>s.line==='push').stack,[2]);
});
