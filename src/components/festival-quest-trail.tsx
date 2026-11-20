import { Check, Compass, Flag, Footprints, Sparkles, Tent } from 'lucide-react';

const stops = [
  { label: 'Your clues', icon: Compass },
  { label: 'A little spark', icon: Sparkles },
  { label: 'The way back', icon: Footprints },
  { label: 'Lostly camp', icon: Tent },
  { label: 'Together again', icon: Flag },
];

export function FestivalQuestTrail({ current = 0, overview = false }: { current?: number; overview?: boolean }) {
  return (
    <div className="quest-trail relative py-5">
      <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="pointer-events-none absolute left-[10%] top-7 h-20 w-[80%] text-border" aria-hidden="true">
        <path d="M0 30 C70 30 70 75 150 75 S230 5 300 5 S370 75 450 75 S530 30 600 30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 7" />
      </svg>
      <ol className="relative grid grid-cols-5 gap-1" aria-label="Your side quest">
        {stops.map(({ label, icon: Icon }, index) => (
          <li key={label} aria-current={!overview && index === current ? 'step' : undefined} className={`quest-stop flex min-w-0 flex-col items-center text-center ${index % 2 ? 'pt-8' : ''}`}>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:h-14 sm:w-14 ${!overview && index <= current ? 'border-foreground bg-festival-light text-festival-light-foreground' : 'border-border bg-background text-muted-foreground'} ${!overview && index === current ? 'quest-beacon' : ''}`}>
              {!overview && index < current ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5 sm:h-6 sm:w-6" />}
            </span>
            <span className="mt-3 max-w-20 text-xs leading-snug">{label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}