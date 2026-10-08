import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthView } from './components/AuthView';
import { Dashboard } from './components/Dashboard';
import { ExamRunner } from './components/ExamRunner';
import { ResultView } from './components/ResultView';
import { AnalyticsView } from './components/AnalyticsView';
import { CatalogView } from './components/CatalogView';
import {
  initializeStorage,
  getSession,
  clearSession,
  getExams,
  getResults,
  saveResult,
  clearUserResults,
  getResultById
} from './lib/storage';
import { Exam, ExamResult, Session } from './types';

type Screen = 'auth' | 'dashboard' | 'exam' | 'result' | 'analytics' | 'catalog';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [exams, setExams] = useState<Exam[]>([]);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [activeResultId, setActiveResultId] = useState<string | null>(null);
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize storage and load session
  useEffect(() => {
    initializeStorage();
    const currentSession = getSession();
    setSession(currentSession);
    const loadedExams = getExams();
    setExams(loadedExams);

    if (currentSession) {
      setResults(getResults(currentSession.user.id));
      setCurrentScreen('dashboard');
    } else {
      // Redirect to sign in when logged out
      setCurrentScreen('auth');
    }

    setIsInitialized(true);
  }, []);

  // Sync results when session changes
  const refreshUserData = (userSession: Session) => {
    setSession(userSession);
    setResults(getResults(userSession.user.id));
    setExams(getExams());
  };

  const handleLoginSuccess = (newSession: Session) => {
    setSession(newSession);
    setRedirectNotice(null);
    setResults(getResults(newSession.user.id));
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setActiveExam(null);
    setActiveResultId(null);
    setRedirectNotice('You have been signed out. Please sign in to access your dashboard.');
    setCurrentScreen('auth');
  };

  const handleStartExam = (exam: Exam) => {
    if (!session) {
      setRedirectNotice('Please sign in to begin an exam.');
      setCurrentScreen('auth');
      return;
    }
    setActiveExam(exam);
    setCurrentScreen('exam');
  };

  const handleFinishExam = (newResult: ExamResult) => {
    saveResult(newResult);
    if (session) {
      setResults(getResults(session.user.id));
    }
    setActiveResultId(newResult.id);
    setActiveExam(null);
    setCurrentScreen('result');
  };

  const handleViewResult = (resultId: string) => {
    if (!session) {
      setRedirectNotice('Please sign in to view exam results.');
      setCurrentScreen('auth');
      return;
    }
    setActiveResultId(resultId);
    setCurrentScreen('result');
  };

  const handleRetakeExam = (examId: string) => {
    const targetExam = exams.find(e => e.id === examId);
    if (targetExam) {
      handleStartExam(targetExam);
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleClearHistory = () => {
    if (!session) return;
    if (window.confirm('Are you sure you want to clear your exam attempt history?')) {
      clearUserResults(session.user.id);
      setResults([]);
    }
  };

  const handleExamsUpdated = () => {
    setExams(getExams());
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Active result object if on result screen
  const activeResult = activeResultId ? getResultById(activeResultId) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header is always visible except inside full-focus exam runner */}
      {currentScreen !== 'exam' && (
        <Header
          session={session}
          activeTab={
            currentScreen === 'analytics'
              ? 'analytics'
              : currentScreen === 'catalog'
              ? 'catalog'
              : 'dashboard'
          }
          setActiveTab={tab => {
            if (!session) {
              setRedirectNotice('Please sign in to access this section.');
              setCurrentScreen('auth');
              return;
            }
            setCurrentScreen(tab);
          }}
          onLogout={handleLogout}
          onOpenLogin={() => {
            setRedirectNotice(null);
            setCurrentScreen('auth');
          }}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentScreen === 'auth' && (
          <AuthView
            onSuccess={handleLoginSuccess}
            redirectReason={redirectNotice}
          />
        )}

        {currentScreen === 'dashboard' && session && (
          <Dashboard
            session={session}
            exams={exams}
            results={results}
            onStartExam={handleStartExam}
            onViewResult={handleViewResult}
            onGoToAnalytics={() => setCurrentScreen('analytics')}
          />
        )}

        {currentScreen === 'exam' && activeExam && session && (
          <ExamRunner
            exam={activeExam}
            session={session}
            onFinishExam={handleFinishExam}
            onCancel={() => {
              setActiveExam(null);
              setCurrentScreen('dashboard');
            }}
          />
        )}

        {currentScreen === 'result' && (
          activeResult ? (
            <ResultView
              result={activeResult}
              onRetake={handleRetakeExam}
              onBackToDashboard={() => setCurrentScreen('dashboard')}
              onGoToAnalytics={() => setCurrentScreen('analytics')}
            />
          ) : (
            <div className="max-w-md mx-auto py-16 text-center">
              <p className="text-slate-400 text-sm mb-4">No exam result selected.</p>
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
              >
                Go to Dashboard
              </button>
            </div>
          )
        )}

        {currentScreen === 'analytics' && session && (
          <AnalyticsView
            session={session}
            exams={exams}
            results={results}
            onStartExam={handleStartExam}
            onViewResult={handleViewResult}
            onClearHistory={handleClearHistory}
          />
        )}

        {currentScreen === 'catalog' && (
          <CatalogView
            exams={exams}
            onExamsUpdated={handleExamsUpdated}
          />
        )}
      </main>

      {/* Footer */}
      {currentScreen !== 'exam' && (
        <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span>ExamPrep Standardized Testing Suite</span>
              <span className="mx-2">·</span>
              <span>6 Subjects · 60 Questions</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              Storage: Client LocalStorage · Seed: v1.0.0
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
