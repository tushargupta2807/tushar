import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu,
  Globe,
  Calculator,
  Atom,
  Brain
} from 'lucide-react';
import { Exam, ExamResult, Session } from '../types';

interface DashboardProps {
  session: Session;
  exams: Exam[];
  results: ExamResult[];
  onStartExam: (exam: Exam) => void;
  onViewResult: (resultId: string) => void;
  onGoToAnalytics: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  session,
  exams,
  results,
  onStartExam,
  onViewResult,
  onGoToAnalytics
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Short loading spinner as explicitly requested in the brief
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-400" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-amber-400" />;
      case 'Atom':
        return <Atom className="w-5 h-5 text-emerald-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-purple-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue-400" />;
    }
  };

  // Metrics calculations
  const totalExamsTaken = results.length;
  const averagePercentage =
    totalExamsTaken > 0
      ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / totalExamsTaken)
      : 0;
  const bestScore =
    totalExamsTaken > 0
      ? Math.max(...results.map(r => r.percentage))
      : 0;
  const passedCount = results.filter(r => r.passed).length;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-3 border-blue-600/20 border-t-blue-500 rounded-full animate-spin" />
        <div className="text-sm text-slate-400 font-medium">Loading your exam dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 text-xs text-blue-400 font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Candidate Assessment Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Welcome back, {session.user.name}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Select any of the 6 core subjects below to practice 10 timed questions. 
            Instant detailed rationales and performance analysis are recorded to your profile.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Tests Attempted</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalExamsTaken}</div>
          <div className="text-[11px] text-slate-400 mt-1">Across 6 subject categories</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Average Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {totalExamsTaken > 0 ? `${averagePercentage}%` : '—'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {totalExamsTaken > 0 ? `${passedCount} of ${totalExamsTaken} tests passed` : 'Awaiting first test'}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Highest Score</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {totalExamsTaken > 0 ? `${bestScore}%` : '—'}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Personal best accuracy</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Pass Benchmark</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">60%</div>
          <div className="text-[11px] text-slate-400 mt-1">6/10 minimum to qualify</div>
        </div>
      </div>

      {/* Available Exams Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Available Subject Tests</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Standardized 10-question multiple choice examinations
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
            6 Subjects Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exams.map(exam => {
            // Find recent attempt for this exam
            const userAttempts = results.filter(r => r.examId === exam.id);
            const latestAttempt = userAttempts[0];

            return (
              <div
                key={exam.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Card top */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700/60">
                      {getSubjectIcon(exam.iconName)}
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block font-mono">
                        {exam.durationMinutes} mins
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">
                        {exam.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight mb-1">
                    {exam.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {exam.description}
                  </p>

                  {/* Metadata line without pill wraps */}
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4 font-mono">
                    <span>{exam.questions.length} questions</span>
                    <span>·</span>
                    <span>1 mark each</span>
                    <span>·</span>
                    <span>4 choices</span>
                  </div>
                </div>

                {/* Card footer */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    {latestAttempt ? (
                      <div className="text-xs">
                        <span className="text-slate-400">Last score: </span>
                        <span
                          className={`font-semibold ${
                            latestAttempt.passed ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {latestAttempt.score}/{latestAttempt.totalQuestions} ({latestAttempt.percentage}%)
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Not attempted yet</span>
                    )}
                  </div>

                  <button
                    onClick={() => onStartExam(exam)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-sm"
                  >
                    {latestAttempt ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Start Test</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Exam History & Results Section */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Recent Exam Results</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review your question solutions, rationales, and timings
            </p>
          </div>
          {results.length > 0 && (
            <button
              onClick={onGoToAnalytics}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1"
            >
              <span>View Detailed Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {results.length === 0 ? (
          /* Empty State as explicitly required */
          <div className="bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-10 sm:p-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
              <BookOpen className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">No Exam Results Yet</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-6 leading-relaxed">
              You haven't attempted any tests yet. Pick any subject above to test your knowledge with 10 questions under real exam conditions.
            </p>
            <button
              onClick={() => onStartExam(exams[0])}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>Take Your First Test ({exams[0]?.title || 'General Knowledge'})</span>
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-800">
              {results.slice(0, 6).map(res => {
                const dateFormatted = new Date(res.completedAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
                const minutesTaken = Math.floor(res.timeSpentSeconds / 60);
                const secondsTaken = res.timeSpentSeconds % 60;

                return (
                  <div
                    key={res.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-850/50 transition-colors"
                  >
                    <div className="flex items-start sm:items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                          res.passed
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {res.percentage}%
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-white text-sm">{res.examTitle}</h4>
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider ${
                              res.passed ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {res.passed ? 'Passed' : 'Needs Practice'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1 font-mono">
                          <span>
                            Score: {res.score} / {res.totalQuestions}
                          </span>
                          <span>·</span>
                          <span>
                            Time: {minutesTaken}m {secondsTaken}s
                          </span>
                          <span>·</span>
                          <span>{dateFormatted}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 self-end sm:self-center">
                      <button
                        onClick={() => onViewResult(res.id)}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                      >
                        View Solutions
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
