import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { index, numQuestions, points, maxPoints, answer } = useQuiz();

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
