import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  ArrowLeft,
  Award,
  BarChart2,
  Share2,
  BookOpen,
  Filter,
  Check,
  X
} from 'lucide-react';
import { ExamResult } from '../types';

interface ResultViewProps {
  result: ExamResult;
  onRetake: (examId: string) => void;
  onBackToDashboard: () => void;
  onGoToAnalytics: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onRetake,
  onBackToDashboard,
  onGoToAnalytics
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');

  const correctCount = result.answers.filter(a => a.isCorrect).length;
  const incorrectCount = result.answers.filter(a => a.selectedOptionIndex !== null && !a.isCorrect).length;
  const unattemptedCount = result.answers.filter(a => a.selectedOptionIndex === null).length;

  const minutesTaken = Math.floor(result.timeSpentSeconds / 60);
  const secondsTaken = result.timeSpentSeconds % 60;

  const filteredAnswers = result.answers.filter(a => {
    if (filter === 'correct') return a.isCorrect;
    if (filter === 'incorrect') return a.selectedOptionIndex !== null && !a.isCorrect;
    if (filter === 'unattempted') return a.selectedOptionIndex === null;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onRetake(result.examId)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>
        </div>
      </div>

      {/* Hero Score Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
              Official Assessment Scorecard
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {result.examTitle}
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Completed on {new Date(result.completedAt).toLocaleString()}
            </p>
          </div>

          {/* Circular/Badge Score Indicator */}
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div
                className={`text-4xl sm:text-5xl font-black tracking-tight ${
                  result.passed ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {result.percentage}%
              </div>
              <div
                className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                  result.passed ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {result.passed ? 'PASSED (Qualified)' : 'NEEDS PRACTICE'}
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-800">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400">Total Score</div>
            <div className="text-lg font-bold text-white mt-0.5">
              {result.score} / {result.totalQuestions}
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400">Time Taken</div>
            <div className="text-lg font-bold text-white mt-0.5">
              {minutesTaken}m {secondsTaken}s
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400">Correct Answers</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{correctCount}</div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
            <div className="text-[11px] text-slate-400">Incorrect / Skipped</div>
            <div className="text-lg font-bold text-rose-400 mt-0.5">
              {incorrectCount} / {unattemptedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Solutions & Explanations Header with Interactive Filter Tabs */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Question-by-Question Review & Explanations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Examine each question's correct response and rationales
            </p>
          </div>

          {/* Filter Segmented Control (button-based) */}
          <div className="flex items-center space-x-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({result.answers.length})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Correct ({correctCount})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                filter === 'incorrect'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Incorrect ({incorrectCount})
            </button>
            {unattemptedCount > 0 && (
              <button
                onClick={() => setFilter('unattempted')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filter === 'unattempted'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Skipped ({unattemptedCount})
              </button>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredAnswers.map((ans, idx) => {
            const originalIndex = result.answers.findIndex(a => a.questionId === ans.questionId) + 1;
            const isUnattempted = ans.selectedOptionIndex === null;

            return (
              <div
                key={ans.questionId}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm"
              >
                {/* Question title row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <span className="w-7 h-7 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      Q{originalIndex}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-white leading-relaxed">
                        {ans.questionText}
                      </h3>
                      {ans.topic && (
                        <div className="text-[11px] text-slate-400 mt-1 font-mono">
                          Topic: {ans.topic}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status label */}
                  <div>
                    {ans.isCorrect ? (
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct (+1)</span>
                      </span>
                    ) : isUnattempted ? (
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-400">
                        <HelpCircle className="w-4 h-4" />
                        <span>Skipped (0)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold text-rose-400">
                        <XCircle className="w-4 h-4" />
                        <span>Incorrect (0)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {ans.options.map((optText, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isCorrectAnswer = optIdx === ans.correctIndex;
                    const isUserChoice = optIdx === ans.selectedOptionIndex;

                    let optStyle = 'bg-slate-950/60 border-slate-800 text-slate-300';
                    let badge = null;

                    if (isCorrectAnswer) {
                      optStyle = 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200 font-medium';
                      badge = (
                        <span className="ml-auto inline-flex items-center space-x-1 text-[11px] text-emerald-400 font-semibold shrink-0">
                          <Check className="w-3.5 h-3.5" />
                          <span>Correct Option</span>
                        </span>
                      );
                    } else if (isUserChoice && !ans.isCorrect) {
                      optStyle = 'bg-rose-950/30 border-rose-500/60 text-rose-200';
                      badge = (
                        <span className="ml-auto inline-flex items-center space-x-1 text-[11px] text-rose-400 font-semibold shrink-0">
                          <X className="w-3.5 h-3.5" />
                          <span>Your Choice</span>
                        </span>
                      );
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border text-xs flex items-center space-x-2.5 ${optStyle}`}
                      >
                        <span
                          className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isCorrectAnswer
                              ? 'bg-emerald-600 text-white'
                              : isUserChoice && !ans.isCorrect
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="leading-snug">{optText}</span>
                        {badge}
                      </div>
                    );
                  })}
                </div>

                {/* In-depth Conceptual Rationale Box */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 text-xs space-y-1">
                  <div className="font-semibold text-slate-300 flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>Explanation & Syllabus Note:</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed pl-5">
                    {ans.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
        >
          Return to Dashboard
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={onGoToAnalytics}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Performance Trends
          </button>
          <button
            onClick={() => onRetake(result.examId)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            Retake Exam
          </button>
        </div>
      </div>
    </div>
  );
};
