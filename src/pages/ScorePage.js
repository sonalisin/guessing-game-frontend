import "../css/FinalScore.css";
import Confetti from "react-confetti";
export default function ScorePage({ score, setInPlay }) {
  return (
    <div className="FinalScoreWrapper">
      <div className="FinalScore">
        <Confetti />
        <h1 className="Title">Final Score</h1>
        <h2 className="Score" data-testid="score">
          {score}
        </h2>
        <button className="PlayAgain" onClick={() => setInPlay(null)}>
          Play Again
        </button>
      </div>
    </div>
  );
}
