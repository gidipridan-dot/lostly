import { useEffect, useRef, useState } from 'react';
import pathImage from '@/assets/festival-light-path-hd.asset.json';

const LINES = ['Sending your clues…', 'Lighting the path…', 'Telling the camps…'];
export const JOURNEY_MIN_MS = 3600;

/** Full-screen "journey to the light" moment. Waits for both the minimum duration and `task`, then flashes into onDone. */
export function JourneyLoader({ task, onDone, onError }: { task: () => Promise<unknown>; onDone: () => void; onError?: () => void }) {
  const [phase, setPhase] = useState<'travel' | 'hold' | 'flash' | 'fail'>('travel');
  const [line, setLine] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const done = useRef(false);
  const finish = () => { if (done.current) return; done.current = true; setPhase('flash'); setTimeout(onDone, 600); };

  useEffect(() => {
    let alive = true;
    let ok = false, minPassed = false;
    const t1 = setTimeout(() => { minPassed = true; if (ok) finish(); else if (alive) setPhase((p) => (p === 'travel' ? 'hold' : p)); }, JOURNEY_MIN_MS - 600);
    const t2 = setTimeout(() => setCanSkip(true), 1500);
    const t3 = setInterval(() => setLine((l) => Math.min(l + 1, LINES.length - 1)), 1100);
    task().then(() => { ok = true; if (minPassed) finish(); }).catch(() => { if (!alive) return; done.current = true; setPhase('fail'); setTimeout(() => onError?.(), 700); });
    return () => { alive = false; clearTimeout(t1); clearTimeout(t2); clearInterval(t3); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`journey-loader is-${phase}`} role="status" aria-live="polite" onClick={() => canSkip && phase !== 'fail' && finish()}>
      <img src={pathImage.url} alt="" className="journey-img" />
      <div className="journey-vignette" />
      <div className="journey-rays" />
      <div className="journey-glow" />
      <div className="journey-flash" />
      <p key={line} className="journey-line font-mono">{phase === 'fail' ? 'The signal got lost in the dust.' : LINES[line]}</p>
      {canSkip && phase !== 'fail' && phase !== 'flash' && <span className="journey-skip font-mono">Tap to skip</span>}
    </div>
  );
}

export function preloadJourneyImage() { const i = new Image(); i.src = pathImage.url; }
