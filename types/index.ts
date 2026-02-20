export type ExamType = 'BECE' | 'WASSCE';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index into options
  explanation: string;
}

export interface YearData {
  year: number;
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string; // emoji
  years: YearData[];
}

export interface ExamData {
  type: ExamType;
  description: string;
  subjects: Subject[];
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number; // seconds
  answers: {
    questionId: string;
    selectedAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
  }[];
}
