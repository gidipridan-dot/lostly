import { useEffect, useState } from 'react';
import { ArrowRight, BellRing, Check, Compass, HeartHandshake, MapPin, ShieldCheck, Tent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FestivalLightPath } from '@/components/festival-light-path';

type FinderStage = 'dropoff' | 'beacon' | 'owner' | 'reunion';
const order: FinderStage[] = ['dropoff', 'beacon', 'owner', 'reunion'];

/** Two travelers, one path: shown at the end of both festival journeys. */
export function FoundPathRecap({ category }: { category: string }) {
  const item = category.toLowerCase();
  return (
    <div className="rounded-lg border border-border bg-card p-5 text-left">
      <p className="mb-4 text-xs font-semibold">THE FOUND PATH · SAMPLE</p>
      <ol className="space-y-3 text-sm">
        <li className="flex gap-3"><HeartHandshake className="h-5 w-5 shrink-0" /><span><strong>The finder</strong> picked up a {item} and brought it to camp.</span></li>
        <li className="flex gap-3"><Compass className="h-5 w-5 shrink-0" /><span><strong>The owner</strong> shared clues and proved the little things.</span></li>
        <li className="flex gap-3"><Tent className="h-5 w-5 shrink-0" /><span><strong>Lostly camp</strong> brought both paths together.</span></li>
      </ol>
    </div>
  );
}

export function FestivalFinderJourney({ category, place, reward, onHome }: { category: string; place: string; reward: string; onHome: () => void }) {
  const [stage, setStage] = useState<FinderStage>('dropoff');
  const index = order.indexOf(stage);
  const next = () => setStage(order[Math.min(index + 1, order.length - 1)]);
  const item = category.toLowerCase();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [stage]);
  useEffect(() => {
    if (stage !== 'beacon') return;
    const t = setTimeout(() => setStage('owner'), 3500);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <div className="space-y-7">
      <div className="border-b border-border pb-4">
        <p className="mb-3 text-xs text-muted-foreground">YOUR GOOD-KARMA SIDE QUEST · DEMO</p>
        <FestivalLightPath role="found" current={index + 1} />
      </div>
      <div key={stage} className="quest-chapter">
        {stage === 'dropoff' && <div className="space-y-5">
          <h1 className="festival-heading text-4xl">Bring it to the light.</h1>
          <p className="text-muted-foreground">Drop the {item} at Lostly camp. The crew keeps it safe so you can get back to the magic.</p>
          <p className="flex items-start gap-3 text-sm"><MapPin className="mt-0.5 h-5 w-5 shrink-0" /><span>Found near {place || 'the playa'} · sample. Camp landmark to be confirmed.</span></p>
          <Button className="w-full" onClick={next}><Tent /> I left it with the crew · sample <ArrowRight /></Button>
        </div>}
        {stage === 'beacon' && <div className="space-y-5 py-5 text-center">
          <BellRing className="mx-auto h-12 w-12 animate-pulse" />
          <h1 className="festival-heading text-4xl">The beacon is lit.</h1>
          <p className="text-muted-foreground">The crew is matching your {item} with lost-item clues. Somewhere out there, someone is about to get good news.</p>
          <Button className="w-full" onClick={next}>See who it reaches · sample <ArrowRight /></Button>
        </div>}
        {stage === 'owner' && <div className="space-y-5">
          <div role="status" className="rounded-lg border border-border bg-card p-5 shadow-elegant">
            <p className="mb-3 text-xs text-muted-foreground">LOSTLY CAMP · Just now · Sample</p>
            <h2 className="flex items-center gap-2 text-xl font-semibold"><ShieldCheck className="h-5 w-5" /> Its person found the way back.</h2>
            <p className="mt-2 text-muted-foreground">The owner answered the familiar clues and is heading to camp. You don’t need to meet them — the crew handles the handover.</p>
          </div>
          <Button className="w-full" onClick={next}>Follow them into the light <ArrowRight /></Button>
        </div>}
        {stage === 'reunion' && <div className="space-y-5 py-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary"><Check className="h-10 w-10 animate-pop" /></div>
          <h1 className="festival-heading text-4xl">You were someone’s light.</h1>
          <p className="text-muted-foreground">The {item} is back with its person. Your small act made a whole new ending to their festival.</p>
          <div className="quest-stamp mx-auto flex h-28 w-28 rotate-[-8deg] flex-col items-center justify-center rounded-full border-2 border-dashed border-foreground text-xs font-semibold"><HeartHandshake className="mb-2 h-7 w-7" />GOOD KARMA<br />LOSTLY CAMP</div>
          <FoundPathRecap category={category} />
          {reward && <p className="text-sm text-muted-foreground">Your reward choice: {reward}. Always optional.</p>}
          <p className="text-sm text-muted-foreground">Sample handover · No real item was collected.</p>
          <Button className="w-full" onClick={onHome}>Back to the festival <ArrowRight /></Button>
        </div>}
      </div>
    </div>
  );
}
