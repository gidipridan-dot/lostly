import { useState } from 'react';
import { LocateFixed, MapPin, Tent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import festivalMap from '@/assets/festival-map.jpg';

export interface Pin { x: number; y: number }

const landmarks = [
  { name: 'Camps area', x: 18, y: 20 },
  { name: 'The dance floor', x: 38, y: 42 },
  { name: 'Art installation', x: 80, y: 36 },
  { name: 'Open playa', x: 55, y: 62 },
  { name: 'Open bar', x: 17, y: 74 },
];
export const lostlyCamp: Pin = { x: 84, y: 82 };

function nearest(p: Pin) {
  return landmarks.reduce((a, b) => (Math.hypot(b.x - p.x, b.y - p.y) < Math.hypot(a.x - p.x, a.y - p.y) ? b : a)).name;
}

interface Props {
  /** Called with a readable label when a pin is dropped. Omit for a read-only map. */
  onPin?: (label: string) => void;
  /** Show the Lostly camp meetup pin. */
  showCamp?: boolean;
}

/** Illustrative festival map: tap to drop a pin, or use the phone's location. */
export function DropPinMap({ onPin, showCamp = false }: Props) {
  const [pin, setPin] = useState<Pin | null>(null);
  const drop = (p: Pin, label?: string) => { setPin(p); onPin?.(label ?? `Pin near ${nearest(p)}`); };

  const useMyLocation = () => {
    const fallback = () => drop({ x: 50, y: 50 }, 'My current location');
    if (!navigator.geolocation) return fallback();
    navigator.geolocation.getCurrentPosition(fallback, fallback, { timeout: 5000 });
  };

  return (
    <div className="space-y-3">
      <div
        role={onPin ? 'button' : 'img'}
        aria-label={onPin ? 'Festival map — tap to drop a pin' : 'Festival map with Lostly camp'}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted ${onPin ? 'cursor-crosshair' : ''}`}
        onClick={onPin ? (e) => {
          const r = e.currentTarget.getBoundingClientRect();
          drop({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        } : undefined}
      >
        <img src={festivalMap} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
        {landmarks.map((l) => (
          <span key={l.name} className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/85 px-2 py-0.5 text-[11px] font-medium text-foreground shadow-sm" style={{ left: `${l.x}%`, top: `${l.y}%` }}>{l.name}</span>
        ))}
        {showCamp && (
          <span className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-full flex-col items-center text-primary" style={{ left: `${lostlyCamp.x}%`, top: `${lostlyCamp.y}%` }}>
            <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">Lostly camp</span>
            <Tent className="h-6 w-6" />
          </span>
        )}
        {pin && (
          <MapPin className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-full fill-primary text-primary-foreground quest-arrive" style={{ left: `${pin.x}%`, top: `${pin.y}%` }} />
        )}
        {onPin && !pin && <span className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs text-muted-foreground">Tap the map to drop a pin</span>}
      </div>
      {onPin && (
        <Button type="button" variant="secondary" className="w-full rounded-lg hover:scale-100" onClick={useMyLocation}>
          <LocateFixed /> Use my current location
        </Button>
      )}
      <p className="text-xs text-muted-foreground">Sample festival map · illustrative, not live GPS.</p>
    </div>
  );
}
