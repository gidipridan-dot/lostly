import { DropPinMap } from '@/components/drop-pin-map';
import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Check, Compass, FileText, HeartHandshake, MapPin, Search, Package, Tent, Sparkles, Smartphone, Key, Glasses, Backpack, Shirt, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ItemDetailsForm, type ItemDetails } from '@/components/item-details-form';
import { isOtherCategory, itemDisplayName } from '@/lib/item-naming';
import { CameraCapture } from '@/components/camera-capture';
import { FestivalReunion } from '@/components/festival-reunion';
import { FestivalQuestTrail } from '@/components/festival-quest-trail';
import { FestivalFinderJourney } from '@/components/festival-finder-journey';
import { FestivalLightPath } from '@/components/festival-light-path';
import campImage from '@/assets/desert-camp.asset.json';

const categories = [
  { name: 'Phone', icon: Smartphone }, { name: 'Keys', icon: Key },
  { name: 'Glasses', icon: Glasses }, { name: 'Bag', icon: Backpack },
  { name: 'Clothing', icon: Shirt }, { name: 'Other', icon: MoreHorizontal },
];
const sampleDetails: ItemDetails = {
  itemName: '',
  color: 'Blue', brand: 'Nike', condition: 'Small tear',
  contents: ['Red water bottle'], uniqueMarks: ['Sticker on the back'], additionalNotes: '',
};
type Step = 'category' | 'details' | 'photo' | 'location' | 'reward' | 'submitted';

