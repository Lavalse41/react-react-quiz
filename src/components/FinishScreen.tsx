import { PropType } from "../interface/PropType";

function FinishScreen({ maxPoints, points, highscore, dispatch }: PropType) {
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span className="emoji">{emoji}</span> You scored{" "}
        <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <p className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </p>
    </>
  );
}

export default FinishScreen;
