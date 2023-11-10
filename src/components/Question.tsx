import { PropType } from "../interface/PropType";
import Options from "./Options";

function Question({ question, dispatch, answer }: PropType) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        numQuestions={0}
        questions={[]}
        status={""}
        index={0}
        points={0}
        highscore={0}
        secondsRemaining={0}
        maxPoints={0}
      />
    </div>
  );
}
export default Question;
