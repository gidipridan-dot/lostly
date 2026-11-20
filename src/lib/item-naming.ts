/**
 * Item naming helpers.
 *
 * When a person picks the "Other" category, the platform cannot guess what the
 * item is, so the very next thing they should do is type it in plain words
 * (e.g. "bandana"). These helpers keep that rule in one place so every flow
 * (classic + festival, lost + found) behaves the same way.
 */

export const OTHER_CATEGORY = 'Other';

/** True when the chosen category is the catch-all "Other". */
export function isOtherCategory(category: string): boolean {
  return category.trim().toLowerCase() === 'other';
}

/** The name a person typed for an "Other" item, trimmed. */
export function typedItemName(itemName = ''): string {
  return itemName.trim();
}

/**
 * The words to show a person about their item.
 * A typed name always wins; "Other" without a name falls back to "item".
 */
export function itemDisplayName(category: string, itemName = ''): string {
  const typed = typedItemName(itemName);
  if (typed) return typed;
  return isOtherCategory(category) ? 'item' : category;
}

export interface ItemDetailsLike {
  itemName?: string;
  color: string;
  brand: string;
  condition: string;
  contents: string[];
  uniqueMarks: string[];
}

/**
 * An "Other" item cannot be submitted until the person has said what it is.
 * Every other category keeps the existing "at least one clue" rule.
 */
export function canSubmitItemDetails(category: string, details: ItemDetailsLike): boolean {
  if (isOtherCategory(category) && typedItemName(details.itemName) === '') return false;
  return (
    typedItemName(details.color) !== '' ||
    typedItemName(details.brand) !== '' ||
    typedItemName(details.condition) !== '' ||
    details.contents.length > 0 ||
    details.uniqueMarks.length > 0
  );
}
