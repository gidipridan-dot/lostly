import { describe, it as test } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  SEARCH_PHASES,
  SEARCH_TOTAL_MS,
  phaseIndexAt,
  searchComplete,
  searchRatioAt,
} from '../src/lib/festival-search';

describe('festival preview search pacing', () => {
  test('the spark never pops before the crew has visibly searched', () => {
    assert.ok(SEARCH_TOTAL_MS >= 10000, `search should last at least 10s, got ${SEARCH_TOTAL_MS}ms`);
    // The old pacing fired the spark at 3.5s: it must still be mid-search there.
    assert.equal(searchComplete(3500), false);
    assert.equal(phaseIndexAt(3500), 1);
  });

  test('each phase is announced in order with a plain-language line', () => {
    assert.equal(SEARCH_PHASES.length, 5);
    for (const phase of SEARCH_PHASES) {
      assert.ok(phase.label.length > 0);
      assert.ok(phase.detail.length > 0);
      assert.ok(phase.ms > 0);
    }
    assert.equal(phaseIndexAt(0), 0);
    assert.equal(phaseIndexAt(SEARCH_TOTAL_MS - 1), SEARCH_PHASES.length - 1);
  });

  test('the bar fills from empty to full and the search ends only at the total', () => {
    assert.equal(searchRatioAt(0), 0);
    assert.ok(searchRatioAt(SEARCH_TOTAL_MS / 2) > 0.4 && searchRatioAt(SEARCH_TOTAL_MS / 2) < 0.6);
    assert.equal(searchRatioAt(SEARCH_TOTAL_MS), 1);
    assert.equal(searchComplete(SEARCH_TOTAL_MS - 1), false);
    assert.equal(searchComplete(SEARCH_TOTAL_MS), true);
  });
});
