// שכבת התקדמות מופשטת. v1: localStorage בלבד, בלי התחברות.
// הממשק אסינכרוני בכוונה, כדי שמעבר עתידי ל-DB יהיה החלפת מימוש ולא שכתוב של הרכיבים.

export interface QuizResult {
  score: number;
  total: number;
  at: string; // ISO timestamp
}

export interface LessonProgress {
  completedAt?: string; // ISO timestamp
  quiz?: QuizResult;
}

export interface ProgressStore {
  getProgress(lessonId: string): Promise<LessonProgress | undefined>;
  getAllProgress(): Promise<Record<string, LessonProgress>>;
  markComplete(lessonId: string): Promise<void>;
  saveQuizResult(lessonId: string, score: number, total: number): Promise<void>;
}

const STORAGE_KEY = 'cca:progress:v1';

// localStorage עלול להיות חסום (מצב פרטי, SSR, הגדרות דפדפן) — כל גישה עטופה ב-try/catch
function read(): Record<string, LessonProgress> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, LessonProgress>) : {};
  } catch {
    return {};
  }
}

function write(data: Record<string, LessonProgress>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // אין אחסון זמין — ההתקדמות פשוט לא נשמרת
  }
}

function update(lessonId: string, patch: Partial<LessonProgress>): void {
  const data = read();
  data[lessonId] = { ...data[lessonId], ...patch };
  write(data);
}

export const localStorageProgressStore: ProgressStore = {
  async getProgress(lessonId) {
    return read()[lessonId];
  },
  async getAllProgress() {
    return read();
  },
  async markComplete(lessonId) {
    update(lessonId, { completedAt: new Date().toISOString() });
  },
  async saveQuizResult(lessonId, score, total) {
    update(lessonId, { quiz: { score, total, at: new Date().toISOString() } });
  },
};

// נקודת הכניסה היחידה לרכיבים. להחלפת מימוש (DB) משנים רק את השורה הזו.
export const progressStore: ProgressStore = localStorageProgressStore;
