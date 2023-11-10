import { StateType, QuestionType } from "./StateType";

export interface ActionType {
  type: string;
  payload?: any;
}

export interface PropType extends StateType {
  dispatch: React.Dispatch<ActionType>;
  numQuestions: number;
  question: QuestionType;
}
