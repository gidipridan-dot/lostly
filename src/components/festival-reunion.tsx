import { useEffect, useState } from 'react';
import { ArrowRight, BellRing, Check, Clock, HeartHandshake, MapPin, PackageCheck, ShieldCheck, Tent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VerificationQuiz } from '@/components/verification-quiz';
import type { ItemDetails } from '@/components/item-details-form';
import { nextReunionStage, sampleFinderDetails, type ReunionStage } from '@/lib/festival-recovery';
import { FestivalLightPath } from '@/components/festival-light-path';
import { FoundPathRecap } from '@/components/festival-finder-journey';
import campImage from '@/assets/desert-camp.asset.json';

interface Props {
  category: string;
  details: ItemDetails | null;
  place?: string;
  photo?: string;
  sampleMatch?: boolean;
  onHome: () => void;
}

export function FestivalReunion({ category, details, place, photo, sampleMatch = false, onHome }: Props) {
  const [stage, setStage] = useState<ReunionStage>(sampleMatch ? 'notification' : 'waiting');
  const [finderDetails] = useState(() => sampleFinderDetails(details));
  const [verified, setVerified] = useState(false);
  const advance = (event: Parameters<typeof nextReunionStage>[1]) => setStage((current) => nextReunionStage(current, event));

  useEffect(() => {
    if (stage !== 'waiting') return;
    const timer = setTimeout(() => setStage((current) => nextReunionStage(current, 'found')), 3500);
    return () => clearTimeout(timer);
  }, [stage]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [stage]);

  const progress = ['waiting', 'notification', 'match'].includes(stage) ? (stage === 'waiting' ? 0 : 1) : stage === 'verify' ? 2 : stage === 'collected' ? 4 : 3;
  return (
    <div className="space-y-7">
      <div className="border-b border-border pb-4">
        <p className="mb-3 text-xs text-muted-foreground">YOUR LOST-ITEM SIDE QUEST · DEMO</p>
        <FestivalLightPath current={progress} />
      </div>
      <div key={stage} className="quest-chapter">
      {stage === 'waiting' && <div className="space-y-5 py-5 text-center">
        <Tent className="mx-auto h-12 w-12" />
        <h1 className="festival-heading text-4xl">Clues sent. You have a crew.</h1>
        <p className="text-muted-foreground">Your sample {category.toLowerCase()} report is ready. Take a breath — you’re not searching alone.</p>
        <p className="text-sm text-muted-foreground">Stay a while. There might be a little spark in the dust…</p>
        <Button className="w-full" onClick={() => advance('found')}><BellRing /> Find the next spark · sample</Button>
      </div>}

      {stage === 'notification' && <div className="space-y-6 animate-fade-in">
        <div role="status" aria-live="polite" className="rounded-lg border border-border bg-card p-5 shadow-elegant">
          <div className="mb-4 flex items-center justify-between gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-2"><Tent className="h-4 w-4" /> MIDBURN LOST & FOUND</span><span>Just now · Sample</span></div>
          <div className="flex items-start gap-3"><BellRing className="mt-1 h-6 w-6 shrink-0" /><div><h2 className="text-xl font-semibold">Plot twist: a little spark!</h2><p className="mt-2 text-muted-foreground">Someone handed in a {category.toLowerCase()} that could be yours. The Lostly crew is keeping it safe.</p></div></div>
          <Button className="mt-5 w-full" onClick={() => advance('open')}>Follow the spark <ArrowRight /></Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">A possible match, not confirmed ownership yet. Let’s check the little things.</p>
      </div>}

      {stage === 'match' && <div className="space-y-5">
        <h1 className="festival-heading text-4xl">A familiar traveler?</h1>
        <div className="flex items-center gap-4 border-y border-border py-5">
          {photo ? <img src={photo} alt="Your submitted item photo" className="h-24 w-24 rounded-lg object-cover" /> : <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-secondary"><PackageCheck className="h-10 w-10" /></div>}
          <div className="min-w-0"><p className="text-xs text-muted-foreground">POSSIBLE MATCH · SAMPLE</p><h2 className="mt-1 text-2xl font-semibold">{category}</h2><p className="mt-1 text-sm text-muted-foreground">{photo ? 'Your report photo · not a finder photo' : 'No finder photo needed'}</p></div>
        </div>
        <dl className="space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Found near</dt><dd className="text-right">{place || 'An art installation'} · sample</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Handed in</dt><dd>Today · sample</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Safe with</dt><dd>Lostly camp crew</dd></div></dl>
        <p className="text-muted-foreground">A few details only you know will help the crew return it to the right person.</p>
        {!details && <p className="text-xs text-muted-foreground">Sample verification clues: blue · good condition.</p>}
        <Button className="w-full" onClick={() => advance('verify')}><ShieldCheck /> Unlock the familiar clues <ArrowRight /></Button>
        <Button variant="ghost" className="w-full" onClick={() => setStage('waiting')}>Not my item — keep looking</Button>
      </div>}

      {stage === 'verify' && <div className="space-y-6">
        <VerificationQuiz festival category={category} itemDetails={finderDetails} requiredCorrect={2} onResult={(passed) => setVerified(passed)} />
        {verified && <Button className="w-full" onClick={() => advance('passed')}>Next stop: our camp <ArrowRight /></Button>}
      </div>}

      {(stage === 'pickup' || stage === 'pass') && <div className="space-y-5">
        <p className="flex items-center gap-2 text-sm"><ShieldCheck className="h-4 w-4" /> Sample ownership confirmed</p>
        <h1 className="festival-heading text-4xl">Follow the trail to Lostly camp.</h1>
        <img src={campImage.url} alt="Illustrative Lostly camp meetup" className="aspect-[16/9] w-full rounded-lg object-cover" />
        <div className="space-y-4 border-b border-border pb-5"><p className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0" /><span><strong className="block">Lostly camp · Lost & Found desk</strong><span className="text-sm text-muted-foreground">Exact festival landmark to be confirmed. This is a sample meetup, not a live location.</span></span></p><p className="flex items-start gap-3"><Clock className="mt-1 h-5 w-5 shrink-0" /><span><strong className="block">Next step: check in with the crew</strong><span className="text-sm text-muted-foreground">In the live experience, crew-confirmed opening hours and directions would appear here.</span></span></p><p className="text-sm">Pickup is free. A thank-you is optional and never required to get your item back.</p></div>
        {stage === 'pickup' ? <><p className="text-muted-foreground">We’ll keep the handover with the camp crew — no need to find or contact the finder.</p><Button className="w-full" onClick={() => advance('reserve')}>Collect my camp pass · sample <ArrowRight /></Button></> : <>
          <div className="quest-pass rounded-lg border-2 border-dashed border-foreground bg-card p-6 text-center"><Tent className="mx-auto mb-3 h-8 w-8" /><p className="text-xs text-muted-foreground">SAMPLE PICKUP PASS · NOT A REAL RESERVATION</p><p className="my-4 text-3xl font-semibold">DUST-024</p><p className="text-sm">Show this pass to the Lostly crew.<br />They check the reference and hand you your {category.toLowerCase()}.</p></div>
          <Button className="w-full" onClick={() => advance('handover')}><PackageCheck /> Reunite with my {category.toLowerCase()} · sample</Button>
        </>}
        <Button variant="outline" className="w-full" onClick={() => advance('away')}>I’ve already left the festival</Button>
      </div>}

      {stage === 'away' && <div className="space-y-5 py-5">
        <HeartHandshake className="h-12 w-12" /><h1 className="festival-heading text-4xl">Already home? Still with you.</h1>
        <p className="text-muted-foreground">The camp crew keeps your item safe. In the live experience, they would arrange an authorized pickup or quote local delivery or international shipping to your address.</p>
        <p className="text-sm text-muted-foreground">No delivery is booked or charged in this sample. Shipping costs and any optional reward stay separate.</p>
        <Button className="w-full" onClick={() => setStage('pickup')}>Back to the camp pickup plan</Button><Button variant="ghost" className="w-full" onClick={onHome}>Back to the festival</Button>
      </div>}

      {stage === 'collected' && <div className="space-y-5 py-8 text-center animate-fade-in"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary"><Check className="h-10 w-10 animate-pop" /></div><h1 className="festival-heading text-4xl">Side quest complete.<br />Back to the magic.</h1><p className="text-muted-foreground">Your sample {category.toLowerCase()} has made it home. A finder, a crew, and a few familiar details brought you back together.</p><div className="quest-stamp mx-auto flex h-28 w-28 rotate-[-8deg] flex-col items-center justify-center rounded-full border-2 border-dashed border-foreground text-xs font-semibold"><Tent className="mb-2 h-7 w-7" />REUNITED<br />LOSTLY CAMP</div><FoundPathRecap category={category} />
<p className="text-sm text-muted-foreground">Sample handover complete · No real item was collected.</p><Button className="w-full" onClick={onHome}>Back to the festival <ArrowRight /></Button></div>}
      </div>
    </div>
  );
}