function Hint({ children }: { children: ReactNode }) {
  return <p className="mb-6 mt-2 text-base text-muted-foreground">{children}</p>;
}

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
  const isLost = mode === 'lost';
  const home = () => navigate('/festival');
  const back = () => {
    if (mode === 'claim' || step === 'category' || step === 'submitted') return home();
    if (step === 'details') setStep('category');
    else if (step === 'photo') setStep('details');
    else if (step === 'location') setStep(photo ? 'photo' : 'details');
    else setStep('location');
  };
  const total = isLost ? 3 : 4;
  const progress = step === 'category' ? 0 : step === 'details' || step === 'photo' ? 1 : step === 'location' ? 2 : 3;
  const name = itemDisplayName(category, details?.itemName).toLowerCase();
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
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link to="/">Lostly home <ArrowRight /></Link></Button>
          </div>
        </div>
      </header>

      {mode === 'home' ? (
        <>
          <section className="festival-scene relative isolate overflow-hidden">
            <img src={campImage.url} alt="Volunteers welcome a festival participant to a desert lost and found camp at dusk" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="festival-scrim absolute inset-0" />
            <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
              <p className="mb-5 flex items-center gap-2 text-sm font-medium text-festival-ink"><Compass className="h-4 w-4" /> A side quest in the beautiful chaos.</p>
              <h1 className="festival-heading max-w-xl text-5xl font-medium leading-[1.05] text-festival-ink sm:text-6xl">MidBurn<br />Lost & Found.</h1>
              <p className="mt-5 max-w-sm text-xl text-festival-ink">Your next side quest?<br />Find your way back.</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-festival-ink">Lost in the dust? We’re with you. A few clues, a little camp magic, and hopefully a reunion worth dancing about.</p>
              <div className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-lg bg-festival-light text-festival-light-foreground hover:scale-100 hover:bg-festival-light/90"><Link to="/festival/lost"><Compass /> Start my lost-item quest <ArrowRight /></Link></Button>
                <Button asChild size="lg" variant="secondary" className="rounded-lg hover:scale-100"><Link to="/festival/found"><HeartHandshake /> Be someone’s way back</Link></Button>
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-6xl px-5 py-9 sm:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
              <div className="md:w-2/5">
                <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"><HeartHandshake className="h-5 w-5" /> No solo quests here.</p>
                <h2 className="festival-heading text-3xl">Not lost forever.<br />Just on a detour.</h2>
                <p className="mt-3 text-muted-foreground">You bring the memories. We bring the crew. Somewhere in the dust, your paths might cross again.</p>
              </div>
              <div className="min-w-0 flex-1">
                <FestivalQuestTrail overview />
                <Button asChild variant="link" className="mt-3 h-auto whitespace-normal p-0 text-left hover:scale-100"><Link to="/festival/claim">A spark just landed — follow a sample match <ArrowRight /></Link></Button>
                <p className="mt-3 text-xs text-muted-foreground">Sample clues: blue Nike bag · small tear · red water bottle · sticker on the back.</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <main className="mx-auto max-w-2xl px-5 py-7 sm:px-8 sm:py-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Button variant="ghost" size="icon" onClick={back} aria-label="Go back"><ArrowLeft /></Button>
            <span className="flex items-center gap-2 text-sm text-muted-foreground"><HeartHandshake className="h-4 w-4" /> We’re with you.</span>
          </div>
          {mode === 'claim' ? (
            <FestivalReunion category="Bag" details={sampleDetails} sampleMatch onHome={home} />
          ) : isLost && step === 'submitted' ? (
            <FestivalReunion category={itemDisplayName(category, details?.itemName)} details={details} place={place} photo={photo} onHome={home} />
          ) : step === 'submitted' ? (
            <FestivalFinderJourney category={itemDisplayName(category, details?.itemName)} place={place} reward={reward} onHome={home} />
          ) : (
            <>
              <div className="mb-6">
                <FestivalLightPath role={isLost ? 'lost' : 'found'} current={0} />
                <div className="mt-4 flex items-center gap-2" aria-label={`Step ${progress + 1} of ${total}`}>{Array.from({ length: total }, (_, i) => <span key={i} className={`h-2 rounded-full transition-all duration-500 ${i === progress ? 'w-8 bg-primary' : i < progress ? 'w-2 bg-primary' : 'w-2 bg-border'}`} />)}<span className="ml-2 text-xs text-muted-foreground">{progress + 1} of {total}</span></div>
              </div>
              <div key={step} className="quest-chapter">
              {step === 'category' && <><h1 className="festival-heading text-4xl">{isLost ? 'Oh no. What went missing?' : 'You found something? Legend.'}</h1><Hint>{isLost ? 'Breathe. It happens to everyone out here. Just tap what it is.' : 'Tap what it is. Someone out there will be so glad.'}</Hint><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{categories.map(({name, icon: Icon}) => <Button key={name} variant="secondary" className="h-28 flex-col rounded-lg border border-border bg-card transition-transform hover:-translate-y-1 hover:border-primary active:scale-95" onClick={() => {setCategory(name); setStep('details');}}><Icon className="!h-7 !w-7" />{name}</Button>)}</div></>}
              {step === 'details' && <><h1 className="festival-heading text-4xl">{isLost ? 'Tell us about it.' : 'What does it look like?'}</h1><Hint>{isOtherCategory(category) ? 'Just a name and a color. That’s plenty.' : `A color is enough. Anything else is a bonus.`}</Hint><Button variant="secondary" className="mb-6 w-full rounded-lg hover:scale-100" onClick={() => setStep('photo')}><Camera /> {isLost ? 'I have a photo instead' : 'Take a photo instead'}</Button><ItemDetailsForm category={category} onSubmit={(value) => {setDetails(value); setPhoto(''); setStep('location');}} /></>}
              {step === 'photo' && <><h1 className="festival-heading text-4xl">Snap it.</h1><Hint>One clear photo of the {name}. No pressure to be perfect.</Hint><CameraCapture itemCategory={category} onCapture={(value) => {setPhoto(value); setStep('location');}} /></>}
              {step === 'location' && <><h1 className="festival-heading text-4xl">{isLost ? 'Where did you last see it?' : 'Where was it?'}</h1><Hint>{isLost ? 'A rough guess is fine. Tap the map.' : 'Tap the map. Roughly is fine.'}</Hint><div className="mb-6"><DropPinMap onPin={setPlace} /></div><Label htmlFor="festival-place">Or type a camp name or landmark</Label><Input id="festival-place" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Whatever you remember" className="mb-6 mt-2" /><Button disabled={!place.trim()} className="w-full" onClick={() => setStep(isLost ? 'submitted' : 'reward')}>{isLost ? 'Send it to the crew' : 'Next'} <ArrowRight /></Button></>}
              {step === 'reward' && <><HeartHandshake className="mb-4 h-10 w-10 text-primary" /><h1 className="festival-heading text-4xl">A thank-you, if you like.</h1><Hint>Totally optional. Pick one and you’re done.</Hint><div className="space-y-3">{['Decline rewards', 'Accept rewards', 'Donate to charity'].map((name) => <Button key={name} variant={reward === name ? 'default' : 'secondary'} className="w-full rounded-lg hover:scale-100" aria-pressed={reward === name} onClick={() => setReward(name)}>{name}</Button>)}</div><Button className="mt-7 w-full" onClick={() => setStep('submitted')}>Done, send it <ArrowRight /></Button></>}
              </div>
            </>
          )}
        </main>
      )}
      <footer className="border-t border-border px-5 py-5 text-center text-xs leading-relaxed text-muted-foreground">Illustrative MidBurn experience · No affiliation implied · No real reports or reservations.<br /><span className="mt-1 inline-block">Lostly camp · A little light in the dust.</span></footer>
    </div>
  );
}