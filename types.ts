export type AppState = 'LOGIN' | 'INSTRUCTIONS' | 'TEST' | 'RESULTS';

export type Subject = 'Physics' | 'Chemistry' | 'Botany' | 'Zoology';

export type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_marked_for_review';

export interface Question {
  id: number;
  numericId: number; // 1 to 180
  subject: Subject;
  topic: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface UserResponse {
  questionId: number;
  selectedOptionIndex: number | null;
  status: QuestionStatus;
}

export interface TestResult {
  totalMarks: number;
  obtainedMarks: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  percentage: number;
  predictions: string;
  motivation: string;
  weakTopics: string[];
}
