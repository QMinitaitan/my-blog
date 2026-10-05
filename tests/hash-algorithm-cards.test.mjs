import test from 'node:test';
import assert from 'node:assert/strict';
import * as anagrams from '../public/algorithm-cards/problems/49.js';
import * as consecutive from '../public/algorithm-cards/problems/128.js';
import { codes as codes49 } from '../public/algorithm-cards/problems/49-code.js';
import { codes as codes128 } from '../public/algorithm-cards/problems/128-code.js';
const solve49 = new Function(`${codes49[1].source}; return groupAnagrams;`)();
const solve128 = new Function(`${codes128[1].source}; return longestConsecutive;`)();
const canonical = groups => groups.map(g => [...g].sort().join('|')).sort();
function independentGroups(strs) {
 const groups = [], signatures = [];
 for (const word of strs) {
  const counts = Array(26).fill(0);
  for (const char of word) counts[char.charCodeAt(0)-97]++;
  const signature = counts.join(',');
  let i = signatures.indexOf(signature);
  if (i < 0) { i = groups.length; signatures.push(signature); groups.push([]); }
  groups[i].push(word);
 }
 return groups;
}
function sortedLongest(nums) {
 const values = [...new Set(nums)].sort((a,b)=>a-b);
 let best = 0, run = 0, prev = null;
 for (const n of values) { run = prev !== null && n === prev+1 ? run+1 : 1; best=Math.max(best,run); prev=n; }
 return best;
}
test('49 samples and 500 random cases agree with character-count grouping', () => {
 let seed=49;
 const random=()=>seed=(seed*1664525+1013904223)>>>0;
 const cases=[...anagrams.examples,...Array.from({length:500},()=>({strs:Array.from({length:1+random()%15},()=>Array.from({length:random()%8},()=>String.fromCharCode(97+random()%4)).join(''))}))];
 for (const e of cases) {
  const result=anagrams.buildTrace(e).at(-1).answer;
  assert.deepEqual(canonical(result),canonical(independentGroups(e.strs)));
  assert.deepEqual(canonical(result),canonical(solve49(e.strs)));
 }
});
test('49 trace separates query, creation and insertion with immutable snapshots', () => {
 const trace=anagrams.buildTrace({strs:['eat','tea','']});
 assert.deepEqual(trace[0].groups,[]);
 const created=trace.find(s=>s.line==='create');
 assert.deepEqual(created.groups,[['aet',[]]]);
 assert.equal(trace.filter(s=>s.line==='word')[1].key,'aet');
 const inserted=trace.find(s=>s.line==='append');
 assert.deepEqual(inserted.groups,[['aet',['eat']]]);
 assert.ok(trace.some(s=>s.line==='query' && s.found));
 assert.equal(trace.filter(s=>s.line==='create').length,2);
});
test('128 samples and 1000 random cases agree with sorted independent solver', () => {
 let seed=128;
 const random=()=>seed=(seed*1664525+1013904223)>>>0;
 const cases=[...consecutive.examples,...Array.from({length:1000},()=>({nums:Array.from({length:random()%25},()=>random()%41-20)}))];
 for(const e of cases) {
  const result=consecutive.buildTrace(e).at(-1).longest;
  assert.equal(result,sortedLongest(e.nums)); assert.equal(result,solve128(e.nums));
 }
});
test('128 follows actual checks, skips predecessors, and separates pointer/count updates', () => {
 const trace=consecutive.buildTrace(consecutive.examples[0]);
 assert.equal(trace[0].longest,null);
 assert.equal(trace[1].longest,0);
 assert.ok(trace.some(s=>s.line==='start' && s.found));
 for(let i=0;i<trace.length;i++) {
  const s=trace[i], prev=trace[i-1], next=trace[i+1];
  if(s.line==='start' && s.found) assert.ok(['num','result'].includes(next.line));
  if(s.line==='check') assert.equal(next.line,s.found?'advance':'best');
  if(s.line==='advance') {assert.equal(s.current,prev.current+1); assert.equal(s.length,prev.length); assert.equal(next.line,'count');}
  if(s.line==='count') assert.equal(s.length,prev.length+1);
 }
});
test('large traces keep visible data bounded and include active lookup', () => {
 const trace128=consecutive.buildTrace({nums:Array.from({length:100000},(_,i)=>i)});
 assert.equal(trace128.at(-1).longest,100000);
 assert.ok(trace128.length < 600005);
 for(const s of trace128) {assert.ok(s.set.length<=8); if(s.found) assert.ok(s.set.includes(s.probe));}
 const trace49=anagrams.buildTrace({strs:Array.from({length:10000},(_,i)=>i%2?'ab':'ba')});
 assert.equal(trace49.at(-1).answer[0].length,10000);
 for(const s of trace49) {assert.ok(s.groups.length<=6); for(const [,g] of s.groups) assert.ok(g.length<=6);}
});
test('every executed stage has an explicit language-specific line mapping', () => {
 for(const [problem,codes] of [[anagrams,codes49],[consecutive,codes128]]) {
  const stages=new Set(problem.examples.flatMap(e=>problem.buildTrace(e).map(s=>s.line)));
  for(const code of codes) for(const stage of stages) assert.ok(code.source.split('\n')[code.lines[stage]-1]?.trim(), `${code.id}: ${stage}`);
 }
});
