export interface RawQuestionTuple {
  0: string; // Question text
  1: [string, string, string, string]; // 4 options
  2: number; // Correct index 0-3
  3?: string; // Optional explanation
  4?: string; // Optional sub-topic
}

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  topic?: string;
}

export interface Exam {
  id: string;
  title: string;
  slug: string;
  description: string;
  durationMinutes: number;
  category: string;
  iconName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: Question[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptionIndex: number | null; // null if unattempted
  isMarkedForReview: boolean;
  timeSpentSeconds?: number;
}

export interface ExamResult {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  allottedSeconds: number;
  completedAt: string;
  answers: {
    questionId: string;
    questionText: string;
    options: [string, string, string, string];
    correctIndex: number;
    selectedOptionIndex: number | null;
    isCorrect: boolean;
    explanation: string;
    topic?: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  avatarSeed?: string;
}

export interface Session {
  user: User;
  token: string;
  loggedInAt: string;
}
