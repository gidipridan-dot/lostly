// Demo search pacing: the crew's search is shown as visible phases before any match appears.
export type SearchPhase = { id: string; label: string; detail: string; ms: number };

export const SEARCH_PHASES: SearchPhase[] = [
  { id: 'received', label: 'Report received', detail: 'Your clues are in the system.', ms: 1600 },
  { id: 'searching', label: 'Searching festival reports', detail: 'Comparing with everything handed in today.', ms: 3200 },
  { id: 'matching', label: 'Matching the little things', detail: 'Colour, brand, condition, marks.', ms: 3200 },
  { id: 'crew', label: 'Checking with camp crew', detail: 'A person looks before anyone gets a ping.', ms: 2600 },
  { id: 'watch', label: 'Keeping watch', detail: 'Nothing yet. We tell you the moment something fits.', ms: 2200 },
];

export const SEARCH_TOTAL_MS = SEARCH_PHASES.reduce((total, phase) => total + phase.ms, 0);

export function phaseIndexAt(elapsedMs: number): number {
  let elapsed = 0;
  for (let index = 0; index < SEARCH_PHASES.length; index += 1) {
    elapsed += SEARCH_PHASES[index].ms;
    if (elapsedMs < elapsed) return index;
  }
  return SEARCH_PHASES.length - 1;
}

export function searchRatioAt(elapsedMs: number): number {
  return Math.max(0, Math.min(1, elapsedMs / SEARCH_TOTAL_MS));
}

export function searchComplete(elapsedMs: number): boolean {
  return elapsedMs >= SEARCH_TOTAL_MS;
}
