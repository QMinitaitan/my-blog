import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTrace, examples, getVariables, visibleIndices } from '../public/algorithm-cards/problems/1.js';
import { codes } from '../public/algorithm-cards/problems/1-code.js';

const solve = new Function(`${codes.find(code => code.id === 'javascript').source}; return twoSum;`)();
const brute = ({ nums, target }) => {
	for (let j = 1; j < nums.length; j++) for (let i = 0; i < j; i++) if (nums[i] + nums[j] === target) return [i, j];
	return [];
};

test('each example returns two distinct matching indices', () => {
	for (const example of examples) {
		const trace = buildTrace(example);
		const answer = trace.at(-1).answer;
		assert.equal(answer.length, 2);
		assert.notEqual(answer[0], answer[1]);
		assert.equal(example.nums[answer[0]] + example.nums[answer[1]], example.target);
		assert.deepEqual(solve(example.nums, example.target), answer);
		assert.equal(trace[0].target, example.target);
	}
});

test('trace and copied JavaScript agree with independent brute force on 1,000 inputs', () => {
	let seed = 12345;
	const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0);
	for (let n = 0; n < 1000; n++) {
		const example = { nums: Array.from({ length: 2 + random() % 10 }, () => (random() % 21) - 10), target: (random() % 31) - 15 };
		const expected = brute(example);
		const answer = buildTrace(example).at(-1).answer;
		assert.deepEqual(answer, solve(example.nums, example.target));
		assert.equal(Boolean(answer.length), Boolean(expected.length));
		if (answer.length) {
			assert.notEqual(answer[0], answer[1]);
			assert.equal(example.nums[answer[0]] + example.nums[answer[1]], example.target);
		}
	}
});

test('dictionary snapshots retain old state and zero indices', () => {
	const trace = buildTrace(examples[0]);
	assert.deepEqual(trace[0].seen, []);
	assert.deepEqual(trace.find(step => step.line === 8).seen, [[2, 0]]);
	assert.equal(trace.at(-1).match, 0);
});

test('stress case retains complete steps with bounded visible data', () => {
	const example = {
		nums: Array.from({ length: 10_000 }, (_, i) => i === 9_999 ? 1_000_000_000 : i - 9_999),
		target: 999_999_999,
	};
	const trace = buildTrace(example);
	assert.equal(example.nums.length, 10000);
	assert.equal(trace.length, 40001);
	assert.deepEqual(trace.at(-1).answer, [9998, 9999]);
	assert.equal(trace.at(-1).seenCount, 9999);
	for (const step of trace) {
		assert.ok(step.seen.length <= 8);
		const visible = visibleIndices(example.nums.length, step);
		assert.ok(visible.length <= 8);
		if (step.i !== null) assert.ok(visible.includes(step.i));
		for (const index of step.answer || []) assert.ok(visible.includes(index));
	}
});

test('a matching key outside the dictionary window remains visible', () => {
	const trace = buildTrace({ nums: [...Array.from({ length: 20 }, (_, i) => i + 1), 1000], target: 1001 });
	assert.deepEqual(trace.at(-1).answer, [0, 20]);
	assert.ok(trace.at(-1).seen.some(([key, index]) => key === 1 && index === 0));
});

test('every language highlights initialization, query, return and insertion lines', () => {
	for (const code of codes) {
		const lines = code.source.split('\n');
		for (const line of [3, 4, 5, 6, 7, 8, 9]) assert.ok(lines[code.lines[line] - 1]?.trim());
		assert.match(lines[code.lines[5] - 1], /need/);
		assert.match(lines[code.lines[7] - 1], /return/);
		assert.match(lines[code.lines[8] - 1], /seen/);
	}
});
