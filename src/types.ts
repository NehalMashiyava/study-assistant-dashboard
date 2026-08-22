export type NavView = 'dashboard' | 'summaries' | 'flashcards' | 'quizzes';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  major: string;
  dailyStreak: number;
  weeklyGoalHours: number;
  completedHoursThisWeek: number;
  xpPoints: number;
}

export interface DetailedBreakdownItem {
  conceptTitle: string;
  explanation: string;
  examples: string[];
}

export interface KeyVocabularyItem {
  term: string;
  definition: string;
}

export interface SummaryItem {
  id: string;
  title: string;
  subject: string;
  excerpt: string;
  fullContent?: string;
  tldr?: string;
  coreConcepts?: string[];
  detailedBreakdown?: DetailedBreakdownItem[];
  keyVocabulary?: KeyVocabularyItem[];
  bulletPoints: string[];
  readingTimeMinutes: number;
  createdAt: string;
  tags: string[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  mastered?: boolean;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  description: string;
  totalCards: number;
  masteredCards: number;
  lastStudied: string;
  color: string;
  cards: Flashcard[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizItem {
  id: string;
  title: string;
  subject: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'completed' | 'upcoming' | 'in_progress';
  score?: number;
  lastAttemptDate?: string;
  questions?: QuizQuestion[];
}

export interface StudyActivity {
  id: string;
  type: 'summary' | 'flashcards' | 'quiz';
  title: string;
  timeAgo: string;
  scoreOrDuration: string;
}
