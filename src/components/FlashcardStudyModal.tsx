import React, { useState } from 'react';
import { 
  X, 
  RotateCw, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Award,
  Layers
} from 'lucide-react';
import { FlashcardDeck, Flashcard } from '../types';

interface FlashcardStudyModalProps {
  deck: FlashcardDeck | null;
  onClose: () => void;
  onDeckCompleted: (deckId: string, updatedCards: Flashcard[]) => void;
}

export const FlashcardStudyModal: React.FC<FlashcardStudyModalProps> = ({
  deck,
  onClose,
  onDeckCompleted,
}) => {
  if (!deck) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsState, setCardsState] = useState<Flashcard[]>(deck.cards);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = cardsState[currentIndex] || cardsState[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMarkMastered = (mastered: boolean) => {
    const updated = [...cardsState];
    updated[currentIndex] = { ...currentCard, mastered };
    setCardsState(updated);

    if (currentIndex + 1 < cardsState.length) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      onDeckCompleted(deck.id, updated);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
  };

  const masteredCount = cardsState.filter((c) => c.mastered).length;
  const progressPercent = Math.round(((currentIndex + 1) / cardsState.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
              {deck.subject}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {deck.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isFinished ? (
          <div className="mt-6 space-y-6">
            {/* Progress Bar & Counter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>
                  Card {currentIndex + 1} of {cardsState.length}
                </span>
                <span>{progressPercent}% Completed</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Flashcard Flip Stage */}
            <div
              id="active-flashcard"
              onClick={handleFlip}
              className="group relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-slate-200/80 bg-gradient-to-b from-white to-slate-50/70 p-8 text-center shadow-md transition-all hover:border-indigo-300 hover:shadow-lg active:scale-[0.99]"
            >
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600">
                <RotateCw className="h-3.5 w-3.5" />
                <span>Click or tap to flip</span>
              </div>

              <div className="absolute top-4 left-4">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    isFlipped
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {isFlipped ? 'Answer' : 'Prompt'}
                </span>
              </div>

              <div className="my-auto max-w-md">
                <p
                  className={`font-semibold text-slate-900 transition-all duration-200 ${
                    isFlipped ? 'text-base sm:text-lg text-slate-800' : 'text-lg sm:text-xl'
                  }`}
                >
                  {isFlipped ? currentCard.back : currentCard.front}
                </p>
              </div>

              <p className="mt-4 text-[11px] text-slate-400">
                {isFlipped ? 'Answer revealed. Rate your recall below.' : 'Think about the answer, then flip.'}
              </p>
            </div>

            {/* Rating Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                id="btn-card-still-learning"
                onClick={() => handleMarkMastered(false)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/60 py-3.5 text-xs font-bold text-amber-900 hover:bg-amber-100 active:scale-98 transition-all"
              >
                <HelpCircle className="h-4 w-4 text-amber-600" />
                <span>Still Learning</span>
              </button>

              <button
                id="btn-card-mastered"
                onClick={() => handleMarkMastered(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-98 transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Mastered</span>
              </button>
            </div>
          </div>
        ) : (
          /* Deck Finished Screen */
          <div className="mt-6 space-y-6 text-center py-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-md">
              <Award className="h-10 w-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">
                Session Complete!
              </h3>
              <p className="text-xs text-slate-500">
                You just reviewed all {cardsState.length} cards in{' '}
                <strong className="text-slate-700">{deck.title}</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-around">
                <div>
                  <span className="text-2xl font-black text-emerald-600">
                    {masteredCount}
                  </span>
                  <span className="block text-[11px] font-semibold text-slate-500 uppercase">
                    Mastered
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="text-2xl font-black text-amber-600">
                    {cardsState.length - masteredCount}
                  </span>
                  <span className="block text-[11px] font-semibold text-slate-500 uppercase">
                    Needs Review
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Practice Again
              </button>
              <button
                onClick={onClose}
                className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
