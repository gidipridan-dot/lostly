import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, HelpCircle, ShieldCheck } from 'lucide-react';
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
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const totalQuestions = questions.length;
  const minRequired = Math.min(requiredCorrect, totalQuestions);

  const handleSelect = (optionIndex: number) => {
    if (confirmed) return;
    setSelectedOption(optionIndex);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    const updated = [...answers];
    updated[currentQ] = selectedOption;
    setAnswers(updated);
    setConfirmed(true);
  };

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setConfirmed(false);
    } else {
      setShowResult(true);
      const finalAnswers = [...answers];
      finalAnswers[currentQ] = selectedOption;
      const finalCorrect = finalAnswers.reduce<number>(
        (acc, ans, i) => acc + (ans === questions[i].correctIndex ? 1 : 0),
        0
      );
      onResult(finalCorrect >= minRequired, finalCorrect, totalQuestions);
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowResult(false);
    setSelectedOption(null);
    setConfirmed(false);
  };


  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Not enough details provided to generate verification questions.</p>
      </div>
    );
  }

  if (showResult) {
    const finalAnswers = [...answers];
    const correctCount = finalAnswers.reduce<number>(
      (acc, ans, i) => acc + (ans === questions[i].correctIndex ? 1 : 0),
      0
    );
    const passed = correctCount >= minRequired;

    return (
      <div className="text-center space-y-4">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
            passed ? 'bg-green-500/10' : 'bg-destructive/10'
          }`}
        >
          {passed ? (
            <ShieldCheck className="w-10 h-10 text-green-500" />
          ) : (
            <XCircle className="w-10 h-10 text-destructive" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {passed ? 'Ownership Verified!' : 'Verification Failed'}
        </h2>
        <p className="text-muted-foreground">
          You answered {correctCount} out of {totalQuestions} correctly.
          {!passed && ` At least ${minRequired} correct answers were required.`}
        </p>
        <Badge variant={passed ? 'default' : 'destructive'} className="text-sm">
          {passed ? 'Match Confirmed' : 'No Match'}
        </Badge>
        {!passed && (
          <Button onClick={handleRetry} variant="outline" className="w-full mt-2">
            Try again
          </Button>
        )}
      </div>
    );
  }


  const q = questions[currentQ];
  const isCorrect = confirmed && selectedOption === q.correctIndex;
  const isWrong = confirmed && selectedOption !== q.correctIndex;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {currentQ + 1} of {totalQuestions}</span>
        <span>Need {minRequired} correct</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentQ + (confirmed ? 1 : 0)) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-foreground">{q.question}</h3>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((option, i) => {
          let optionClass = 'border-border bg-background hover:border-primary/40 hover:bg-primary/5 cursor-pointer';
          if (selectedOption === i && !confirmed) {
            optionClass = 'border-primary bg-primary/10 cursor-pointer';
          }
          if (confirmed) {
            if (i === q.correctIndex) {
              optionClass = 'border-green-500 bg-green-500/10';
            } else if (i === selectedOption && i !== q.correctIndex) {
              optionClass = 'border-destructive bg-destructive/10';
            } else {
              optionClass = 'border-border bg-background opacity-50';
            }
          }

          return (
            <Card
              key={i}
              className={`p-4 transition-all duration-200 ${optionClass} ${confirmed ? 'cursor-default' : ''}`}
              onClick={() => handleSelect(i)}
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground">{option}</span>
                {confirmed && i === q.correctIndex && <CheckCircle className="w-5 h-5 text-green-500" />}
                {confirmed && i === selectedOption && i !== q.correctIndex && <XCircle className="w-5 h-5 text-destructive" />}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Action */}
      {!confirmed ? (
        <Button
          onClick={handleConfirm}
          disabled={selectedOption === null}
          className="w-full bg-primary text-primary-foreground"
        >
          Confirm Answer
        </Button>
      ) : (
        <Button onClick={handleNext} className="w-full bg-primary text-primary-foreground">
          {currentQ < totalQuestions - 1 ? 'Next Question' : 'See Results'}
        </Button>
      )}
    </div>
  );
};
