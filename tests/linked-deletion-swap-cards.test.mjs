import test from 'node:test';import assert from 'node:assert/strict';
const ids=['19','24'],modules=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}.js`))),resources=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}-code.js`)));
class ListNode{constructor(val=0,next=null){this.val=val;this.next=next;}}
const make=values=>values.reduceRight((next,val)=>new ListNode(val,next),null),encode=node=>{const values=[],seen=new Set();while(node){assert.ok(!seen.has(node));seen.add(node);values.push(node.val);node=node.next;}return values;};
const solves=resources.map(({codes})=>new Function('ListNode',`${codes[1].source};return ${codes[0].method};`)(ListNode));
test('deletion and pair swap agree with array position references',()=>{
 for(let length=0;length<=25;length++){const input=Array.from({length},(_,i)=>i);for(let n=1;n<=length;n++){const expected=input.filter((_,i)=>i!==length-n);assert.deepEqual(encode(solves[0](make(input),n)),expected);assert.deepEqual(modules[0].buildTrace({input,n}).at(-1).answer,expected);}const expected=[...input];for(let i=0;i+1<length;i+=2)[expected[i],expected[i+1]]=[expected[i+1],expected[i]];assert.deepEqual(encode(solves[1](make(input))),expected);assert.deepEqual(modules[1].buildTrace({input}).at(-1).answer,expected);}
});
test('all deletion/swap phases map to each language',()=>{for(let i=0;i<ids.length;i++)for(const e of modules[i].examples)for(const s of modules[i].buildTrace(e))for(const c of resources[i].codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim());});
