import test from 'node:test';
import assert from 'node:assert/strict';
import { recorder } from '../public/algorithm-cards/shared/sequence-card.js';
import { buildTrace as coinTrace } from '../public/algorithm-cards/problems/322.js';
import { buildTrace as moveTrace } from '../public/algorithm-cards/problems/283.js';
test('large snapshots preserve original indices, active dependencies and immutable visible cells',()=>{
 const values=Array.from({length:10000},(_,i)=>i),r=recorder();r.push('update','当前操作',{values,pointers:{j:9990,dependency:500},auxiliary:values});values[9990]=-1;
 const s=r.steps[0];assert.equal(s.valueLength,10000);assert.ok(s.values.length<=8);assert.equal(s.values[s.valueIndices.indexOf(9990)],9990);assert.ok(s.valueIndices.includes(500));assert.ok(s.auxiliary.length<=8);
});
test('pressure traces remain complete while per-step displayed arrays stay bounded',()=>{
 // 71 枚 13 + 11 枚 7 = 1000；少于 82 枚无法同时满足总和与模 6 约束。
 const coins=coinTrace({nums:[1,7,13],amount:1000});assert.equal(coins.at(-1).answer,82);for(const s of coins)assert.ok(s.values.length<=8);
 const nums=Array.from({length:1000},(_,i)=>i%3===0?0:i),steps=moveTrace({nums});assert.deepEqual(steps.at(-1).answer,[...nums.filter(n=>n!==0),...nums.filter(n=>n===0)]);for(const s of steps){assert.ok(s.values.length<=8);if(s.read!==null&&s.read<nums.length)assert.ok(s.valueIndices.includes(s.read));}
});
