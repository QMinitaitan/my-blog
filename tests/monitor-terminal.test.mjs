import test from 'node:test';
import assert from 'node:assert/strict';
import { problemIds, loadProblem } from '../public/algorithm-cards/registry.js';
import { terminalValue, terminalInputs } from '../public/algorithm-cards/shared/monitor-terminal.js';

test('all 100 registered cards share one terminal and retain independent controls',async()=>{
  for(const id of problemIds){
    const problem=await loadProblem(id);
    assert.equal((problem.template.match(/class="monitor-terminal"/g)||[]).length,1,id);
    assert.ok(!problem.template.includes('class="sample-bar"'),id);
    assert.match(problem.template,/<\/section>\s*<\/div><div class="controls">/,id);
    const controls=problem.template.split('<div class="controls">')[1].split('</section>')[0];
    assert.deepEqual([...controls.matchAll(/<button id="([^"]+)"/g)].map(match=>match[1]),['prev','next'],`${id}: progress controls must contain only previous and next`);
    assert.equal((controls.match(/type="range"/g)||[]).length,1,`${id}: one draggable progress bar`);
    assert.doesNotMatch(controls,/<select|id="(?:play|reset|speed)"/,`${id}: no playback controls`);
    for(const example of problem.examples){
      const before=structuredClone(example),trace=problem.buildTrace(example);
      assert.ok(Object.hasOwn(trace.at(-1),'answer'),`${id}: final return must be available to the terminal`);
      assert.ok(terminalInputs(example).every(([key])=>key!=='label'&&key!=='note'));
      assert.deepEqual(example,before,`${id}: terminal input source is unchanged`);
    }
  }
});

test('terminal distinguishes pending, null, zero, false and empty results; large previews disclose omissions',()=>{
  assert.equal(terminalValue(undefined),'...');assert.equal(terminalValue(null),'null');
  assert.equal(terminalValue(0),'0');assert.equal(terminalValue(false),'false');
  assert.equal(terminalValue([]),'[]');assert.equal(terminalValue({}),'{}');
  const huge=Array.from({length:10000},(_,i)=>i),text=terminalValue(huge);
  assert.match(text,/省略 9992 项/);assert.ok(text.length<160);assert.match(text,/9999\]/);
});
