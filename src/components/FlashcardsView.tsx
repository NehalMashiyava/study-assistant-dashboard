import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Search, 
  Play, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Sparkles, 
  X,
  RotateCw,
  BookOpen,
  Check,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { FlashcardDeck, Flashcard } from '../types';

interface FlashcardsViewProps {
  decks: FlashcardDeck[];
  onAddDeck: (deck: FlashcardDeck) => void;
  onDeleteDeck: (id: string) => void;
  onUpdateDeckCards: (deckId: string, updatedCards: Flashcard[]) => void;
  onStudyDeck: (deck: FlashcardDeck) => void;
  isCreateDeckModalOpen: boolean;
  setIsCreateDeckModalOpen: (open: boolean) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  decks,
  onAddDeck,
  onDeleteDeck,
  onUpdateDeckCards,
  onStudyDeck,
  isCreateDeckModalOpen,
  setIsCreateDeckModalOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  // Form State for "Create Deck"
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [description, setDescription] = useState('');
  const [colorTheme, setColorTheme] = useState('from-indigo-600 to-blue-700');
  const [initialCards, setInitialCards] = useState<{ front: string; back: string }[]>([
    { front: '', back: '' },
    { front: '', back: '' },
  ]);

  const subjects = ['All', ...Array.from(new Set(decks.map((d) => d.subject)))];

  const filteredDecks = decks.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || d.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleAddCardRow = () => {
    setInitialCards([...initialCards, { front: '', back: '' }]);
  };

  const handleRemoveCardRow = (index: number) => {
    if (initialCards.length <= 1) return;
    setInitialCards(initialCards.filter((_, i) => i !== index));
  };

  const handleCardChange = (index: number, field: 'front' | 'back', val: string) => {
    const next = [...initialCards];
    next[index][field] = val;
    setInitialCards(next);
  };

  const handleCreateDeckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const validCards = initialCards.filter((c) => c.front.trim() && c.back.trim());
    const createdCards: Flashcard[] = (validCards.length > 0
      ? validCards
      : [
          {
            front: `Core definition of ${title}`,
            back: `Detailed explanation and critical components for ${title}.`,
          },
          {
            front: `Key theorem / formula for ${subject}`,
            back: `Essential relationship formula used for exam problem solving.`,
          },
        ]
    ).map((c, i) => ({
      id: `c-${Date.now()}-${i}`,
      front: c.front,
      back: c.back,
      mastered: false,
    }));

    const newDeck: FlashcardDeck = {
      id: `deck-${Date.now()}`,
      title: title.trim(),
      subject,
      description: description.trim() || `Comprehensive study deck for ${title}.`,
      totalCards: createdCards.length,
      masteredCards: 0,
      lastStudied: 'Just created',
      color: colorTheme,
      cards: createdCards,
    };

    onAddDeck(newDeck);
    setIsCreateDeckModalOpen(false);
    // Reset
    setTitle('');
    setDescription('');
    setInitialCards([
      { front: '', back: '' },
      { front: '', back: '' },
    ]);
  };

  return (
    <div id="view-flashcards" className="space-y-6 animate-in fade-in duration-200">
      {/* View Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Flashcard Decks
          </h2>
          <p className="text-sm text-slate-500">
            Active recall and spaced repetition practice cards.
          </p>
        </div>

        <button
          id="btn-open-create-deck"
          onClick={() => setIsCreateDeckModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-indigo-100 shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Create Deck</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="search-decks-input"
            type="text"
            placeholder="Search decks by title, subject, or concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubject === sub
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Decks Grid */}
      {filteredDecks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDecks.map((deck) => {
            const masteryPercent =
              deck.totalCards > 0
                ? Math.round((deck.masteredCards / deck.totalCards) * 100)
                : 0;

            const initials = deck.subject
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={deck.id}
                id={`deck-card-${deck.id}`}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all group shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm">
                      {initials}
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {deck.lastStudied}
                    </span>
                  </div>

                  <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 mb-1.5">
                    {deck.subject}
                  </span>

                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-base mb-1">
                    {deck.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {deck.description}
                  </p>
                </div>

                <div>
                  {/* Progress & Mastery */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-500">
                        {deck.totalCards} Flashcards
                      </span>
                      <span className="font-bold text-indigo-600">
                        {masteryPercent}% Mastered
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 transition-all duration-500"
                        style={{ width: `${masteryPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onDeleteDeck(deck.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      title="Delete deck"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <button
                      id={`btn-study-deck-${deck.id}`}
                      onClick={() => onStudyDeck(deck)}
                      className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Study Deck</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/70 p-12 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-xs mb-4">
            <Layers className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {searchQuery || selectedSubject !== 'All'
              ? 'No matching flashcard decks found'
              : 'No flashcard decks yet'}
          </h3>
          <p className="mt-1 max-w-sm text-xs text-slate-500 leading-relaxed">
            Create custom decks with question-and-answer pairs to practice spaced repetition and test active recall.
          </p>

          <button
            id="btn-empty-create-deck"
            onClick={() => {
              setSearchQuery('');
              setSelectedSubject('All');
              setIsCreateDeckModalOpen(true);
            }}
            className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-indigo-100 shadow-lg hover:bg-indigo-700 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Create First Deck</span>
          </button>
        </div>
      )}

      {/* Create Deck Modal */}
      {isCreateDeckModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCreateDeckModalOpen(false)}
          />

          <div className="relative z-10 my-8 w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-7 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Create Flashcard Deck
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add title, subject, and initial question-answer pairs
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateDeckModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDeckSubmit} className="mt-5 space-y-4 flex-1 overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Deck Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Organic Chemistry Reactions"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Neuroscience">Neuroscience</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Languages">Languages</option>
                    <option value="Biology">Biology</option>
                    <option value="Economics">Economics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Accent Color
                  </label>
                  <select
                    value={colorTheme}
                    onChange={(e) => setColorTheme(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="from-indigo-600 to-blue-700">Indigo / Blue</option>
                    <option value="from-amber-500 to-orange-600">Amber / Orange</option>
                    <option value="from-emerald-500 to-teal-600">Emerald / Teal</option>
                    <option value="from-rose-500 to-pink-600">Rose / Pink</option>
                    <option value="from-purple-600 to-violet-700">Purple / Violet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Key concepts, exam dates, or chapters..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Card Question/Answer Pairs */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Flashcards ({initialCards.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCardRow}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Another Card</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {initialCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>Card #{idx + 1}</span>
                        {initialCards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCardRow(idx)}
                            className="text-slate-400 hover:text-rose-500 text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Front (Prompt / Term / Question)..."
                        value={card.front}
                        onChange={(e) => handleCardChange(idx, 'front', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                      <textarea
                        rows={2}
                        placeholder="Back (Answer / Definition / Formula)..."
                        value={card.back}
                        onChange={(e) => handleCardChange(idx, 'back', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCreateDeckModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title.trim()}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50 transition-all"
                >
                  <Check className="h-4 w-4" />
                  <span>Save Deck</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
