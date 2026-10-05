import test from 'node:test';import assert from 'node:assert/strict';
const ids=['141','142','160'],modules=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}.js`))),resources=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}-code.js`)));
const solves=resources.map(({codes})=>new Function(`${codes[1].source};return ${codes[0].method};`)());
const create=graph=>{const nodes=new Map(graph.nodes.map(n=>[n.id,{val:n.val,next:null}]));for(const n of graph.nodes)nodes.get(n.id).next=nodes.get(n.next)??null;return {nodes,heads:Object.fromEntries(Object.entries(graph.heads).map(([name,id])=>[name,nodes.get(id)??null]))};};
test('cycle detection and entrance match visited-object reference',()=>{
 for(let n=0;n<=20;n++)for(let pos=-1;pos<n;pos++){const example={input:Array.from({length:n},()=>1),pos},graph=create(modules[0].buildInput(example));let current=graph.heads.head;const visited=new Set();while(current&&!visited.has(current)){visited.add(current);current=current.next;}assert.equal(solves[0](graph.heads.head),current!==null);assert.equal(solves[1](graph.heads.head),current);assert.equal(modules[0].buildTrace(example).at(-1).answer,current!==null);assert.equal(modules[1].buildTrace(example).at(-1).answer,pos<0?null:`N${pos}`);}
});
test('intersection compares identities despite equal values and unequal lengths',()=>{
 for(let a=0;a<=5;a++)for(let b=0;b<=5;b++)for(let shared=0;shared<=3;shared++){if(!a&&!b&&!shared)continue;const e={input:[Array(a).fill(1),Array(b).fill(1),Array(shared).fill(1)]},graph=create(modules[2].buildInput(e)),expected=graph.nodes.get('C0')??null;assert.equal(solves[2](graph.heads.headA,graph.heads.headB),expected);assert.equal(modules[2].buildTrace(e).at(-1).answer,shared?'C0':null);}
});
test('identity trace phases have independent language mappings',()=>{for(let i=0;i<ids.length;i++)for(const e of modules[i].examples)for(const s of modules[i].buildTrace(e))for(const c of resources[i].codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim());});
