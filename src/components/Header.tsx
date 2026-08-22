import React from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  Sparkles,
  BookOpen,
  Layers,
  CheckSquare
} from 'lucide-react';
import { NavView, UserProfile } from '../types';

interface HeaderProps {
  currentView: NavView;
  onOpenMobileSidebar: () => void;
  user: UserProfile;
  onOpenProfile: () => void;
  onQuickAction: (action: 'summary' | 'deck' | 'quiz') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onOpenMobileSidebar,
  user,
  onOpenProfile,
  onQuickAction,
  searchQuery,
  onSearchChange,
}) => {
  const [isQuickMenuOpen, setIsQuickMenuOpen] = React.useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = React.useState(true);
  const [showNotificationToast, setShowNotificationToast] = React.useState(false);

  const getHeading = () => {
    switch (currentView) {
      case 'dashboard':
        return {
          title: 'Study Dashboard',
          subtitle: 'Track your learning velocity, review summaries, and practice decks',
        };
      case 'summaries':
        return {
          title: 'AI Study Summaries',
          subtitle: 'Distill lecture notes, research papers, and textbook chapters',
        };
      case 'flashcards':
        return {
          title: 'Flashcard Decks',
          subtitle: 'Active recall and spaced repetition practice cards',
        };
      case 'quizzes':
        return {
          title: 'Practice Quizzes',
          subtitle: 'Self-assessment assessments with instant explanations',
        };
      default:
        return { title: 'Study Assistant', subtitle: 'Elevate your learning' };
    }
  };

  const { title, subtitle } = getHeading();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 shrink-0 shadow-sm sticky top-0 z-20">
      {/* Left section: Hamburger button (mobile) + View title */}
      <div className="flex items-center gap-3">
        <button
          id="btn-open-mobile-nav"
          onClick={onOpenMobileSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div>
          <h2 id="view-title" className="text-lg font-semibold text-slate-900">
            {title}
          </h2>
        </div>
      </div>

      {/* Right section: Search bar, Quick Action CTA, Notifications, Profile button */}
      <div className="flex items-center gap-3">
        {/* Search input */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-56 lg:w-64 pl-9 pr-8 py-2 bg-slate-100 border-transparent rounded-full text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          )}
        </div>

        {/* Quick Action Dropdown */}
        <div className="relative">
          <button
            id="btn-quick-create-menu"
            onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
            className="flex h-9 items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 active:scale-98 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Item</span>
          </button>

          {/* Quick Create Dropdown Menu */}
          {isQuickMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsQuickMenuOpen(false)}
              />
              <div className="absolute right-0 top-11 z-40 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Create
                </div>
                <button
                  id="action-new-summary"
                  onClick={() => {
                    setIsQuickMenuOpen(false);
                    onQuickAction('summary');
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                    <BookOpen className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold">New Summary</p>
                    <p className="text-[10px] text-slate-400">Synthesize notes or text</p>
                  </div>
                </button>

                <button
                  id="action-new-deck"
                  onClick={() => {
                    setIsQuickMenuOpen(false);
                    onQuickAction('deck');
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <Layers className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold">New Flashcard Deck</p>
                    <p className="text-[10px] text-slate-400">Create revision cards</p>
                  </div>
                </button>

                <button
                  id="action-new-quiz"
                  onClick={() => {
                    setIsQuickMenuOpen(false);
                    onQuickAction('quiz');
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <CheckSquare className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold">New Practice Quiz</p>
                    <p className="text-[10px] text-slate-400">Test comprehension</p>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            id="btn-notifications"
            onClick={() => {
              setShowNotificationToast(!showNotificationToast);
              setHasUnreadNotification(false);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-500 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {hasUnreadNotification && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            )}
          </button>

          {showNotificationToast && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowNotificationToast(false)}
              />
              <div className="absolute right-0 top-11 z-40 w-72 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  <span className="text-[11px] text-indigo-600 font-medium">All caught up</span>
                </div>
                <div className="pt-2 space-y-2">
                  <div className="rounded-xl bg-indigo-50/70 p-2.5 text-xs text-indigo-950">
                    <p className="font-semibold">🔥 14-Day Streak reached!</p>
                    <p className="text-slate-600 text-[10px] mt-0.5">Keep up your daily study habit to earn the Master Learner badge.</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700">
                    <p className="font-semibold">📚 4 flashcards due for review</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">Organic Chemistry Reagents deck is ready for active recall.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Avatar Button */}
        <button
          id="btn-header-profile"
          onClick={onOpenProfile}
          className="flex items-center gap-2 rounded-full border border-slate-200 p-0.5 hover:ring-2 hover:ring-indigo-500/20 transition-all"
          title="View profile & study settings"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs border border-indigo-200">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
        </button>
      </div>
    </header>
  );
};
