import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, HelpCircle, ShieldCheck, Sparkles, Home, PackageCheck, RotateCcw } from 'lucide-react';
import { type ItemDetails } from '@/components/item-details-form';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface VerificationQuizProps {
  category: string;
  itemDetails: ItemDetails;
  requiredCorrect?: number;
  onResult: (passed: boolean, score: number, total: number) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(category: string, details: ItemDetails): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // Color question
  if (details.color) {
    const decoys = ['Black', 'White', 'Blue', 'Red', 'Green', 'Brown', 'Gray', 'Pink', 'Yellow', 'Orange']
      .filter((c) => c.toLowerCase() !== details.color.toLowerCase());
    const picked = shuffle(decoys).slice(0, 3);
    const options = shuffle([details.color, ...picked]);
    questions.push({
      question: `What color is the ${category.toLowerCase()}?`,
      options,
      correctIndex: options.indexOf(details.color),
    });
  }

  // Brand question
  if (details.brand) {
    const decoys = ['Nike', 'Adidas', 'Samsung', 'Apple', 'Sony', 'The North Face', 'Puma', 'HP', 'Dell', 'LG']
      .filter((b) => b.toLowerCase() !== details.brand.toLowerCase());
    const picked = shuffle(decoys).slice(0, 3);
    const options = shuffle([details.brand, ...picked]);
    questions.push({
      question: `What brand is the ${category.toLowerCase()}?`,
      options,
      correctIndex: options.indexOf(details.brand),
    });
  }

  // Condition question
  if (details.condition) {
    const decoys = ['Like new', 'Good', 'Scratched', 'Cracked screen', 'Small tear', 'Stained', 'Worn out']
      .filter((c) => c !== details.condition);
    const picked = shuffle(decoys).slice(0, 3);
    const options = shuffle([details.condition, ...picked]);
    questions.push({
      question: `Does the ${category.toLowerCase()} have any special marks or condition?`,
      options,
      correctIndex: options.indexOf(details.condition),
    });
  }

  // Contents question
  if (details.contents.length > 0) {
    const correct = details.contents[0];
    const decoys = ['Notebook', 'Phone charger', 'Sunglasses', 'Headphones', 'Pen', 'Water bottle', 'Keys', 'Wallet']
      .filter((c) => !details.contents.some((ct) => ct.toLowerCase() === c.toLowerCase()));
    const picked = shuffle(decoys).slice(0, 3);
    const options = shuffle([correct, ...picked]);
    questions.push({
      question: `What was found inside the ${category.toLowerCase()}?`,
      options,
      correctIndex: options.indexOf(correct),
    });
  }

  // Unique marks question
  if (details.uniqueMarks.length > 0) {
    const correct = details.uniqueMarks[0];
    const decoys = ['Large sticker', 'Name tag', 'Keychain attached', 'Scratch on front', 'Custom engraving', 'No marks']
      .filter((m) => !details.uniqueMarks.some((um) => um.toLowerCase() === m.toLowerCase()));
    const picked = shuffle(decoys).slice(0, 3);
    const options = shuffle([correct, ...picked]);
    questions.push({
      question: `Which unique feature does the ${category.toLowerCase()} have?`,
      options,
      correctIndex: options.indexOf(correct),
    });
  }

  return shuffle(questions);
}

