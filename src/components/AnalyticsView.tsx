import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Clock,
  RotateCcw,
  Trash2,
  CheckCircle,
  AlertCircle,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Exam, ExamResult, Session } from '../types';

interface AnalyticsViewProps {
  session: Session;
  exams: Exam[];
  results: ExamResult[];
  onStartExam: (exam: Exam) => void;
  onViewResult: (resultId: string) => void;
  onClearHistory: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  session,
  exams,
  results,
  onStartExam,
  onViewResult,
  onClearHistory
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  // Compute subject statistics for each of the 6 exams
  const subjectStats = exams.map(exam => {
    const examAttempts = results.filter(r => r.examId === exam.id);
    const count = examAttempts.length;
    const avgScore = count > 0
      ? Math.round(examAttempts.reduce((acc, r) => acc + r.percentage, 0) / count)
      : null;
    const bestScore = count > 0
      ? Math.max(...examAttempts.map(r => r.percentage))
      : null;
    const passedCount = examAttempts.filter(r => r.passed).length;

    return {
      exam,
      count,
      avgScore,
      bestScore,
      passedCount,
      passRate: count > 0 ? Math.round((passedCount / count) * 100) : 0
    };
  });

  // Identify strengths & weaknesses
  const testedSubjects = subjectStats.filter(s => s.avgScore !== null);
  const strongestSubject = testedSubjects.length > 0
    ? [...testedSubjects].sort((a, b) => (b.avgScore || 0) - (a.avgScore || 0))[0]
    : null;
  const weakestSubject = testedSubjects.length > 0
    ? [...testedSubjects].sort((a, b) => (a.avgScore || 0) - (b.avgScore || 0))[0]
    : null;

  const filteredResults = selectedSubjectFilter === 'all'
    ? results
    : results.filter(r => r.examId === selectedSubjectFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Performance Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">
            Subject mastery breakdown across all completed mock tests
          </p>
        </div>

        {results.length > 0 && (
          <button
            onClick={onClearHistory}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 rounded-lg text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Attempt History</span>
          </button>
        )}
      </div>

      {/* Insights Row */}
      {testedSubjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strongestSubject && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start space-x-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 font-mono">
                  Strongest Subject
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{strongestSubject.exam.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Average accuracy of <strong className="text-slate-200">{strongestSubject.avgScore}%</strong> across {strongestSubject.count} attempt{strongestSubject.count > 1 ? 's' : ''}.
                </p>
              </div>
            </div>
          )}

          {weakestSubject && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start space-x-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400 font-mono">
                  Recommended Focus
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{weakestSubject.exam.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Current average is <strong className="text-slate-200">{weakestSubject.avgScore}%</strong>. Retake this test to improve your score.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subject Mastery Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Subject Mastery Grid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjectStats.map(({ exam, count, avgScore, bestScore }) => {
            const isTested = count > 0;
            const scoreVal = avgScore || 0;

            let statusText = 'Not Attempted';
            let statusColor = 'text-slate-400';

            if (isTested) {
              if (scoreVal >= 80) {
                statusText = 'Mastered';
                statusColor = 'text-emerald-400';
              } else if (scoreVal >= 60) {
                statusText = 'Proficient';
                statusColor = 'text-blue-400';
              } else {
                statusText = 'Needs Practice';
                statusColor = 'text-amber-400';
              }
            }

            return (
              <div
                key={exam.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400">{exam.category}</span>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${statusColor}`}>
                      {statusText}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight mb-4">
                    {exam.title}
                  </h3>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Average Score</span>
                      <span className="text-white font-semibold">
                        {isTested ? `${avgScore}%` : '—'}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-500 ${
                          scoreVal >= 80
                            ? 'bg-emerald-500'
                            : scoreVal >= 60
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, scoreVal)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                    <span>Attempts: {count}</span>
                    <span>·</span>
                    <span>Best: {bestScore !== null ? `${bestScore}%` : '—'}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => onStartExam(exam)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    <span>{isTested ? 'Retake Exam' : 'Attempt Test'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Historical Logs */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white tracking-tight">Attempt History</h2>

          {/* Subject Filter */}
          <select
            value={selectedSubjectFilter}
            onChange={e => setSelectedSubjectFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Subjects ({results.length})</option>
            {exams.map(e => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>

        {filteredResults.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
            No exam attempts found for the selected filter.
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="divide-y divide-slate-800">
              {filteredResults.map(res => {
                const dateFormatted = new Date(res.completedAt).toLocaleString();
                const minutesTaken = Math.floor(res.timeSpentSeconds / 60);
                const secondsTaken = res.timeSpentSeconds % 60;

                return (
                  <div
                    key={res.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-850/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white text-sm">{res.examTitle}</span>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider ${
                            res.passed ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {res.passed ? 'Passed' : 'Needs Practice'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {dateFormatted} · {minutesTaken}m {secondsTaken}s · Score: {res.score}/{res.totalQuestions} ({res.percentage}%)
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewResult(res.id)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        Review Solutions
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
