export interface QuestionType {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export interface StateType {
  questions: QuestionType[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
  maxPoints: number;
}
