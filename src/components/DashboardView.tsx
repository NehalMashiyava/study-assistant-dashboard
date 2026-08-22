import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  BookOpen, 
  Layers, 
  CheckSquare, 
  TrendingUp, 
  ArrowUpRight, 
  Award,
  ChevronRight,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';
import { UserProfile, SummaryItem, FlashcardDeck, QuizItem, StudyActivity, NavView } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  summaries: SummaryItem[];
  decks: FlashcardDeck[];
  quizzes: QuizItem[];
  activities: StudyActivity[];
  onNavigate: (view: NavView) => void;
  onOpenNewSummary: () => void;
  onOpenNewDeck: () => void;
  onOpenNewQuiz: () => void;
  onSelectSummary: (summary: SummaryItem) => void;
  onStudyDeck: (deck: FlashcardDeck) => void;
  onTakeQuiz: (quiz: QuizItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  summaries,
  decks,
  quizzes,
  activities,
  onNavigate,
  onOpenNewSummary,
  onOpenNewDeck,
  onOpenNewQuiz,
  onSelectSummary,
  onStudyDeck,
  onTakeQuiz,
}) => {
  // Calculations
  const totalCards = decks.reduce((acc, d) => acc + d.totalCards, 0);
  const totalMasteredCards = decks.reduce((acc, d) => acc + d.masteredCards, 0);
  const masteryPercentage = totalCards > 0 ? Math.round((totalMasteredCards / totalCards) * 100) : 0;

  const completedQuizzes = quizzes.filter(q => q.status === 'completed' && q.score !== undefined);
  const avgQuizScore = completedQuizzes.length > 0
    ? Math.round(completedQuizzes.reduce((acc, q) => acc + (q.score || 0), 0) / completedQuizzes.length)
    : 0;

  const weeklyProgressPercent = Math.min(100, Math.round((user.completedHoursThisWeek / user.weeklyGoalHours) * 100));

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayActivity = [
    { day: 'Mon', hours: 2.5, completed: true },
    { day: 'Tue', hours: 3.0, completed: true },
    { day: 'Wed', hours: 1.5, completed: true },
    { day: 'Thu', hours: 3.5, completed: true },
    { day: 'Fri', hours: 2.0, completed: true },
    { day: 'Sat', hours: 2.0, completed: true },
    { day: 'Sun', hours: 0.0, completed: false, isToday: true },
  ];

  return (
    <div id="view-dashboard" className="space-y-8 animate-in fade-in duration-200">
      {/* Key Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Study Hours Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-slate-300">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
            Study Hours
          </p>
          <p className="text-3xl font-bold text-slate-900">
            {user.completedHoursThisWeek}{' '}
            <span className="text-sm font-normal text-slate-400">
              / {user.weeklyGoalHours} hrs
            </span>
          </p>
          <div className="mt-3 flex items-center text-emerald-600 text-[10px] font-bold bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
            ↑ 14% vs last week
          </div>
        </div>

        {/* Mastered Flashcards Card */}
        <div 
          onClick={() => onNavigate('flashcards')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-indigo-300 cursor-pointer group"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
            Mastered Cards
          </p>
          <p className="text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {totalMasteredCards}{' '}
            <span className="text-sm font-normal text-slate-400">
              / {totalCards}
            </span>
          </p>
          <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${masteryPercentage}%` }}
            />
          </div>
        </div>

        {/* Quiz Accuracy Card */}
        <div 
          onClick={() => onNavigate('quizzes')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-indigo-300 cursor-pointer group"
        >
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
            Quiz Accuracy
          </p>
          <p className="text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {avgQuizScore}%
          </p>
          <div className="mt-3 flex items-center gap-1">
            <span className="text-xs text-indigo-600 font-medium">
              {avgQuizScore >= 80 ? 'Master Level' : 'Proficient'} • {completedQuizzes.length} tests
            </span>
          </div>
        </div>

        {/* Daily Streak Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
            Active Streak
          </p>
          <p className="text-3xl font-bold text-slate-900">
            {user.dailyStreak}{' '}
            <span className="text-sm font-normal text-slate-400">days</span>
          </p>
          <div className="mt-3 flex items-center text-amber-700 text-[10px] font-bold bg-amber-50 w-fit px-2 py-0.5 rounded-full">
            🔥 Top 5% consistency
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines & Study Schedule Container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Upcoming Deadlines</h3>
          <button 
            onClick={() => onNavigate('quizzes')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View Schedule
          </button>
        </div>
        <div className="p-0">
          <div className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
              <p className="text-sm font-medium text-slate-800">Psychology 101 Midterm Prep</p>
            </div>
            <p className="text-xs text-slate-400 font-medium">Tomorrow, 2:00 PM</p>
          </div>
          <div className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
              <p className="text-sm font-medium text-slate-800">Advanced Genetics Flashcards Review</p>
            </div>
            <p className="text-xs text-slate-400 font-medium">Thursday, 10:00 AM</p>
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
              <p className="text-sm font-medium text-slate-800">Spanish Vocab Quiz</p>
            </div>
            <p className="text-xs text-slate-400 font-medium">Friday, 4:30 PM</p>
          </div>
        </div>
      </div>

      {/* Quick Launch Hub */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900">Quick Actions</h3>
            <p className="text-xs text-slate-500">Start a new study session in one click</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            id="btn-quick-new-summary"
            onClick={onOpenNewSummary}
            className="group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-left transition-all hover:border-indigo-300 hover:bg-white hover:shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              📄
            </div>
            <div className="truncate">
              <p className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                Generate Summary
              </p>
              <p className="text-xs text-slate-500 truncate">Synthesize lecture text</p>
            </div>
          </button>

          <button
            id="btn-quick-new-deck"
            onClick={onOpenNewDeck}
            className="group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-left transition-all hover:border-indigo-300 hover:bg-white hover:shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              🗂️
            </div>
            <div className="truncate">
              <p className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                Create Flashcards
              </p>
              <p className="text-xs text-slate-500 truncate">Build recall decks</p>
            </div>
          </button>

          <button
            id="btn-quick-new-quiz"
            onClick={onOpenNewQuiz}
            className="group flex items-center gap-3.5 rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-left transition-all hover:border-indigo-300 hover:bg-white hover:shadow-xs"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              📝
            </div>
            <div className="truncate">
              <p className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                Start Practice Quiz
              </p>
              <p className="text-xs text-slate-500 truncate">Test comprehension</p>
            </div>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Study Velocity & Active Decks Preview */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left 2 Cols: Velocity Visualizer & Active Decks */}
        <div className="space-y-6 lg:col-span-2">
          {/* Study Velocity Graph */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-900">Study Velocity</h3>
                <p className="text-xs text-slate-500">Daily focus hours completed this week</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {user.completedHoursThisWeek} hrs total
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {dayActivity.map((d) => {
                const heightPercent = Math.min(100, (d.hours / 4) * 100);
                return (
                  <div key={d.day} className="flex flex-col items-center gap-2">
                    <div className="relative flex h-28 w-full flex-col justify-end rounded-xl bg-slate-50 p-1.5 border border-slate-100">
                      <div
                        className={`w-full rounded-lg transition-all duration-500 ${
                          d.isToday
                            ? 'bg-indigo-600'
                            : d.completed
                            ? 'bg-indigo-400'
                            : 'bg-slate-200'
                        }`}
                        style={{ height: `${Math.max(10, heightPercent)}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <span className={`text-xs font-medium ${d.isToday ? 'font-bold text-indigo-600' : 'text-slate-500'}`}>
                        {d.day}
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        {d.hours > 0 ? `${d.hours}h` : '-'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Study Decks Preview */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Active Flashcard Decks</h3>
                <p className="text-xs text-slate-500">Ready for spaced repetition review</p>
              </div>
              <button
                onClick={() => onNavigate('flashcards')}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all ({decks.length})
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {decks.slice(0, 3).map((deck) => {
                const mastery = Math.round((deck.masteredCards / deck.totalCards) * 100);
                const initials = deck.subject
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={deck.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">
                        {initials}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-900">{deck.title}</h4>
                        <p className="text-xs text-slate-400">{deck.totalCards} Cards • {deck.lastStudied}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-28 text-right">
                        <div className="text-xs font-semibold text-slate-700">
                          {mastery}% Mastered
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: `${mastery}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => onStudyDeck(deck)}
                        className="rounded-lg bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-xs"
                      >
                        Study
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Recent Activities & Recommendation */}
        <div className="space-y-6">
          {/* Recent Activity Timeline */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-1">Recent Activity</h3>
            <p className="text-xs text-slate-500 mb-4">Your latest study accomplishments</p>

            <div className="space-y-4">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 text-xs">
                    {act.type === 'summary' && '📄'}
                    {act.type === 'flashcards' && '🗂️'}
                    {act.type === 'quiz' && '📝'}
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {act.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>{act.timeAgo}</span>
                      <span>•</span>
                      <span className="text-slate-600 font-medium">{act.scoreOrDuration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Study Topic */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <BrainCircuit className="h-4 w-4" />
              <span>Smart Recommendation</span>
            </div>
            <h4 className="mt-2 text-sm font-bold text-slate-900">
              Review: Synaptic Plasticity & LTP
            </h4>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Based on your flashcard recall curve, 4 terms in Neuroscience require reinforcement today to lock in long-term memory.
            </p>
            <button
              onClick={() => {
                const summary = summaries.find(s => s.id === 'sum-1');
                if (summary) onSelectSummary(summary);
                else onNavigate('summaries');
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-indigo-100 shadow-md transition-all active:scale-95"
            >
              <span>Read Key Takeaways</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
