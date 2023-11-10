import { PropType } from "../interface/PropType";

function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
}: PropType) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        //if true, number = 1 if false, number = 0
        value={index + Number(answer !== null)}
      ></progress>

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
