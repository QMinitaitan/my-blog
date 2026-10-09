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
