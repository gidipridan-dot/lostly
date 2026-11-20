import type { CSSProperties } from 'react';
import { Footprints } from 'lucide-react';
import pathImage from '@/assets/festival-light-path.asset.json';

const moments = [
  { chapter: 'Lost in the dust', line: 'The light is far, but it is there.' },
  { chapter: 'A spark appears', line: 'Someone may have found your way back.' },
  { chapter: 'Following your clues', line: 'Only you know the little things.' },
  { chapter: 'Almost at camp', line: 'The crew has a light on for you.' },
  { chapter: 'In the light', line: 'Reunited at Lostly camp.' },
];

export function FestivalLightPath({ current = 0 }: { current?: number }) {
  const step = Math.max(0, Math.min(current, moments.length - 1));
  const ratio = step / (moments.length - 1);
  const style = {
    '--light-radius': `${12 + ratio * 48}%`,
    '--dusk': `${0.86 - ratio * 0.66}`,
    '--traveler-top': `${62 - ratio * 27}%`,
    '--traveler-scale': `${1 - ratio * 0.45}`,
  } as CSSProperties;
  return (
    <figure className="light-path relative isolate overflow-hidden rounded-lg" style={style} aria-label={`Path to Lostly camp: ${moments[step].chapter}`}>
      <img src={pathImage.url} alt="A boardwalk crossing the desert toward the glowing Lostly camp" className="h-full w-full object-cover" />
      <div className="light-path-dusk absolute inset-0" aria-hidden="true" />
      <Footprints className="light-path-traveler absolute left-1/2 text-festival-light" aria-hidden="true" />
      <figcaption className="light-path-caption absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <span className="text-xs font-semibold text-festival-ink">{String(step + 1).padStart(2, '0')} / 05 · {moments[step].chapter}</span>
        <span className="festival-heading mt-1 block text-xl text-festival-ink sm:text-2xl">{moments[step].line}</span>
        <span className="mt-3 flex gap-1.5" aria-hidden="true">{moments.map((m, i) => <span key={m.chapter} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-festival-light' : 'bg-festival-ink/30'}`} />)}</span>
      </figcaption>
    </figure>
  );
}
