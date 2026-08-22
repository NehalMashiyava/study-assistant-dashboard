import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  Check
} from 'lucide-react';
import { QuizItem, QuizQuestion } from '../types';

interface QuizRunnerModalProps {
  quiz: QuizItem | null;
  onClose: () => void;
  onQuizCompleted: (quizId: string, finalScore: number) => void;
}

export const QuizRunnerModal: React.FC<QuizRunnerModalProps> = ({
  quiz,
  onClose,
  onQuizCompleted,
}) => {
  if (!quiz) return null;

  const defaultQuestions: QuizQuestion[] = [
    {
      id: 'qd-1',
      question: `What is the primary conceptual principle in ${quiz.title}?`,
      options: [
        'Dynamic homeostatic regulation and feedback loops',
        'Stochastic variance under high dimensional projection',
        'Complete absence of enzymatic catalysts',
        'Inverted thermodynamic gradient equilibrium'
      ],
      correctAnswer: 0,
      explanation: 'Homeostatic regulation ensures baseline stability across biological and mathematical dynamic systems.'
    },
    {
      id: 'qd-2',
      question: `How does system efficiency scale under standard conditions?`,
      options: [
        'Linear decay with exponential variance',
        'Logarithmic threshold activation response',
        'Random unpredictable distribution',
        'Constant zero derivative function'
      ],
      correctAnswer: 1,
      explanation: 'Threshold responses exhibit standard logarithmic growth up to saturation capacity.'
    },
    {
      id: 'qd-3',
      question: `Which methodology is considered best-practice for experimental validation?`,
      options: [
        'Empirical control testing with blind cross-validation',
        'Single-sample hypothesis assertion',
        'Speculative deductive assumptions',
        'Uncalibrated observational estimates'
      ],
      correctAnswer: 0,
      explanation: 'Double-blind cross validation eliminates experimenter bias and confirms reliability.'
    }
  ];

  const questions: QuizQuestion[] =
    quiz.questions && quiz.questions.length > 0 ? quiz.questions : defaultQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(quiz.durationMinutes * 60);

  // Timer countdown
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const currentQuestion = questions[currentIndex];

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    const total = questions.length;
    // Calculate final score
    const finalScore = Math.round(
      ((selectedOption === currentQuestion?.correctAnswer && !isAnswerSubmitted
        ? correctAnswersCount + 1
        : correctAnswersCount) /
        total) *
        100
    );
    setIsCompleted(true);
    onQuizCompleted(quiz.id, finalScore);
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setIsCompleted(false);
    setSecondsRemaining(quiz.durationMinutes * 60);
  };

  const finalScorePercent = Math.round((correctAnswersCount / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
              {quiz.subject}
            </span>
            <span className="text-xs font-bold text-slate-800 truncate max-w-xs sm:max-w-sm">
              {quiz.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!isCompleted && (
              <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                <Clock className="h-3.5 w-3.5 text-indigo-600" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {!isCompleted ? (
          <div className="mt-5 flex-1 flex flex-col justify-between overflow-y-auto pr-1 space-y-6">
            {/* Progress Stepper */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span>
                  {Math.round(((currentIndex + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctAnswer;

                let optionStyle =
                  'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-800';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle =
                      'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    optionStyle =
                      'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
                  } else {
                    optionStyle = 'border-slate-200 bg-slate-50 opacity-60 text-slate-600';
                  }
                } else if (isSelected) {
                  optionStyle =
                    'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-600/30 font-medium';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm transition-all ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box on submit */}
            {isAnswerSubmitted && (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-xs text-slate-700 space-y-1 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 font-bold text-indigo-900 uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Explanation</span>
                </div>
                <p className="leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
              {!isAnswerSubmitted ? (
                <button
                  id="btn-submit-quiz-answer"
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50 transition-all"
                >
                  <Check className="h-4 w-4" />
                  <span>Check Answer</span>
                </button>
              ) : (
                <button
                  id="btn-next-quiz-question"
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
                >
                  <span>
                    {currentIndex + 1 < questions.length
                      ? 'Next Question'
                      : 'View Results'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results Score Card */
          <div className="mt-6 flex-1 flex flex-col justify-center text-center py-6 space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-md">
              <Award className="h-10 w-10" />
            </div>

            <div className="space-y-1">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                Quiz Completed
              </span>
              <h3 className="text-2xl font-bold text-slate-900 pt-2">
                Your Score: {finalScorePercent}%
              </h3>
              <p className="text-xs text-slate-500">
                You answered {correctAnswersCount} out of {questions.length} questions correctly.
              </p>
            </div>

            <div className="mx-auto max-w-sm rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-around">
                <div>
                  <span className="text-xl font-bold text-emerald-600">
                    {correctAnswersCount}
                  </span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">
                    Correct
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="text-xl font-bold text-rose-600">
                    {questions.length - correctAnswersCount}
                  </span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">
                    Incorrect
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="text-xl font-bold text-indigo-600">
                    {finalScorePercent >= 80 ? 'Grade A' : finalScorePercent >= 60 ? 'Grade B' : 'Grade C'}
                  </span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">
                    Rank
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={onClose}
                className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
