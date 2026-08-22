import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Play, 
  Award, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  X, 
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { QuizItem, QuizQuestion } from '../types';

interface QuizzesViewProps {
  quizzes: QuizItem[];
  onAddQuiz: (quiz: QuizItem) => void;
  onDeleteQuiz: (id: string) => void;
  onTakeQuiz: (quiz: QuizItem) => void;
  isCreateQuizModalOpen: boolean;
  setIsCreateQuizModalOpen: (open: boolean) => void;
}

export const QuizzesView: React.FC<QuizzesViewProps> = ({
  quizzes,
  onAddQuiz,
  onDeleteQuiz,
  onTakeQuiz,
  isCreateQuizModalOpen,
  setIsCreateQuizModalOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'upcoming'>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');

  // Form State for "Start New Quiz"
  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState('Neuroscience');
  const [formDifficulty, setFormDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [formQuestionsCount, setFormQuestionsCount] = useState(10);
  const [formDuration, setFormDuration] = useState(15);

  const subjects = ['All', ...Array.from(new Set(quizzes.map((q) => q.subject)))];

  const filteredQuizzes = quizzes.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ? true : q.status === statusFilter;
    const matchesSubject =
      subjectFilter === 'All' ? true : q.subject === subjectFilter;
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const handleCreateQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    // Generate sample questions for the quiz
    const generatedQuestions: QuizQuestion[] = [
      {
        id: `q-${Date.now()}-1`,
        question: `What is the fundamental principle underpinning ${formTitle}?`,
        options: [
          `Dynamic equilibrium and catalytic acceleration`,
          `Systemic homeostatic feedback loops`,
          `Non-linear gradient descent optimization`,
          `Stochastic probabilistic distribution`
        ],
        correctAnswer: 0,
        explanation: `In standard literature for ${formSubject}, dynamic equilibrium and reaction catalysis represent the primary mechanisms.`
      },
      {
        id: `q-${Date.now()}-2`,
        question: `Which factor directly modulates efficiency during ${formSubject} testing?`,
        options: [
          `Concentration gradient and activation thresholds`,
          `Ambient room temperature variance`,
          `Arbitrary constant scaling`,
          `Single-point mutation rate`
        ],
        correctAnswer: 0,
        explanation: `Threshold parameters and concentration kinetics govern system throughput.`
      },
      {
        id: `q-${Date.now()}-3`,
        question: `What is the recommended diagnostic approach when anomalies appear?`,
        options: [
          `Empirical control testing and residual analysis`,
          `Immediate system termination`,
          `Ignoring non-significant variance`,
          `Inverting standard error margins`
        ],
        correctAnswer: 0,
        explanation: `Control benchmarking verifies baseline calibration.`
      }
    ];

    const newQuiz: QuizItem = {
      id: `quiz-${Date.now()}`,
      title: formTitle.trim(),
      subject: formSubject,
      difficulty: formDifficulty,
      questionsCount: formQuestionsCount,
      durationMinutes: formDuration,
      status: 'upcoming',
      questions: generatedQuestions
    };

    onAddQuiz(newQuiz);
    setIsCreateQuizModalOpen(false);
    // Reset form
    setFormTitle('');
  };

  return (
    <div id="view-quizzes" className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Practice Quizzes
          </h2>
          <p className="text-sm text-slate-500">
            Self-assessment evaluations with instant score tracking and answer explanations.
          </p>
        </div>

        <button
          id="btn-open-new-quiz"
          onClick={() => setIsCreateQuizModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-indigo-100 shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Start New Quiz</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="search-quizzes-input"
            type="text"
            placeholder="Search quizzes by title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
          {(['all', 'upcoming', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                statusFilter === tab
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredQuizzes.map((quiz) => {
            const isCompleted = quiz.status === 'completed' && quiz.score !== undefined;

            return (
              <div
                key={quiz.id}
                id={`quiz-card-${quiz.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300"
              >
                <div className="space-y-3">
                  {/* Subject and Difficulty Tags */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
                        {quiz.subject}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                          quiz.difficulty === 'Beginner'
                            ? 'bg-emerald-50 text-emerald-700'
                            : quiz.difficulty === 'Intermediate'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {quiz.difficulty}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                        <Award className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Score: {quiz.score}%</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        Ready
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {quiz.title}
                  </h3>

                  {/* Info details */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1">
                      <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                      <span>{quiz.questionsCount} Questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{quiz.durationMinutes} mins</span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {quiz.lastAttemptDate
                      ? `Last taken: ${quiz.lastAttemptDate}`
                      : 'Not attempted yet'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDeleteQuiz(quiz.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      title="Delete quiz"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <button
                      id={`btn-take-quiz-${quiz.id}`}
                      onClick={() => onTakeQuiz(quiz)}
                      className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                        isCompleted
                          ? 'bg-slate-100 text-slate-800 hover:bg-indigo-50 hover:text-indigo-700'
                          : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-95'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Retake Quiz</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 fill-white" />
                          <span>Start Quiz</span>
                        </>
                      )}
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
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-xs mb-4">
            <CheckSquare className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {searchQuery || statusFilter !== 'all'
              ? 'No matching quizzes found'
              : 'No quizzes configured yet'}
          </h3>
          <p className="mt-1 max-w-sm text-xs text-slate-500 leading-relaxed">
            Create custom practice quizzes with multiple-choice questions to test your knowledge retention before exam day.
          </p>

          <button
            id="btn-empty-start-quiz"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setIsCreateQuizModalOpen(true);
            }}
            className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-indigo-100 shadow-lg hover:bg-indigo-700 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Create First Quiz</span>
          </button>
        </div>
      )}

      {/* Start New Quiz Modal */}
      {isCreateQuizModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCreateQuizModalOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                  <CheckSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Configure Practice Quiz
                  </h3>
                  <p className="text-xs text-slate-500">
                    Generate an assessment to test concept mastery
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateQuizModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuizSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Quiz Title / Focus Topic <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Cellular Respiration & ATP Synthase"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subject
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="Neuroscience">Neuroscience</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Economics">Economics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Cell Biology">Cell Biology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e: any) => setFormDifficulty(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Questions Count
                  </label>
                  <select
                    value={formQuestionsCount}
                    onChange={(e) => setFormQuestionsCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value={5}>5 Questions (Quick Check)</option>
                    <option value={10}>10 Questions (Standard)</option>
                    <option value={15}>15 Questions (Midterm)</option>
                    <option value={25}>25 Questions (Final Exam)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Timer (Minutes)
                  </label>
                  <select
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value={10}>10 Minutes</option>
                    <option value={15}>15 Minutes</option>
                    <option value={20}>20 Minutes</option>
                    <option value={30}>30 Minutes</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateQuizModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formTitle.trim()}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50 transition-all"
                >
                  <CheckSquare className="h-4 w-4" />
                  <span>Create Quiz</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
