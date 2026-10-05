import test from 'node:test';import assert from 'node:assert/strict';
const ids=['206','234','21','2'],modules=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}.js`))),resources=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}-code.js`)));
class ListNode {constructor(val=0,next=null){this.val=val;this.next=next;}}
const make=values=>values.reduceRight((next,val)=>new ListNode(val,next),null),encode=node=>{const values=[],seen=new Set();while(node){assert.ok(!seen.has(node));seen.add(node);values.push(node.val);node=node.next;}return values;};
const solves=resources.map(({codes})=>new Function('ListNode',`${codes[1].source};return ${codes[0].method};`)(ListNode));
test('reversal preserves node identities and snapshot arrows show real changes',()=>{
 for(let n=0;n<=20;n++){const input=Array.from({length:n},(_,i)=>i%3),head=make(input),original=[];for(let p=head;p;p=p.next)original.push(p);const result=solves[0](head),reversed=[];for(let p=result;p;p=p.next)reversed.push(p);assert.deepEqual(reversed,[...original].reverse());assert.deepEqual(encode(result),[...input].reverse());assert.deepEqual(modules[0].buildTrace({input}).at(-1).answer,[...input].reverse());}
 const trace=modules[0].buildTrace({input:[1,2,3]});assert.equal(trace[0].nodes[0].next,'N1');assert.equal(trace.find(s=>s.line==='link').nodes[0].next,null);
});
test('palindrome and sorted merge agree with array references',()=>{
 let seed=206;const random=n=>((seed=(seed*1664525+1013904223)>>>0)%n);for(let trial=0;trial<300;trial++){const input=Array.from({length:1+random(12)},()=>random(10)),expected=input.every((v,i)=>v===input[input.length-1-i]);assert.equal(solves[1](make(input)),expected);assert.equal(modules[1].buildTrace({input}).at(-1).answer,expected);const l1=Array.from({length:random(9)},()=>random(11)-5).sort((a,b)=>a-b),l2=Array.from({length:random(9)},()=>random(11)-5).sort((a,b)=>a-b),merged=[...l1,...l2].sort((a,b)=>a-b);assert.deepEqual(encode(solves[2](make(l1),make(l2))),merged);assert.deepEqual(modules[2].buildTrace({l1,l2}).at(-1).answer,merged);}
});
test('digit addition agrees with arithmetic and retains final carry',()=>{
 const digits=n=>String(n).split('').reverse().map(Number);
 for(let a=0;a<300;a+=7)for(let b=0;b<300;b+=11){const l1=digits(a),l2=digits(b),expected=digits(a+b);assert.deepEqual(encode(solves[3](make(l1),make(l2))),expected);assert.deepEqual(modules[3].buildTrace({l1,l2}).at(-1).answer,expected);}
 assert.deepEqual(modules[3].buildTrace({l1:[9,9],l2:[1]}).at(-1).answer,[0,0,1]);
});
test('linked-list phases map in four languages; large snapshots stay bounded',()=>{
 for(let i=0;i<ids.length;i++)for(const e of modules[i].examples)for(const s of modules[i].buildTrace(e))for(const c of resources[i].codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim(),`${ids[i]} ${c.id} ${s.line}`);
 const input=Array.from({length:1000},(_,i)=>i),trace=modules[0].buildTrace({input});assert.deepEqual(trace.at(-1).answer,[...input].reverse());assert.ok(trace.every(s=>s.nodes.length<=16));assert.equal(trace[0].nodeLength,1000);
});
