import type { CSSProperties } from 'react';
import pathImage from '@/assets/festival-light-path.asset.json';

const lostMoments = [
  { chapter: 'Lost in the dust', line: 'The light is far, but it is there.' },
  { chapter: 'A spark appears', line: 'Someone may have found your way back.' },
  { chapter: 'Following your clues', line: 'Only you know the little things.' },
  { chapter: 'Almost at camp', line: 'The crew has a light on for you.' },
  { chapter: 'The Found Path', line: 'Reunited at Lostly camp.' },
];
const foundMoments = [
  { chapter: 'Something in the dust', line: 'You picked up someone’s story.' },
  { chapter: 'Safe at camp', line: 'The crew lights a beacon for its owner.' },
  { chapter: 'A spark reaches them', line: 'Someone out there just got hope.' },
  { chapter: 'The owner is on the way', line: 'They proved the little things.' },
  { chapter: 'The Found Path', line: 'You were someone’s light.' },
];

export function FestivalLightPath({ current = 0, role = 'lost' }: { current?: number; role?: 'lost' | 'found' }) {
  const moments = role === 'found' ? foundMoments : lostMoments;
  const step = Math.max(0, Math.min(current, moments.length - 1));
  const ratio = step / (moments.length - 1);
  const style = { '--light-radius': `${12 + ratio * 48}%`, '--dusk': `${0.7 - ratio * 0.55}` } as CSSProperties;
  return (
    <div className="light-path-wrap" style={style}>
      <figure key={step} className="light-path relative isolate -mx-5 overflow-hidden sm:-mx-6" aria-hidden="true">
        <img src={pathImage.url} alt="" className="light-path-img h-full w-full object-cover" />
        <div className="light-path-dusk absolute inset-0" />
      </figure>
      <div className="light-path-meta flex items-center gap-3" aria-label={`Step ${step + 1} of 5: ${moments[step].chapter}`}>
        <span className="flex flex-1 gap-1.5" aria-hidden="true">
          {moments.map((m, i) => (
            <span key={m.chapter} className="h-0.5 flex-1 overflow-hidden rounded-full bg-border">
              <span className={`light-path-seg block h-full bg-foreground ${i <= step ? 'is-on' : ''}`} />
            </span>
          ))}
        </span>
        <span className="font-mono text-xs text-muted-foreground">{String(step + 1).padStart(2, '0')}/05</span>
      </div>
    </div>
  );
}
