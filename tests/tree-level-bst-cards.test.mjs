import test from 'node:test';import assert from 'node:assert/strict';import {decodeTree} from '../public/algorithm-cards/shared/tree-card.js';
const ids=['102','199','98'],modules=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}.js`))),resources=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}-code.js`)));
const solves=resources.map(({codes})=>new Function(`${codes[1].source};return ${codes[0].method};`)());
test('level order and right view agree with independent depth-first grouping',()=>{
 let seed=18;const random=n=>((seed=(seed*1664525+1013904223)>>>0)%n);
 for(let trial=0;trial<300;trial++){const input=Array.from({length:1+random(18)},(_,i)=>i>0&&random(4)===0?null:random(31)-15),tree=decodeTree(input),levels=[];function visit(node,depth){if(!node)return;(levels[depth]??=[]).push(node.val);visit(node.left,depth+1);visit(node.right,depth+1);}visit(tree,0);const view=levels.map(layer=>layer.at(-1));assert.deepEqual(solves[0](tree),levels);assert.deepEqual(modules[0].buildTrace({input}).at(-1).answer,levels);assert.deepEqual(solves[1](tree),view);assert.deepEqual(modules[1].buildTrace({input}).at(-1).answer,view);}
});
test('BST validation agrees with ancestor bounds and handles integer extremes',()=>{
 const valid=(node,low=-Infinity,high=Infinity)=>!node||node.val>low&&node.val<high&&valid(node.left,low,node.val)&&valid(node.right,node.val,high);
 for(const e of modules[2].examples){const expected=valid(decodeTree(e.input));assert.equal(solves[2](decodeTree(e.input)),expected);assert.equal(modules[2].buildTrace(e).at(-1).answer,expected);}
 for(let value=-5;value<=5;value++)for(let left=-5;left<=5;left++)for(let right=-5;right<=5;right++){const input=[value,left,right],expected=valid(decodeTree(input));assert.equal(solves[2](decodeTree(input)),expected);assert.equal(modules[2].buildTrace({input}).at(-1).answer,expected);}
});
test('tree phases exist in every language and snapshots retain earlier queue state',()=>{
 for(let i=0;i<ids.length;i++)for(const e of modules[i].examples)for(const s of modules[i].buildTrace(e))for(const c of resources[i].codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim());
 const trace=modules[0].buildTrace(modules[0].examples[0]);assert.deepEqual(trace.find(s=>s.line==='init').stack,[3]);assert.deepEqual(trace.find(s=>s.line==='init').answer,[]);
});
