import React from 'react';
import { BookOpen, LogOut, User, BarChart2, Layers, CheckCircle } from 'lucide-react';
import { Session } from '../types';

interface HeaderProps {
  session: Session | null;
  activeTab: 'dashboard' | 'analytics' | 'catalog';
  setActiveTab: (tab: 'dashboard' | 'analytics' | 'catalog') => void;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  activeTab,
  setActiveTab,
  onLogout,
  onOpenLogin
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center space-x-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-sm group-hover:bg-blue-500 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">ExamPrep</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-blue-900/80 text-blue-300 border border-blue-700/50 px-1.5 py-0.5 rounded">
                  Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">Practice · Assess · Excel</p>
            </div>
          </button>

          {/* Nav links */}
          {session && (
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'analytics'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>Performance</span>
              </button>
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'catalog'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Question Bank</span>
              </button>
            </nav>
          )}
        </div>

        {/* User status / Action */}
        <div className="flex items-center space-x-3">
          {session ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 pl-3 border-l border-slate-700">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-semibold text-sm">
                  {session.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-medium text-slate-200 leading-tight">
                    {session.user.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                    {session.user.email}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-md transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
