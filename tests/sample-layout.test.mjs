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
