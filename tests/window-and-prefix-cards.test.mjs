import test from 'node:test';
import assert from 'node:assert/strict';
import * as window from '../public/algorithm-cards/problems/3.js';
import * as prefix from '../public/algorithm-cards/problems/560.js';
import { codes as code3 } from '../public/algorithm-cards/problems/3-code.js';
import { codes as code560 } from '../public/algorithm-cards/problems/560-code.js';
const solve=codes=>new Function(`${codes[1].source};return ${codes[0].method};`)();
function bruteWindow(s){let best=0;for(let i=0;i<s.length;i++)for(let j=i;j<s.length;j++){const part=s.slice(i,j+1);if(new Set(part).size===part.length)best=Math.max(best,part.length);}return best;}
function brutePrefix(nums,k){let count=0;for(let i=0;i<nums.length;i++){let sum=0;for(let j=i;j<nums.length;j++){sum+=nums[j];if(sum===k)count++;}}return count;}
test('window and prefix traces agree with exhaustive solvers, including negative values and empty strings',()=>{
 let seed=560;const random=()=>seed=(seed*1664525+1013904223)>>>0;
 const solve3=solve(code3),solve560=solve(code560);
 for(let t=0;t<500;t++){const input=Array.from({length:random()%12},()=>String.fromCharCode(97+random()%4)).join(''),nums=Array.from({length:1+random()%10},()=>random()%9-4),k=random()%9-4;assert.equal(window.buildTrace({input}).at(-1).answer,bruteWindow(input));assert.equal(solve3(input),bruteWindow(input));assert.equal(prefix.buildTrace({nums,k}).at(-1).answer,brutePrefix(nums,k));assert.equal(solve560(nums,k),brutePrefix(nums,k));}
});
test('queries precede recording, left never moves backward, and all source mappings are explicit',()=>{
 const t=prefix.buildTrace({nums:[0,0,0],k:0});assert.equal(t.at(-1).answer,6);for(let i=0;i<t.length;i++)if(t[i].line==='count')assert.equal(t[i+1].line,'record');
 const w=window.buildTrace({input:'abba'});assert.equal(w.at(-1).left,2);
 for(const [m,codes] of [[window,code3],[prefix,code560]])for(const e of m.examples)for(const s of m.buildTrace(e))for(const c of codes)assert.ok(c.source.split('\n')[c.lines[s.line]-1]?.trim());
});
