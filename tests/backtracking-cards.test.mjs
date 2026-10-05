import test from 'node:test';import assert from 'node:assert/strict';
const ids=['46','78','39','22','17'],modules=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}.js`))),resources=await Promise.all(ids.map(id=>import(`../public/algorithm-cards/problems/${id}-code.js`)));
const solves=resources.map(({codes})=>new Function(`${codes[1].source};return ${codes[0].method};`)());const canonical=a=>a.map(v=>JSON.stringify(v)).sort();
test('permutations and subsets contain exactly the expected combinations',()=>{
 for(let n=1;n<=5;n++){const nums=Array.from({length:n},(_,i)=>i);let permutations=[[]];for(const value of nums)permutations=permutations.flatMap(p=>Array.from({length:p.length+1},(_,i)=>[...p.slice(0,i),value,...p.slice(i)]));const subsets=Array.from({length:2**n},(_,mask)=>nums.filter((_,i)=>mask&(1<<i)));assert.deepEqual(canonical(solves[0](nums)),canonical(permutations));assert.deepEqual(canonical(modules[0].buildTrace({nums}).at(-1).answer),canonical(permutations));assert.deepEqual(canonical(solves[1](nums)),canonical(subsets));assert.deepEqual(canonical(modules[1].buildTrace({nums}).at(-1).answer),canonical(subsets));}
});
test('combination sums match independent count-vector enumeration',()=>{
 for(const candidates of [[2,3,5],[5,2,3],[2],[3,7]])for(let target=1;target<=12;target++){const expected=[];function enumerate(index,path,sum){if(index===candidates.length){if(sum===target)expected.push(path);return;}for(let count=0;sum+count*candidates[index]<=target;count++)enumerate(index+1,[...path,...Array(count).fill(candidates[index])],sum+count*candidates[index]);}enumerate(0,[],0);assert.deepEqual(canonical(solves[2](candidates,target)),canonical(expected));assert.deepEqual(canonical(modules[2].buildTrace({candidates,target}).at(-1).answer),canonical(expected));}
});
test('parentheses match exhaustive balanced strings; phone matches Cartesian products',()=>{
 for(let n=1;n<=4;n++){const expected=[];for(let mask=0;mask<2**(2*n);mask++){let balance=0,text='',valid=true;for(let i=0;i<2*n;i++){const ch=mask&(1<<i)?'(':')';text+=ch;balance+=ch==='('?1:-1;if(balance<0)valid=false;}if(valid&&balance===0)expected.push(text);}assert.deepEqual(solves[3](n).sort(),expected.sort());assert.deepEqual(modules[3].buildTrace({n}).at(-1).answer.sort(),expected);}
 const mapping={'2':'abc','3':'def','7':'pqrs','9':'wxyz'};for(const digits of ['', '2','23','79','22']){let expected=digits?['']:[];for(const d of digits)expected=expected.flatMap(p=>[...mapping[d]].map(ch=>p+ch));assert.deepEqual(solves[4](digits),expected);assert.deepEqual(modules[4].buildTrace({digits}).at(-1).answer,expected);}
});
test('backtracking mappings are explicit and result copies survive undo',()=>{
 for(let i=0;i<ids.length;i++)for(const e of modules[i].examples)for(const s of modules[i].buildTrace(e))for(const c of resources[i].codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim(),`${ids[i]} ${c.id} ${s.line}`);
 for(const i of [0,1,2,3,4]){const trace=modules[i].buildTrace(modules[i].examples[0]),saved=trace.find(s=>s.line==='collect');assert.ok(saved);assert.ok(saved.path.length||i===1);assert.deepEqual(trace.at(-1).path,[]);assert.notEqual(saved.answer,trace.at(-1).answer);}
});
