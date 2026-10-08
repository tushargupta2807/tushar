import { getDefaultExams } from '../data/exams.ts';
import { Exam, ExamResult, Session, User } from '../types';

export const SEED_VERSION = 'v1.0.0';

export const STORAGE_KEYS = {
  EXAMS: 'oe_exams',
  SEED_VERSION: 'oe_seed_version',
  ACCOUNTS: 'oe_accounts',
  SESSION: 'oe_session',
  RESULTS: 'oe_results'
} as const;

export const DEFAULT_DEMO_USER: User = {
  id: 'usr-demo-01',
  name: 'Alex Rivera',
  email: 'student@examprep.test',
  password: 'password123',
  createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
};

/**
 * Initializes localStorage with default exams and demo student account
 * if not already set, or if SEED_VERSION has changed.
 */
export function initializeStorage(): void {
  try {
    const currentSeed = localStorage.getItem(STORAGE_KEYS.SEED_VERSION);
    const existingExams = localStorage.getItem(STORAGE_KEYS.EXAMS);

    // If seed version differs or exams key missing, reset/load exams
    if (currentSeed !== SEED_VERSION || !existingExams) {
      const defaultExams = getDefaultExams();
      localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(defaultExams));
      localStorage.setItem(STORAGE_KEYS.SEED_VERSION, SEED_VERSION);
    }

    // Initialize accounts with demo user if empty
    const existingAccounts = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    if (!existingAccounts) {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify([DEFAULT_DEMO_USER]));
    }
  } catch (err) {
    console.error('Failed to initialize localStorage:', err);
  }
}

/**
 * Force reload exams from code into localStorage
 */
export function forceReloadDefaultExams(): Exam[] {
  const defaults = getDefaultExams();
  localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(defaults));
  localStorage.setItem(STORAGE_KEYS.SEED_VERSION, SEED_VERSION);
  return defaults;
}

/**
 * Retrieve all available exams
 */
export function getExams(): Exam[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.EXAMS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error('Error reading exams from localStorage:', err);
  }
  const defaults = getDefaultExams();
  localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(defaults));
  return defaults;
}

/**
 * Retrieve a specific exam by id or slug
 */
export function getExamById(idOrSlug: string): Exam | null {
  const exams = getExams();
  return exams.find(e => e.id === idOrSlug || e.slug === idOrSlug) || null;
}

/**
 * Update an exam in localStorage (e.g. editing questions)
 */
export function saveExam(exam: Exam): void {
  const exams = getExams();
  const index = exams.findIndex(e => e.id === exam.id);
  if (index >= 0) {
    exams[index] = exam;
  } else {
    exams.push(exam);
  }
  localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
}

// ==================== AUTHENTICATION & SESSION ====================

export function getAccounts(): User[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error('Error reading accounts from localStorage:', err);
  }
  return [DEFAULT_DEMO_USER];
}

export function createAccount(name: string, email: string, password: string): User {
  const accounts = getAccounts();
  const normalizedEmail = email.trim().toLowerCase();

  const existing = accounts.find(a => a.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const newUser: User = {
    id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: normalizedEmail,
    password, // Plain text as specified in brief
    createdAt: new Date().toISOString()
  };

  accounts.push(newUser);
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  return newUser;
}

export function authenticateUser(email: string, password: string): User {
  const accounts = getAccounts();
  const normalizedEmail = email.trim().toLowerCase();
  const account = accounts.find(a => a.email.toLowerCase() === normalizedEmail);

  if (!account) {
    throw new Error('No account found with this email address.');
  }

  if (account.password !== password) {
    throw new Error('Incorrect password. Please verify your credentials.');
  }

  return account;
}

export function getSession(): Session | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error('Error reading session from localStorage:', err);
  }
  return null;
}

export function setSession(user: User): Session {
  const session: Session = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    },
    token: `tok-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    loggedInAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  return session;
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

// ==================== RESULTS & ATTEMPTS ====================

export function getResults(userId?: string): ExamResult[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RESULTS);
    if (stored) {
      const all: ExamResult[] = JSON.parse(stored);
      if (userId) {
        return all.filter(r => r.userId === userId).sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
      }
      return all.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
    }
  } catch (err) {
    console.error('Error reading results from localStorage:', err);
  }
  return [];
}

export function getResultById(id: string): ExamResult | null {
  const results = getResults();
  return results.find(r => r.id === id) || null;
}

export function saveResult(result: ExamResult): void {
  const results = getResults();
  results.unshift(result);
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
}

export function clearUserResults(userId: string): void {
  const results = getResults().filter(r => r.userId !== userId);
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
}
