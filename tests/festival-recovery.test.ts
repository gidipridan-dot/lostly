import { describe, it as test } from 'node:test';
import { strict as assert } from 'node:assert';
import { nextReunionStage, sampleFinderDetails, type ReunionStage } from '../src/lib/festival-recovery';

describe('festival preview recovery', () => {
  test('a found item triggers a match notification before verification and meetup', () => {
    let stage: ReunionStage = 'waiting';
    stage = nextReunionStage(stage, 'found');
    assert.equal(stage, 'notification');
    stage = nextReunionStage(stage, 'open');
    assert.equal(stage, 'match');
    stage = nextReunionStage(stage, 'verify');
    assert.equal(stage, 'verify');
    stage = nextReunionStage(stage, 'passed');
    assert.equal(stage, 'pickup');
    stage = nextReunionStage(stage, 'reserve');
    assert.equal(stage, 'pass');
    assert.equal(nextReunionStage(stage, 'handover'), 'collected');
  });

  test('a possible match cannot skip ownership verification to reach pickup', () => {
    assert.equal(nextReunionStage('match', 'reserve'), 'match');
    assert.equal(nextReunionStage('verify', 'handover'), 'verify');
  });

  test('description-based matching retains the reported item clues', () => {
    const details = { color: 'Red', brand: 'Sony', condition: 'Good', contents: [], uniqueMarks: ['Name tag'], additionalNotes: '' };
    assert.deepEqual(sampleFinderDetails(details), details);
  });
});