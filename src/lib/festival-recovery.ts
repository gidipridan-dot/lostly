import type { ItemDetails } from '@/components/item-details-form';

export type ReunionStage = 'waiting' | 'notification' | 'match' | 'verify' | 'pickup' | 'pass' | 'collected' | 'away';

export function nextReunionStage(stage: ReunionStage, event: 'found' | 'open' | 'verify' | 'passed' | 'reserve' | 'handover' | 'away'): ReunionStage {
  if (stage === 'waiting' && event === 'found') return 'notification';
  if (stage === 'notification' && event === 'open') return 'match';
  if (stage === 'match' && event === 'verify') return 'verify';
  if (stage === 'verify' && event === 'passed') return 'pickup';
  if (stage === 'pickup' && event === 'reserve') return 'pass';
  if (stage === 'pass' && event === 'handover') return 'collected';
  if ((stage === 'pickup' || stage === 'pass') && event === 'away') return 'away';
  return stage;
}

export function sampleFinderDetails(details: ItemDetails | null): ItemDetails {
  return details ?? { color: 'Blue', brand: '', condition: 'Good', contents: [], uniqueMarks: [], additionalNotes: '' };
}