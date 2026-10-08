import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  Send,
  HelpCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Exam, ExamResult, Session } from '../types';

interface ExamRunnerProps {
  exam: Exam;
  session: Session;
  onFinishExam: (result: ExamResult) => void;
  onCancel: () => void;
}

interface QuestionState {
  selectedOption: number | null;
  isMarkedForReview: boolean;
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({
  exam,
  session,
  onFinishExam,
  onCancel
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Map of question states by question index (0..9)
  const [questionStates, setQuestionStates] = useState<Record<number, QuestionState>>(() => {
    const initial: Record<number, QuestionState> = {};
    exam.questions.forEach((_, idx) => {
      initial[idx] = { selectedOption: null, isMarkedForReview: false };
    });
    return initial;
  });

  const totalQuestions = exam.questions.length;
  const totalSeconds = exam.durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isTimeUpModal, setIsTimeUpModal] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown timer effect
  useEffect(() => {
    if (!hasStarted) return;

    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasStarted]);

  const handleTimeExpired = () => {
    setIsTimeUpModal(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    setQuestionStates(prev => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        selectedOption: optionIndex
      }
    }));
  };

  const handleClearOption = () => {
    setQuestionStates(prev => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        selectedOption: null
      }
    }));
  };

  const handleToggleMarkForReview = () => {
    setQuestionStates(prev => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        isMarkedForReview: !prev[currentIndex].isMarkedForReview
      }
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateFinalResult = (): ExamResult => {
    const elapsedSeconds = Math.max(1, totalSeconds - secondsRemaining);
    let correctCount = 0;

    const answerDetails = exam.questions.map((q, idx) => {
      const userState = questionStates[idx];
      const selected = userState.selectedOption;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        questionText: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        selectedOptionIndex: selected,
        isCorrect,
        explanation: q.explanation,
        topic: q.topic
      };
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 60;

    const newResult: ExamResult = {
      id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: session.user.id,
      examId: exam.id,
      examTitle: exam.title,
      score: correctCount,
      totalQuestions,
      percentage,
      passed,
      timeSpentSeconds: elapsedSeconds,
      allottedSeconds: totalSeconds,
      completedAt: new Date().toISOString(),
      answers: answerDetails
    };

    return newResult;
  };

  const submitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const result = calculateFinalResult();
    onFinishExam(result);
  };

  // Stats for review palette
  const answeredCount = Object.values(questionStates).filter(s => s.selectedOption !== null).length;
  const markedCount = Object.values(questionStates).filter(s => s.isMarkedForReview).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Format timer
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeWarning = secondsRemaining <= 120; // 2 minutes remaining
  const timeUrgent = secondsRemaining <= 30; // 30 seconds

  // Pre-test Briefing Screen
  if (!hasStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="border-b border-slate-800 pb-6">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono">
              Examination Instructions
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {exam.title}
            </h1>
            <p className="text-sm text-slate-400 mt-2">{exam.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs text-slate-400">Total Questions</div>
              <div className="text-xl font-bold text-white mt-1">{exam.questions.length}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs text-slate-400">Time Allowed</div>
              <div className="text-xl font-bold text-white mt-1">{exam.durationMinutes} Mins</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs text-slate-400">Marking Scheme</div>
              <div className="text-xl font-bold text-white mt-1">+1 / 0</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs text-slate-400">Passing Grade</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">60% (6/10)</div>
            </div>
          </div>

          <div className="space-y-3 bg-slate-950/70 p-5 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300">
            <h4 className="font-semibold text-white flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Rules and Candidate Guidelines:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400">
              <li>The countdown begins as soon as you click "Begin Test".</li>
              <li>You can freely jump between questions using the question grid palette.</li>
              <li>You can tag difficult questions with "Mark for Review" to reconsider later.</li>
              <li>You can change or clear your chosen option at any time prior to submission.</li>
              <li>The test will auto-submit immediately if the timer reaches 00:00.</li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel & Return
            </button>
            <button
              onClick={() => setHasStarted(true)}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg shadow-md transition-colors cursor-pointer"
            >
              <span>Begin Test Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = exam.questions[currentIndex];
  const currentState = questionStates[currentIndex];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex flex-col">
      {/* Test Runner Top Bar */}
      <div className="sticky top-16 z-20 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight sm:text-base">
            {exam.title}
          </h2>
          <div className="text-xs text-slate-400 font-mono">
            Question {currentIndex + 1} of {totalQuestions}
          </div>
        </div>

        {/* Live Timer */}
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg border font-mono font-semibold text-sm transition-colors ${
              timeUrgent
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                : timeWarning
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-800 text-slate-200 border-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Exam</span>
          </button>
        </div>
      </div>

      {/* Main Test Layout: Question Area + Palette */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Question (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div>
            {/* Question Header & Review Flag */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm">
                  Q{currentIndex + 1}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Single Choice · +1.0 Mark
                </span>
              </div>

              <button
                type="button"
                onClick={handleToggleMarkForReview}
                className={`inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  currentState.isMarkedForReview
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>
                  {currentState.isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}
                </span>
              </button>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-medium text-white leading-relaxed mb-6">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = currentState.selectedOption === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm ring-1 ring-blue-500'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm font-normal pt-0.5 leading-snug">
                      {optionText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Toolbar */}
          <div className="pt-8 mt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentState.selectedOption !== null && (
                <button
                  type="button"
                  onClick={handleClearOption}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {currentIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="inline-flex items-center space-x-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <span>Finish & Submit</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Navigator Palette (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-white tracking-tight">Question Palette</h4>
              <span className="text-xs font-mono text-slate-400">10 Questions</span>
            </div>

            {/* Question Badges Grid */}
            <div className="grid grid-cols-5 gap-2.5 mb-6">
              {exam.questions.map((_, idx) => {
                const st = questionStates[idx];
                const isCurrent = idx === currentIndex;
                const isAnswered = st.selectedOption !== null;
                const isMarked = st.isMarkedForReview;

                let badgeStyle = 'bg-slate-950 border-slate-800 text-slate-400';

                if (isMarked) {
                  badgeStyle = 'bg-amber-500/20 border-amber-500/50 text-amber-300';
                } else if (isAnswered) {
                  badgeStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
                }

                if (isCurrent) {
                  badgeStyle += ' ring-2 ring-blue-500 font-bold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-11 rounded-lg border text-xs font-medium flex items-center justify-center transition-all cursor-pointer ${badgeStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2.5 text-xs text-slate-400 border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-400" />
                  <span>Answered</span>
                </div>
                <span className="font-mono text-slate-300 font-semibold">{answeredCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-400" />
                  <span>Marked for Review</span>
                </div>
                <span className="font-mono text-slate-300 font-semibold">{markedCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700" />
                  <span>Unanswered</span>
                </div>
                <span className="font-mono text-slate-300 font-semibold">{unansweredCount}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6">
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Manual Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Confirm Submission</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you ready to submit your exam? Here is your current attempt summary:
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-6 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Answered Questions:</span>
                <span className="font-semibold text-emerald-400 font-mono">{answeredCount} of {totalQuestions}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Unanswered Questions:</span>
                <span className="font-semibold text-rose-400 font-mono">{unansweredCount}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Marked for Review:</span>
                <span className="font-semibold text-amber-400 font-mono">{markedCount}</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                <span>Time Remaining:</span>
                <span className="font-mono text-slate-200">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Return to Test
              </button>
              <button
                type="button"
                onClick={submitExam}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Submit Time's Up Modal */}
      {isTimeUpModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Time Has Expired!</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              The allotted exam duration has ended. Your responses have been saved and your exam will now be evaluated.
            </p>
            <button
              type="button"
              onClick={submitExam}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Proceed to Evaluation & Solutions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
