import React, { useState } from 'react';
import { NavView, SummaryItem, FlashcardDeck, QuizItem, UserProfile, StudyActivity } from './types';
import { 
  initialUserProfile, 
  initialSummaries, 
  initialDecks, 
  initialQuizzes, 
  initialRecentActivities 
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { SummariesView } from './components/SummariesView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizzesView } from './components/QuizzesView';
import { SummaryDetailModal } from './components/SummaryDetailModal';
import { FlashcardStudyModal } from './components/FlashcardStudyModal';
import { QuizRunnerModal } from './components/QuizRunnerModal';
import { UserProfileModal } from './components/UserProfileModal';

export default function App() {
  // Navigation View
  const [currentView, setCurrentView] = useState<NavView>('dashboard');

  // Sidebar Layout State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // App Data State
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [summaries, setSummaries] = useState<SummaryItem[]>(initialSummaries);
  const [decks, setDecks] = useState<FlashcardDeck[]>(initialDecks);
  const [quizzes, setQuizzes] = useState<QuizItem[]>(initialQuizzes);
  const [activities, setActivities] = useState<StudyActivity[]>(initialRecentActivities);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Active Action Overlays
  const [isGenerateSummaryModalOpen, setIsGenerateSummaryModalOpen] = useState(false);
  const [isCreateDeckModalOpen, setIsCreateDeckModalOpen] = useState(false);
  const [isCreateQuizModalOpen, setIsCreateQuizModalOpen] = useState(false);
  const [selectedSummaryForDetail, setSelectedSummaryForDetail] = useState<SummaryItem | null>(null);
  const [selectedDeckForStudy, setSelectedDeckForStudy] = useState<FlashcardDeck | null>(null);
  const [selectedQuizForRun, setSelectedQuizForRun] = useState<QuizItem | null>(null);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);

  // Navigation Handler
  const handleNavigate = (view: NavView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Summaries Handlers
  const handleAddSummary = (newSummary: SummaryItem) => {
    setSummaries((prev) => [newSummary, ...prev]);
    // Log activity
    const newAct: StudyActivity = {
      id: `act-${Date.now()}`,
      type: 'summary',
      title: `${newSummary.title} generated`,
      timeAgo: 'Just now',
      scoreOrDuration: `${newSummary.readingTimeMinutes} min read`,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleDeleteSummary = (id: string) => {
    setSummaries((prev) => prev.filter((s) => s.id !== id));
  };

  // Flashcards Handlers
  const handleAddDeck = (newDeck: FlashcardDeck) => {
    setDecks((prev) => [newDeck, ...prev]);
    const newAct: StudyActivity = {
      id: `act-${Date.now()}`,
      type: 'flashcards',
      title: `Created deck: ${newDeck.title}`,
      timeAgo: 'Just now',
      scoreOrDuration: `${newDeck.totalCards} cards`,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleDeleteDeck = (id: string) => {
    setDecks((prev) => prev.filter((d) => d.id !== id));
  };

  const handleUpdateDeckCards = (deckId: string, updatedCards: any[]) => {
    setDecks((prev) =>
      prev.map((d) => {
        if (d.id === deckId) {
          const masteredCount = updatedCards.filter((c) => c.mastered).length;
          return {
            ...d,
            cards: updatedCards,
            totalCards: updatedCards.length,
            masteredCards: masteredCount,
            lastStudied: 'Just now',
          };
        }
        return d;
      })
    );
    // Add activity and bump XP
    setUser((prev) => ({
      ...prev,
      xpPoints: prev.xpPoints + 50,
      completedHoursThisWeek: Math.round((prev.completedHoursThisWeek + 0.3) * 10) / 10,
    }));

    const targetDeck = decks.find((d) => d.id === deckId);
    if (targetDeck) {
      const newAct: StudyActivity = {
        id: `act-${Date.now()}`,
        type: 'flashcards',
        title: `${targetDeck.title} practiced`,
        timeAgo: 'Just now',
        scoreOrDuration: `${updatedCards.length} cards reviewed`,
      };
      setActivities((prev) => [newAct, ...prev]);
    }
  };

  // Quizzes Handlers
  const handleAddQuiz = (newQuiz: QuizItem) => {
    setQuizzes((prev) => [newQuiz, ...prev]);
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  const handleQuizCompleted = (quizId: string, finalScore: number) => {
    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === quizId) {
          return {
            ...q,
            status: 'completed',
            score: finalScore,
            lastAttemptDate: 'Just now',
          };
        }
        return q;
      })
    );
    // Award XP
    setUser((prev) => ({
      ...prev,
      xpPoints: prev.xpPoints + 100,
      completedHoursThisWeek: Math.round((prev.completedHoursThisWeek + 0.5) * 10) / 10,
    }));

    const targetQuiz = quizzes.find((q) => q.id === quizId);
    if (targetQuiz) {
      const newAct: StudyActivity = {
        id: `act-${Date.now()}`,
        type: 'quiz',
        title: `${targetQuiz.title}`,
        timeAgo: 'Just now',
        scoreOrDuration: `Scored ${finalScore}%`,
      };
      setActivities((prev) => [newAct, ...prev]);
    }
  };

  // Quick Action Menu Trigger
  const handleQuickAction = (action: 'summary' | 'deck' | 'quiz') => {
    if (action === 'summary') {
      setCurrentView('summaries');
      setIsGenerateSummaryModalOpen(true);
    } else if (action === 'deck') {
      setCurrentView('flashcards');
      setIsCreateDeckModalOpen(true);
    } else if (action === 'quiz') {
      setCurrentView('quizzes');
      setIsCreateQuizModalOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased font-sans selection:bg-indigo-500 selection:text-white">
      {/* Fixed / Collapsible Sidebar with navigation & user profile */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        user={user}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenProfile={() => setIsUserProfileModalOpen(true)}
        summaryCount={summaries.length}
        deckCount={decks.length}
        quizCount={quizzes.length}
      />

      {/* Main Layout Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Sticky Header with breadcrumbs, search, quick actions, profile */}
        <Header
          currentView={currentView}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          user={user}
          onOpenProfile={() => setIsUserProfileModalOpen(true)}
          onQuickAction={handleQuickAction}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dynamic Content Body based on active navigation */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              user={user}
              summaries={summaries}
              decks={decks}
              quizzes={quizzes}
              activities={activities}
              onNavigate={handleNavigate}
              onOpenNewSummary={() => {
                setCurrentView('summaries');
                setIsGenerateSummaryModalOpen(true);
              }}
              onOpenNewDeck={() => {
                setCurrentView('flashcards');
                setIsCreateDeckModalOpen(true);
              }}
              onOpenNewQuiz={() => {
                setCurrentView('quizzes');
                setIsCreateQuizModalOpen(true);
              }}
              onSelectSummary={(sum) => setSelectedSummaryForDetail(sum)}
              onStudyDeck={(deck) => setSelectedDeckForStudy(deck)}
              onTakeQuiz={(quiz) => setSelectedQuizForRun(quiz)}
            />
          )}

          {currentView === 'summaries' && (
            <SummariesView
              summaries={summaries}
              onAddSummary={handleAddSummary}
              onDeleteSummary={handleDeleteSummary}
              onSelectSummary={(sum) => setSelectedSummaryForDetail(sum)}
              isGenerateModalOpen={isGenerateSummaryModalOpen}
              setIsGenerateModalOpen={setIsGenerateSummaryModalOpen}
            />
          )}

          {currentView === 'flashcards' && (
            <FlashcardsView
              decks={decks}
              onAddDeck={handleAddDeck}
              onDeleteDeck={handleDeleteDeck}
              onUpdateDeckCards={handleUpdateDeckCards}
              onStudyDeck={(deck) => setSelectedDeckForStudy(deck)}
              isCreateDeckModalOpen={isCreateDeckModalOpen}
              setIsCreateDeckModalOpen={setIsCreateDeckModalOpen}
            />
          )}

          {currentView === 'quizzes' && (
            <QuizzesView
              quizzes={quizzes}
              onAddQuiz={handleAddQuiz}
              onDeleteQuiz={handleDeleteQuiz}
              onTakeQuiz={(quiz) => setSelectedQuizForRun(quiz)}
              isCreateQuizModalOpen={isCreateQuizModalOpen}
              setIsCreateQuizModalOpen={setIsCreateQuizModalOpen}
            />
          )}
        </main>
      </div>

      {/* Detail & Action Modals */}
      {/* 1. Summary Full Detail Modal */}
      <SummaryDetailModal
        summary={selectedSummaryForDetail}
        onClose={() => setSelectedSummaryForDetail(null)}
      />

      {/* 2. Flashcard Recall Study Player Modal */}
      <FlashcardStudyModal
        deck={selectedDeckForStudy}
        onClose={() => setSelectedDeckForStudy(null)}
        onDeckCompleted={handleUpdateDeckCards}
      />

      {/* 3. Quiz Assessment Runner Modal */}
      <QuizRunnerModal
        quiz={selectedQuizForRun}
        onClose={() => setSelectedQuizForRun(null)}
        onQuizCompleted={handleQuizCompleted}
      />

      {/* 4. User Profile Settings Modal */}
      <UserProfileModal
        isOpen={isUserProfileModalOpen}
        onClose={() => setIsUserProfileModalOpen(false)}
        user={user}
        onUpdateGoal={(hours) =>
          setUser((prev) => ({ ...prev, weeklyGoalHours: hours }))
        }
      />
    </div>
  );
}
