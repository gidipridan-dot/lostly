import { describe, it as test } from 'node:test';
import { strict as assert } from 'node:assert';
import {
  canSubmitItemDetails,
  isOtherCategory,
  itemDisplayName,
  typedItemName,
} from '../src/lib/item-naming';

const emptyDetails = {
  itemName: '',
  color: '',
  brand: '',
  condition: '',
  contents: [] as string[],
  uniqueMarks: [] as string[],
};

describe('item naming for the "Other" category', () => {
  test('pressing Other asks for the item name before anything else can be submitted', () => {
    assert.equal(isOtherCategory('Other'), true);
    assert.equal(isOtherCategory('other'), true);
    assert.equal(isOtherCategory('Keys'), false);
    // A color alone is not enough while the item is still unnamed.
    assert.equal(canSubmitItemDetails('Other', { ...emptyDetails, color: 'Red' }), false);
  });

  test('typing the item name (e.g. bandana) unlocks the rest of the report', () => {
    assert.equal(
      canSubmitItemDetails('Other', { ...emptyDetails, itemName: 'bandana' }),
      false,
      'a name alone is still not a clue — at least one detail is required',
    );
    assert.equal(
      canSubmitItemDetails('Other', { ...emptyDetails, itemName: '  bandana  ', color: 'Red' }),
      true,
    );
    assert.equal(typedItemName('  bandana '), 'bandana');
  });

  test('named categories keep the existing one-clue rule', () => {
    assert.equal(canSubmitItemDetails('Keys', { ...emptyDetails, color: 'Black' }), true);
    assert.equal(canSubmitItemDetails('Keys', { ...emptyDetails, uniqueMarks: ['Red tag'] }), true);
    assert.equal(canSubmitItemDetails('Keys', emptyDetails), false);
  });

  test('the typed name replaces "Other" everywhere the item is described', () => {
    assert.equal(itemDisplayName('Other', 'bandana'), 'bandana');
    assert.equal(itemDisplayName('Other', ''), 'item');
    assert.equal(itemDisplayName('Keys', ''), 'Keys');
    assert.equal(itemDisplayName('Keys', 'bandana'), 'bandana');
  });
});
