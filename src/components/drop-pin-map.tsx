import { useState } from 'react';
import { LocateFixed, MapPin, Tent, Music, Sparkles, Wine, Sun, Home, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Pin { x: number; y: number }

interface Zone { name: string; icon: LucideIcon; x: number; y: number; w: number; h: number; round?: boolean }

/** Simple flat 2D venue plan. Coordinates are % of the map box. */
const zones: Zone[] = [
  { name: 'Camps', icon: Home, x: 4, y: 5, w: 34, h: 26 },
  { name: 'Art installation', icon: Sparkles, x: 64, y: 5, w: 32, h: 24 },
  { name: 'Dance floor', icon: Music, x: 4, y: 40, w: 28, h: 22 },
  { name: 'Open playa', icon: Sun, x: 38, y: 34, w: 30, h: 34, round: true },
  { name: 'Open bar', icon: Wine, x: 4, y: 71, w: 30, h: 24 },
];
const camp: Zone = { name: 'Lostly camp', icon: Tent, x: 66, y: 71, w: 30, h: 24 };
export const lostlyCamp: Pin = { x: camp.x + camp.w / 2, y: camp.y + camp.h / 2 };

const all = [...zones, camp];
function labelFor(p: Pin) {
  const inside = all.find((z) => p.x >= z.x && p.x <= z.x + z.w && p.y >= z.y && p.y <= z.y + z.h);
  if (inside) return `At ${inside.name}`;
  const near = all.reduce((a, b) =>
    Math.hypot(b.x + b.w / 2 - p.x, b.y + b.h / 2 - p.y) < Math.hypot(a.x + a.w / 2 - p.x, a.y + a.h / 2 - p.y) ? b : a);
  return `On the path near ${near.name}`;
}

interface Props {
  onPin?: (label: string) => void;
  showCamp?: boolean;
}

/** Flat 2D festival plan: tap a spot to drop a pin, or use the phone's location. */
export function DropPinMap({ onPin, showCamp = false }: Props) {
  const [pin, setPin] = useState<Pin | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const drop = (p: Pin, l?: string) => { const t = l ?? labelFor(p); setPin(p); setLabel(t); onPin?.(t); };

  const useMyLocation = () => {
    const fallback = () => drop({ x: 50, y: 50 }, 'My current location');
    if (!navigator.geolocation) return fallback();
    navigator.geolocation.getCurrentPosition(fallback, fallback, { timeout: 5000 });
  };

  const renderZone = (z: Zone, highlight = false) => {
    const Icon = z.icon;
    return (
      <div key={z.name}
        className={`pointer-events-none absolute flex flex-col items-center justify-center gap-1 border text-center ${z.round ? 'rounded-full border-dashed' : 'rounded-xl'} ${highlight ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground'}`}
        style={{ left: `${z.x}%`, top: `${z.y}%`, width: `${z.w}%`, height: `${z.h}%` }}>
        <Icon className="h-5 w-5" />
        <span className="px-1 text-[11px] font-medium leading-tight">{z.name}</span>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div
        role={onPin ? 'button' : 'img'}
        aria-label={onPin ? 'Festival map — tap to drop a pin' : 'Festival map with Lostly camp'}
        className={`relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted sm:aspect-[4/3] ${onPin ? 'cursor-crosshair' : ''}`}
        onClick={onPin ? (e) => {
          const r = e.currentTarget.getBoundingClientRect();
          drop({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        } : undefined}
      >
        {/* paths */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
          <g className="stroke-border" strokeWidth="1.2" strokeDasharray="2 2" fill="none" vectorEffect="non-scaling-stroke">
            <path d="M21 31 L21 40 M18 62 L18 71 M32 51 L38 51 M53 34 L60 29 L80 29 M68 51 L81 51 L81 71 M34 83 L66 83 M53 68 L53 83" />
          </g>
        </svg>
        {zones.map((z) => renderZone(z))}
        {renderZone(camp, showCamp)}
        {pin && (
          <MapPin className="pointer-events-none absolute h-9 w-9 -translate-x-1/2 -translate-y-full fill-destructive text-destructive-foreground drop-shadow quest-arrive" style={{ left: `${pin.x}%`, top: `${pin.y}%` }} />
        )}
      </div>
      {onPin && (
        <p className="text-center text-sm text-muted-foreground">
          {label ? <>📍 <span className="font-medium text-foreground">{label}</span></> : 'Tap the spot where you last had it'}
        </p>
      )}
      {onPin && (
        <Button type="button" variant="secondary" className="w-full rounded-lg hover:scale-100" onClick={useMyLocation}>
          <LocateFixed /> Use my current location
        </Button>
      )}
      <p className="text-xs text-muted-foreground">Sample festival map · illustrative, not live GPS.</p>
    </div>
  );
}