export const VerificationQuiz: React.FC<VerificationQuizProps> = ({
  category,
  itemDetails,
  requiredCorrect = 2,
  onResult,
}) => {
  const questions = useMemo(() => generateQuestions(category, itemDetails), [category, itemDetails]);
  const [stage, setStage] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const totalQuestions = questions.length;
  const minRequired = Math.min(requiredCorrect, totalQuestions);
  const correctSoFar = answers.reduce<number>((a, ans, i) => a + (ans === questions[i]?.correctIndex ? 1 : 0), 0);
  const confirmed = selectedOption !== null;

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleSelect = (i: number) => {
    if (confirmed) return;
    setSelectedOption(i);
    const updated = [...answers];
    updated[currentQ] = i;
    setAnswers(updated);
    timer.current = setTimeout(() => {
      if (currentQ < totalQuestions - 1) {
        setCurrentQ((q) => q + 1);
        setSelectedOption(null);
      } else {
        const finalCorrect = updated.reduce<number>((a, ans, k) => a + (ans === questions[k].correctIndex ? 1 : 0), 0);
        setStage('result');
        onResult(finalCorrect >= minRequired, finalCorrect, totalQuestions);
      }
    }, 1400);
  };

  const handleRetry = () => {
    clearTimeout(timer.current);
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setStage('quiz');
  };

  if (totalQuestions === 0) {
    return (
      <div className="text-center py-8">
        <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Not enough details provided to generate verification questions.</p>
      </div>
    );
  }

  if (stage === 'intro') {
    return (
      <div className="text-center space-y-5 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <PackageCheck className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Let's get it back to you</h2>
        <p className="text-muted-foreground">
          {totalQuestions} quick questions, then your item is on its way home.
        </p>
        <Button onClick={() => setStage('quiz')} className="w-full">Let's go</Button>
      </div>
    );
  }

  if (stage === 'result') {
    const passed = correctSoFar >= minRequired;
    return (
      <div className="relative text-center space-y-4 overflow-hidden animate-scale-in">
        {passed && (
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className={`absolute top-0 w-2 h-3 rounded-sm animate-confetti-fall ${i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-foreground/60' : 'bg-muted-foreground/40'}`}
                style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 6) * 0.12}s` }}
              />
            ))}
          </div>
        )}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${passed ? 'bg-primary/10' : 'bg-muted'}`}>
          {passed ? <ShieldCheck className="w-10 h-10 text-primary" /> : <RotateCcw className="w-10 h-10 text-muted-foreground" />}
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {passed ? 'Your item is waiting for you' : 'It happens'}
        </h2>
        <p className="text-muted-foreground">
          {passed
            ? `${correctSoFar} of ${totalQuestions} correct — ownership confirmed.`
            : `${correctSoFar} of ${totalQuestions} correct. Details are sometimes remembered differently — give it another try.`}
        </p>
        <Badge variant={passed ? 'default' : 'secondary'} className="text-sm">
          {passed ? 'Match confirmed' : `Need ${minRequired} correct`}
        </Badge>
        {!passed && (
          <div className="space-y-2 pt-2">
            <Button onClick={handleRetry} className="w-full">Try again</Button>
            <p className="text-xs text-muted-foreground">Still stuck? Contact the venue's lost & found staff.</p>
          </div>
        )}
      </div>
    );
  }

  const q = questions[currentQ];
  const isCorrect = confirmed && selectedOption === q.correctIndex;
  const remainingNeeded = Math.max(0, minRequired - correctSoFar);
  const questionsLeft = totalQuestions - currentQ - 1;

  return (
    <div className="space-y-6">
      {/* Path to home */}
      <div className="flex items-center gap-2">
        {questions.map((_, i) => {
          const ans = answers[i];
          const done = ans !== undefined && ans !== null;
          const right = done && ans === questions[i].correctIndex;
          return (
            <React.Fragment key={i}>
              <div
                className={`w-3 h-3 rounded-full shrink-0 transition-all duration-500 ${
                  right ? 'bg-primary scale-125' : done ? 'bg-muted-foreground/40' : i === currentQ ? 'bg-foreground/30 ring-2 ring-primary/30' : 'bg-muted'
                }`}
              />
              <div className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${done ? 'bg-primary/60' : 'bg-muted'}`} />
            </React.Fragment>
          );
        })}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${correctSoFar >= minRequired ? 'bg-primary text-primary-foreground animate-pop' : 'bg-muted text-muted-foreground'}`}>
          <Home className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {currentQ + 1} of {totalQuestions}</span>
        <span className="font-medium text-foreground">{correctSoFar}/{minRequired} correct</span>
      </div>

      <h3 key={currentQ} className="text-lg font-semibold text-foreground animate-fade-in">{q.question}</h3>

      <div className="space-y-3">
        {q.options.map((option, i) => {
          let cls = 'border-border bg-background hover:border-primary/40 hover:bg-primary/5 cursor-pointer active:scale-[0.98]';
          if (confirmed) {
            if (i === q.correctIndex) cls = `border-primary bg-primary/10 ${isCorrect ? 'animate-pop' : ''}`;
            else if (i === selectedOption) cls = 'border-destructive bg-destructive/10 animate-shake';
            else cls = 'border-border bg-background opacity-40';
          }
          return (
            <Card key={`${currentQ}-${i}`} className={`p-4 transition-all duration-200 ${cls}`} onClick={() => handleSelect(i)}>
              <div className="flex items-center justify-between">
                <span className="text-foreground">{option}</span>
                {confirmed && i === q.correctIndex && <CheckCircle className="w-5 h-5 text-primary" />}
                {confirmed && i === selectedOption && i !== q.correctIndex && <XCircle className="w-5 h-5 text-destructive" />}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="min-h-[3rem] text-center">
        {confirmed && (
          <div className="animate-fade-in">
            {isCorrect ? (
              <p className="font-semibold text-foreground flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" /> Exactly!{' '}
                <span className="font-normal text-muted-foreground">
                  {correctSoFar >= minRequired ? "You're almost there." : 'One step closer to your item.'}
                </span>
              </p>
            ) : (
              <p className="text-muted-foreground">
                That's okay — {remainingNeeded <= questionsLeft ? `you can still make it (${remainingNeeded} more needed).` : 'keep going.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
