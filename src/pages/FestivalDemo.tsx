import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Check, Compass, FileText, HeartHandshake, MapPin, Search, Package, Tent, Sparkles, Smartphone, Key, Glasses, Backpack, Shirt, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ItemDetailsForm, type ItemDetails } from '@/components/item-details-form';
import { CameraCapture } from '@/components/camera-capture';
import { VerificationQuiz } from '@/components/verification-quiz';
import campImage from '@/assets/desert-camp.asset.json';

const categories = [
  { name: 'Phone', icon: Smartphone }, { name: 'Keys', icon: Key },
  { name: 'Glasses', icon: Glasses }, { name: 'Bag', icon: Backpack },
  { name: 'Clothing', icon: Shirt }, { name: 'Other', icon: MoreHorizontal },
];
const sampleDetails: ItemDetails = {
  color: 'Blue', brand: 'Nike', condition: 'Small tear',
  contents: ['Red water bottle'], uniqueMarks: ['Sticker on the back'], additionalNotes: '',
};
type Step = 'category' | 'method' | 'details' | 'photo' | 'location' | 'reward' | 'submitted';

export default function FestivalDemo() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const mode = pathname.endsWith('/lost') ? 'lost' : pathname.endsWith('/found') ? 'found' : pathname.endsWith('/claim') ? 'claim' : 'home';
  const [step, setStep] = useState<Step>('category');
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [photo, setPhoto] = useState('');
  const [place, setPlace] = useState('');
  const [reward, setReward] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [pickup, setPickup] = useState(false);
  const isLost = mode === 'lost';
  const home = () => navigate('/festival');
  const back = () => {
    if (mode === 'claim' || step === 'category' || step === 'submitted') return home();
    if (step === 'method') setStep('category');
    else if (step === 'details' || step === 'photo') setStep('method');
    else if (step === 'location') setStep(photo ? 'photo' : details ? 'details' : 'method');
    else setStep('location');
  };
  const progress = step === 'category' ? 0 : ['method', 'details', 'photo'].includes(step) ? 1 : step === 'location' ? 2 : 3;
  return (
    <div className="festival-theme min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
          <Link to="/festival" className="flex items-center gap-3" aria-label="MidBurn lost and found home">
            <Tent className="h-7 w-7" />
            <span className="leading-tight"><span className="block text-xl font-semibold">MIDBURN</span><span className="text-xs text-muted-foreground">LOST & FOUND</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Festival concept</span>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link to="/demo">Classic demo <ArrowRight /></Link></Button>
          </div>
        </div>
      </header>

      {mode === 'home' ? (
        <>
          <section className="festival-scene relative isolate overflow-hidden">
            <img src={campImage.url} alt="Volunteers welcome a festival participant to a desert lost and found camp at dusk" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="festival-scrim absolute inset-0" />
            <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
              <p className="mb-5 flex items-center gap-2 text-sm font-medium text-festival-ink"><Compass className="h-4 w-4" /> A little direction in the beautiful chaos.</p>
              <h1 className="festival-heading max-w-xl text-5xl font-medium leading-[1.05] text-festival-ink sm:text-6xl">MidBurn<br />Lost & Found.</h1>
              <p className="mt-5 max-w-sm text-xl text-festival-ink">Lost in the dust?<br />We're with you.</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-festival-ink">Take a breath. There’s a light at the end of the tunnel — let’s find your way back to what matters.</p>
              <div className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-lg bg-festival-light text-festival-light-foreground hover:scale-100 hover:bg-festival-light/90"><Link to="/festival/lost"><Search /> I lost something <ArrowRight /></Link></Button>
                <Button asChild size="lg" variant="secondary" className="rounded-lg hover:scale-100"><Link to="/festival/found"><Package /> I found something</Link></Button>
              </div>
            </div>
          </section>
          <section className="mx-auto grid max-w-6xl gap-8 px-5 py-9 sm:px-8 md:grid-cols-[1fr_1fr] md:gap-16">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"><HeartHandshake className="h-5 w-5" /> People looking out for people.</div>
              <h2 className="festival-heading text-3xl">A camp. A crew.<br />A way back.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">No photo? No problem. A few details can help connect the dots. And if you’re feeling stuck, the Lostly camp crew is with you.</p>
            </div>
            <div className="border-t border-border pt-5 md:border-t-0 md:pt-0">
              <p className="mb-2 flex items-center gap-2 font-medium"><Sparkles className="h-5 w-5 text-primary" /> A familiar detail can be the spark.</p>
              <p className="text-sm leading-relaxed text-muted-foreground">Think you’ve spotted your item? Let’s check the little things only you would know.</p>
              <Button asChild variant="link" className="mt-3 h-auto justify-start p-0 hover:scale-100"><Link to="/festival/claim">Try a sample ownership check <ArrowRight /></Link></Button>
              <p className="mt-4 text-xs text-muted-foreground">Sample item: blue Nike bag · small tear · red water bottle · sticker on the back.</p>
            </div>
          </section>
        </>
      ) : (
        <main className="mx-auto max-w-2xl px-5 py-7 sm:px-8 sm:py-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" onClick={back} aria-label="Go back"><ArrowLeft /></Button>
            <span className="flex items-center gap-2 text-sm text-muted-foreground"><Tent className="h-4 w-4" /> We’re in this together.</span>
          </div>
          {mode === 'claim' ? (
            <div className="space-y-7">
              <div className="text-center"><p className="mb-2 text-xs text-muted-foreground">SAMPLE OWNERSHIP CHECK</p><h1 className="festival-heading text-4xl">A little closer to home.</h1></div>
              {pickup ? (
                <div className="space-y-5 py-8 text-center"><Tent className="mx-auto h-12 w-12 text-primary" /><h2 className="text-2xl font-semibold">The crew takes it from here.</h2><p className="text-muted-foreground">In the live festival experience, confirmed owners would receive pickup instructions from the lost & found team.</p><p className="text-sm text-muted-foreground">This sample check hasn’t reserved a real item.</p><Button onClick={home}>Back to the festival <ArrowRight /></Button></div>
              ) : (
                <><VerificationQuiz category="Bag" itemDetails={sampleDetails} requiredCorrect={2} onResult={(passed) => setResult(passed)} />{result === true && <Button className="w-full" onClick={() => setPickup(true)}>Meet the camp crew <ArrowRight /></Button>}</>
              )}
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center gap-2" aria-label={`Step ${progress + 1} of 4`}>
                {['The item', 'The details', 'The place', 'One last thing'].map((label, i) => <div key={label} className="flex-1"><div className={`mb-2 h-1 rounded-full ${i <= progress ? 'bg-primary' : 'bg-muted'}`} /><span className="text-xs text-muted-foreground">{label}</span></div>)}
              </div>
              {step === 'category' && <><h1 className="festival-heading text-4xl">{isLost ? 'What’s missing?' : 'What did you find?'}</h1><p className="mb-7 mt-3 text-muted-foreground">{isLost ? 'Deep breath. Let’s start with one small step.' : 'Someone’s day is about to get a little brighter.'}</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{categories.map(({name, icon: Icon}) => <Button key={name} variant="secondary" className="h-28 flex-col rounded-lg border border-border bg-card hover:scale-100 hover:border-primary" onClick={() => {setCategory(name); setStep('method');}}><Icon className="!h-7 !w-7" />{name}</Button>)}</div></>}
              {step === 'method' && <><h1 className="festival-heading text-4xl">A photo or a few clues?</h1><p className="mb-7 mt-3 text-muted-foreground">{isLost ? 'No perfect picture needed. Your memory is a good place to start.' : 'The little details help us find the right person.'}</p><div className="space-y-3"><Button variant="secondary" className="h-auto w-full justify-start whitespace-normal rounded-lg p-5 text-left hover:scale-100" onClick={() => setStep('details')}><FileText /><span><span className="block font-semibold">Describe the {category.toLowerCase()}</span><span className="block text-sm font-normal text-muted-foreground">Color, a sticker, that little scratch…</span></span><ArrowRight className="ml-auto" /></Button><Button variant="secondary" className="h-auto w-full justify-start rounded-lg p-5 hover:scale-100" onClick={() => setStep('photo')}><Camera />{isLost ? 'I have a photo' : 'Take a photo'}<ArrowRight className="ml-auto" /></Button></div></>}
              {step === 'details' && <><h1 className="festival-heading text-4xl">The little things matter.</h1><p className="mb-7 mt-3 text-muted-foreground">Tell us what makes this {category.toLowerCase()} unmistakable.</p><ItemDetailsForm category={category} onSubmit={(value) => {setDetails(value); setPhoto(''); setStep('location');}} /></>}
              {step === 'photo' && <><h1 className="festival-heading text-4xl">A picture is a good start.</h1><p className="mb-7 mt-3 text-muted-foreground">A clear photo of the {category.toLowerCase()} helps connect the dots.</p><CameraCapture itemCategory={category} onCapture={(value) => {setPhoto(value); setStep('location');}} /></>}
              {step === 'location' && <><h1 className="festival-heading text-4xl">Where in the dust?</h1><p className="mb-7 mt-3 text-muted-foreground">{isLost ? 'Where do you remember having it last?' : 'Where did your paths cross?'}</p><div className="mb-6 grid grid-cols-2 gap-3">{['Near my camp', 'The dance floor', 'An art installation', 'Out on the playa'].map((name) => <Button key={name} variant={place === name ? 'default' : 'secondary'} className="h-auto min-h-14 whitespace-normal rounded-lg hover:scale-100" aria-pressed={place === name} onClick={() => setPlace(name)}><MapPin />{name}</Button>)}</div><Label htmlFor="festival-place">A camp name or landmark</Label><Input id="festival-place" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Whatever you remember" className="mb-6 mt-2" /><Button disabled={!place.trim()} className="w-full" onClick={() => setStep('reward')}>One small step closer <ArrowRight /></Button></>}
              {step === 'reward' && <><HeartHandshake className="mb-4 h-10 w-10 text-primary" /><h1 className="festival-heading text-4xl">{isLost ? 'A thank-you, only if you want.' : 'Your good deed. Your choice.'}</h1><p className="mb-7 mt-3 text-muted-foreground">Rewards are always optional — and never part of shipping or delivery costs.</p>{isLost ? <><Label htmlFor="festival-reward">Optional reward amount (₪)</Label><Input id="festival-reward" type="number" min="0" value={reward} onChange={(e) => setReward(e.target.value)} placeholder="0 — a thank-you is enough" className="mt-2" /></> : <div className="space-y-3">{['Decline rewards', 'Accept rewards', 'Donate to charity'].map((name) => <Button key={name} variant={reward === name ? 'default' : 'secondary'} className="w-full rounded-lg hover:scale-100" aria-pressed={reward === name} onClick={() => setReward(name)}>{name}</Button>)}</div>}<Button className="mt-7 w-full" onClick={() => setStep('submitted')}>{isLost ? 'Finish sample report' : 'Finish sample found report'} <ArrowRight /></Button></>}
              {step === 'submitted' && <div className="space-y-5 py-7 text-center"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"><Check className="h-10 w-10 text-primary" /></div><h1 className="festival-heading text-4xl">{isLost ? 'You’re not on your own.' : 'You’re someone’s light.'}</h1><p className="text-muted-foreground">{isLost ? `Your sample ${category.toLowerCase()} report is ready. In the live festival experience, the crew would use these clues to look for a match.` : `Your sample ${category.toLowerCase()} report is ready. In the field, bring the item to the Lostly camp so the crew can keep it safe.`}</p><p className="text-sm text-muted-foreground"><MapPin className="mr-1 inline h-4 w-4" />{place}</p><Button asChild className="w-full"><Link to="/festival/claim">Explore a sample ownership check <ArrowRight /></Link></Button><Button variant="ghost" onClick={home}>Back to the festival</Button></div>}
            </>
          )}
        </main>
      )}
      <footer className="border-t border-border px-5 py-5 text-center text-xs leading-relaxed text-muted-foreground">Illustrative MidBurn experience · No affiliation implied · No real reports or reservations.<br /><span className="mt-1 inline-block">Lostly camp · A little light in the dust.</span></footer>
    </div>
  );
}