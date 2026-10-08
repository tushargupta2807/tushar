/**
 * Storage configuration & SEED_VERSION
 * Change SEED_VERSION here to invalidate old localStorage cache and reload new questions.
 */
export const SEED_VERSION = 'v1.0.0';

export {
  STORAGE_KEYS,
  DEFAULT_DEMO_USER,
  initializeStorage,
  forceReloadDefaultExams,
  getExams,
  getExamById,
  saveExam,
  getAccounts,
  createAccount,
  authenticateUser,
  getSession,
  setSession,
  clearSession,
  getResults,
  getResultById,
  saveResult,
  clearUserResults
} from './storage.ts';
