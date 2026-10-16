import { test } from 'node:test';
import assert from 'node:assert/strict';
import { demoIds, getTraceSnapshot } from '../public/x/assets/trace-lens.mjs';

test('curated X traces have stable public identities and documented output', () => {
  assert.deepEqual(demoIds(), ['function-call', 'arithmetic']);
  for (const id of demoIds()) {
    const first = getTraceSnapshot(id, 0);
    const final = getTraceSnapshot(id, 999);
    assert.match(first.source, /fn main\(\) -> i32/);
    assert.ok(first.totalSteps >= 3 && first.totalSteps <= 8);
    assert.equal(final.stepIndex, final.totalSteps - 1);
    assert.equal(final.record.expectedResult, 42);
    assert.equal(final.record.kind, 'illustrative-not-executed');
    assert.equal(final.canNext, false);
    assert.equal(first.canPrevious, false);
  }
});

test('each step is deterministic, with human and agent explanations aligned', () => {
  for (const id of demoIds()) {
    const first = getTraceSnapshot(id, 0);
    for (let i = 0; i < first.totalSteps; i++) {
      const one = getTraceSnapshot(id, i);
      const two = getTraceSnapshot(id, i);
      assert.deepEqual(one, two);
      assert.equal(one.stepIndex, i);
      assert.equal(one.record.step, i + 1);
      assert.equal(one.record.totalSteps, one.totalSteps);
      assert.equal(one.record.programId, id);
      assert.ok(one.explanation.length > 12);
      assert.ok(one.heading.length > 3);
      assert.match(one.record.schema, /^x\.trace-lens\.illustration\.v1$/);
      assert.ok(!('runtimeVerified' in one.record));
    }
  }
});

test('indexes are safely clamped, arbitrary source is never interpreted', () => {
  const begin = getTraceSnapshot('function-call', -900);
  assert.equal(begin.stepIndex, 0);
  assert.equal(getTraceSnapshot('function-call', NaN).stepIndex, 0);
  assert.equal(getTraceSnapshot('function-call', 1e100).canNext, false);
  assert.throws(() => getTraceSnapshot('not-X-source', 0), RangeError);
  assert.throws(() => getTraceSnapshot('__proto__', 0), RangeError);
});

test('traces are explicitly authored demonstrations, not proof of X execution', () => {
  for (const id of demoIds()) {
    const snapshot = getTraceSnapshot(id, 0);
    assert.match(snapshot.disclosure, /pre-authored/i);
    assert.match(snapshot.disclosure, /not.*execut/i);
    assert.equal(snapshot.record.origin, 'pre-authored');
    assert.equal(snapshot.record.modelInvoked, false);
  }
});

test('every illustrative step links to an existing curated X source line', () => {
  for (const id of demoIds()) {
    const count = getTraceSnapshot(id, 0).totalSteps;
    for (let i = 0; i < count; i++) {
      const snapshot = getTraceSnapshot(id, i);
      const lines = snapshot.source.split('\n');
      assert.ok(Number.isInteger(snapshot.sourceLine), id + ' line must be integer');
      assert.ok(snapshot.sourceLine >= 1 && snapshot.sourceLine <= lines.length);
      assert.equal(snapshot.sourceText, lines[snapshot.sourceLine - 1]);
      assert.ok(snapshot.sourceText.trim().length > 0);
      assert.equal(snapshot.record.illustrativeSourceLine, snapshot.sourceLine);
      assert.equal(snapshot.record.kind, 'illustrative-not-executed');
      assert.equal(snapshot.record.origin, 'pre-authored');
    }
  }
});
