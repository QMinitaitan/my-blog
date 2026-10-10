import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Exercise the real renderer callbacks with real problem traces. Only the public
// control shell is intercepted; DOM geometry is checked separately in a browser.
async function renderer(path, name, options) {
  const url = new URL(`../public/algorithm-cards/${path}`, import.meta.url);
  let source = await readFile(url, 'utf8');
  const bindings = {};
  for (const match of source.matchAll(/^import \{([^}]+)\} from ["']([^"']+)["'];?\r?$/gm)) {
    const module = await import(new URL(match[2], url));
    for (const key of match[1].split(',').map(s => s.trim())) bindings[key] = module[key];
  }
  let config;
  bindings.mountCard = (_root, _signal, value) => { config = value; };
  bindings.mountStatementExamples = () => {};
  source = source.replace(/^import .*\r?\n/gm, '').replace(/\bexport /g, '');
  const factory = new Function(...Object.keys(bindings), `${source};return ${name};`)(...Object.values(bindings));
  const nodes = new Map();
  const animation = {clientWidth: 334, dataset: {}, style: {setProperty(){}}};
  const root = {
    querySelector: () => animation,
    getElementById(id) {
      if (!nodes.has(id)) nodes.set(id, {style: {}, innerHTML: '', textContent: '', insertAdjacentHTML(_where, html){this.innerHTML += html;}});
      return nodes.get(id);
    },
  };
  (options ? factory(options).mount : factory)(root, new AbortController().signal);
  return {config, root};
}

function circles(html) {
  return [...html.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)"/g)].map(m => [Number(m[1]), Number(m[2])]);
}

test('inversion and flattening render the current topology inside fixed bounds', async () => {
  for (const id of [226, 114]) {
    const problem = await import(`../public/algorithm-cards/problems/${id}.js`);
    const example = problem.examples[0], steps = problem.buildTrace(example);
    const {config, root} = await renderer('shared/tree-card.js', 'treeCard', {title:`${id}. tree`, codes:[], examples:[example], buildTrace:problem.buildTrace});
    config.prepareAnimation(root, steps);
    config.renderAnimation(root, steps.at(-1), example);
    const html = root.getElementById('tree').innerHTML;
    const nodes = [...html.matchAll(/<g><circle cx="([\d.]+)" cy="([\d.]+)"[\s\S]*?<text[^>]*>([^<]+)<\/text>/g)];
    const byValue = new Map(nodes.map(m => [Number(m[3]), {x:Number(m[1]), y:Number(m[2])}]));
    if (id === 226) {
      assert.ok(byValue.get(7).x < byValue.get(4).x, 'left child 7 must move left of root 4');
      assert.ok(byValue.get(2).x > byValue.get(4).x, 'right child 2 must move right of root 4');
    } else {
      for (let value = 1; value < 6; value++) assert.ok(byValue.get(value + 1).y > byValue.get(value).y, 'flattened right chain must descend');
    }
  }
});

test('custom group, chain and partition renderers reserve changing slots at sample initialization', async () => {
  for (const [id, slots] of [[49,['words','groups','result']], [128,['set-view','chain','result']], [4,['a','b','cuts','result']]]) {
    const problem = await import(`../public/algorithm-cards/problems/${id}.js`);
    const example = problem.examples[0], steps = problem.buildTrace(example);
    const setup = id === 4
      ? await renderer('shared/partition-card.js', 'partitionCard', {codes:[], examples:[example], buildTrace:problem.buildTrace})
      : await renderer(`problems/${id}.js`, 'mount');
    setup.config.prepareAnimation?.(setup.root, steps, example);
    setup.config.renderAnimation(setup.root, steps[0], example);
    for (const slot of slots) assert.ok(parseFloat(setup.root.getElementById(slot).style.minHeight) > 0, `${id} ${slot} must reserve its final extent before stepping`);
  }
});

test('course windows never place two visible identities at the same coordinates', async () => {
  const problem = await import('../public/algorithm-cards/problems/207.js');
  const example = {numCourses:65, prerequisites:Array.from({length:64},(_,i)=>[i+1,i])};
  const steps = problem.buildTrace(example);
  const {config, root} = await renderer('shared/graph-card.js', 'graphCard', {title:'207. graph',codes:[],examples:[example],variables:[],buildTrace:problem.buildTrace});
  config.prepareAnimation(root, steps);
  for (const step of steps) {
    config.renderAnimation(root, step, example);
    const points = circles(root.getElementById('graph').innerHTML).map(p=>p.join(','));
    assert.equal(new Set(points).size, step.vertices.length, `overlap at phase ${step.line}, vertices ${step.vertices}`);
  }
});

test('large full answers stay accurate in traces but use a bounded animation preview', async () => {
  const problem = await import('../public/algorithm-cards/problems/238.js');
  const example = {nums:Array(1000).fill(1)}, steps = problem.buildTrace(example);
  const {config, root} = await renderer('shared/sequence-card.js', 'sequenceCard', {title:'238. product',codes:[],examples:[example],variables:[],buildTrace:problem.buildTrace});
  config.prepareAnimation(root, steps);
  assert.ok(parseFloat(root.getElementById('result').style.minHeight) < 500, 'bounded array window must not reserve thousands of pixels for the full answer');
  config.renderAnimation(root, steps.at(-1), example);
  assert.match(root.getElementById('result').textContent, /省略/);
  assert.deepEqual(steps.at(-1).answer, Array(1000).fill(1));
});
