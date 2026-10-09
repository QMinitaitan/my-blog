import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTrace, examples } from '../public/algorithm-cards/problems/118.js';
import { sampleBounds } from '../public/algorithm-cards/shared/sample-layout.js';
test('five-row Pascal sample reserves growing rows before the first step without changing snapshots', () => {
 const steps = buildTrace(examples[0]); const before = structuredClone(steps);
 const bounds = sampleBounds(steps);
 assert.deepEqual(bounds.grids.matrix.rows, [1, 2, 3, 4, 5]);
 assert.equal(bounds.grids.matrix.columns, 5);
 assert.deepEqual(steps, before);
});
import { treeLayout } from '../public/algorithm-cards/shared/sample-layout.js';
test('building a tree keeps existing node anchors as children are added', () => {
 const leaf = { id: 2, val: 3, left: null, right: null };
 const complete = { id: 1, val: 2, left: {id: 0, val: 1, left: null, right: null}, right: leaf };
 const layout = treeLayout([{tree: leaf}, {tree: complete}]);
 assert.equal(layout.positions.get(2).x, 168);
 assert.equal(layout.height, 140);
 assert.equal(layout.width, 224);
});
import { listLayout } from '../public/algorithm-cards/shared/sample-layout.js';
test('deleting a list node preserves surviving identities and bounds', () => {
 const a={id:'A',val:1,next:'B'}, b={id:'B',val:2,next:'C'}, c={id:'C',val:3,next:null};
 const layout=listLayout([{nodes:[a,b,c]},{nodes:[a,c]}]);
 assert.equal(layout.positions.get('C'),270);
 assert.equal(layout.width,345);
});
test('one-dimensional dp snapshots do not become matrix layouts', () => {
 assert.deepEqual(sampleBounds([{values:[0,1],dp:[0,1]}]).grids.dp.rows,[]);
});
import { trieLayout, heapLayout } from '../public/algorithm-cards/shared/sample-layout.js';
test('shared-prefix branches reserve the final Trie anchors at initialization', () => {
 const root={id:'',children:{a:'a',b:'b'}}, a={id:'a',children:{},end:true}, b={id:'b',children:{},end:false};
 const layout=trieLayout([{trieNodes:[{id:'',children:{}}]}, {trieNodes:[root,a,b]}]);
 assert.deepEqual(layout.positions.get(''),{x:97.5,y:30});
 assert.equal(layout.height,150);
});
test('heap insertion reserves final levels while deletion keeps the same extent', () => {
 assert.equal(heapLayout([{heaps:[{label:'min',values:[]}]},{heaps:[{label:'min',values:[1,2,3,4]}]},{heaps:[{label:'min',values:[1]}]}]).get('min'),180);
});
import { reserveSample } from '../public/algorithm-cards/shared/sample-layout.js';
test('a stack slot includes caption and nested row margins before stepping', () => {
 const animation={clientWidth:400,dataset:{},style:{setProperty(){}}};
 const extra={style:{}};
 const root={querySelector:()=>animation,getElementById:id=>id==='extra'?extra:null};
 reserveSample(root,sampleBounds([{values:[1],stack:[-1,0,1]}]),{rows:{extra:{count:3,extraHeight:180}}});
 assert.equal(extra.style.minHeight,'258px');
});
test('a slot reserves long explanatory text in addition to its structural rows on narrow screens', () => {
 const animation={clientWidth:280,dataset:{},style:{setProperty(){}}},extra={style:{}};
 const root={querySelector:()=>animation,getElementById:()=>extra};
 reserveSample(root,sampleBounds([{values:[1]}]),{rows:{extra:{count:0,textCharacters:100}}});
 assert.equal(extra.style.minHeight,'270px');
});
