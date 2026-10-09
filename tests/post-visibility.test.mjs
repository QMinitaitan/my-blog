import test from 'node:test';
import assert from 'node:assert/strict';
import { isPublicPost } from '../src/config/post-visibility.mjs';
test('only the 17 Hot 100 topics are public in development and production', () => {
  assert.equal(isPublicPost({slug:'leetcode-hot100-array',data:{draft:false}}),true);
  assert.equal(isPublicPost({slug:'markdown',data:{draft:false}}),false);
  assert.equal(isPublicPost({slug:'leetcode-hot100-array',data:{draft:true}}),false);
});
