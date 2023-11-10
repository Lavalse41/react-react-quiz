import { createContext, useContext, useReducer, useEffect } from "react";
import { PropType, ActionType } from "../interface/PropType";
import { QuestionType, StateType } from "../interface/StateType";
import { ChildrenType } from "../interface/ChildrenType";

const QuizContext = createContext<PropType | undefined>(undefined);

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}

function QuizProvider({ children }: ChildrenType) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      question,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (prev: number, cur: QuestionType) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const context: PropType = {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    numQuestions,
    maxPoints,
    dispatch,
    question,
  };

  return (
    <QuizContext.Provider value={context}>{children}</QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
