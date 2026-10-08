import React, { useState } from 'react';
import {
  Layers,
  RotateCcw,
  Check,
  Edit3,
  Save,
  X,
  Code,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Exam, Question } from '../types';
import { SEED_VERSION, forceReloadDefaultExams, saveExam } from '../lib/storage';

interface CatalogViewProps {
  exams: Exam[];
  onExamsUpdated: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ exams, onExamsUpdated }) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    question: string;
    options: [string, string, string, string];
    correctIndex: number;
    explanation: string;
  } | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const currentExam = exams.find(e => e.id === selectedExamId) || exams[0];

  const handleStartEdit = (q: Question) => {
    setEditingQuestionId(q.id);
    setEditForm({
      question: q.question,
      options: [...q.options] as [string, string, string, string],
      correctIndex: q.correctIndex,
      explanation: q.explanation
    });
  };

  const handleSaveEdit = () => {
    if (!editForm || !editingQuestionId || !currentExam) return;

    const updatedQuestions = currentExam.questions.map(q => {
      if (q.id === editingQuestionId) {
        return {
          ...q,
          question: editForm.question,
          options: editForm.options,
          correctIndex: editForm.correctIndex,
          explanation: editForm.explanation
        };
      }
      return q;
    });

    const updatedExam: Exam = {
      ...currentExam,
      questions: updatedQuestions
    };

    saveExam(updatedExam);
    setEditingQuestionId(null);
    setEditForm(null);
    setStatusMessage('Question updated and saved to localStorage.');
    setTimeout(() => setStatusMessage(null), 3000);
    onExamsUpdated();
  };

  const handleResetToSeed = () => {
    if (window.confirm('Reset all exams to the factory defaults in src/data/exams.js? This resets any custom edits in localStorage.')) {
      forceReloadDefaultExams();
      setStatusMessage(`Exams successfully reset to SEED_VERSION (${SEED_VERSION}).`);
      setTimeout(() => setStatusMessage(null), 3000);
      onExamsUpdated();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Question Bank & Seed Inspector</h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse all 60 questions across the 6 exams. Questions are stored in localStorage with seed version <code className="text-blue-400 font-mono">{SEED_VERSION}</code>.
          </p>
        </div>

        <button
          onClick={handleResetToSeed}
          className="inline-flex items-center space-x-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Factory Seed ({SEED_VERSION})</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center space-x-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Subject Filter Tabs (Buttons) */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 border-b border-slate-800">
        {exams.map(exam => {
          const isSelected = exam.id === selectedExamId;
          return (
            <button
              key={exam.id}
              onClick={() => {
                setSelectedExamId(exam.id);
                setEditingQuestionId(null);
              }}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {exam.title} ({exam.questions.length})
            </button>
          );
        })}
      </div>

      {/* Questions list for selected exam */}
      {currentExam && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">
              {currentExam.title} — Questions (1 to {currentExam.questions.length})
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Format: [question, [4 options], correctIndex]
            </span>
          </div>

          <div className="space-y-4">
            {currentExam.questions.map((q, idx) => {
              const isEditing = editingQuestionId === q.id;

              if (isEditing && editForm) {
                return (
                  <div
                    key={q.id}
                    className="bg-slate-900 border-2 border-blue-500/80 rounded-xl p-5 space-y-4 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-blue-400 font-semibold">
                        Editing Question #{idx + 1}
                      </span>
                      <button
                        onClick={() => setEditingQuestionId(null)}
                        className="text-slate-400 hover:text-slate-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Question Text:
                      </label>
                      <textarea
                        value={editForm.question}
                        onChange={e =>
                          setEditForm({ ...editForm, question: e.target.value })
                        }
                        rows={2}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-slate-300">
                        Four Options (Select radio for correct answer):
                      </label>
                      {editForm.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`edit-correct-${q.id}`}
                            checked={editForm.correctIndex === oIdx}
                            onChange={() =>
                              setEditForm({ ...editForm, correctIndex: oIdx })
                            }
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-xs font-bold text-slate-400 w-4">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <input
                            type="text"
                            value={opt}
                            onChange={e => {
                              const newOpts = [...editForm.options] as [string, string, string, string];
                              newOpts[oIdx] = e.target.value;
                              setEditForm({ ...editForm, options: newOpts });
                            }}
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Explanation / Rationale:
                      </label>
                      <input
                        type="text"
                        value={editForm.explanation}
                        onChange={e =>
                          setEditForm({ ...editForm, explanation: e.target.value })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => setEditingQuestionId(null)}
                        className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save to localStorage</span>
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={q.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-medium text-white">{q.question}</h4>
                        {q.topic && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            Topic: {q.topic}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartEdit(q)}
                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded transition-colors shrink-0"
                      title="Edit Question"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctIndex;
                      const letter = String.fromCharCode(65 + oIdx);

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border flex items-center space-x-2 ${
                            isCorrect
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 font-medium'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center shrink-0 ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {letter}
                          </span>
                          <span className="truncate">{opt}</span>
                          {isCorrect && (
                            <span className="ml-auto text-[10px] uppercase font-bold text-emerald-400">
                              Correct
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                    <strong className="text-slate-300">Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
