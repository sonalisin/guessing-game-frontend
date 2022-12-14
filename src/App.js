import "./App.css";
import "./css/FinalScore.css";
import "./css/StartPage.css";
import "./css/Question.css";
import { useState } from "react";
import Game from "./components/Game";
import Confetti from "react-confetti";
const API_BASE_URL = "http://127.0.0.1:5000/api";

function App() {
  const [inPlay, setInPlay] = useState(null);
  const [score, setScore] = useState(null);

  const startGame = async () => {
    const res = await fetch(API_BASE_URL + "/start", {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      setInPlay(true);
    }
  };

  const displayFinishPage = () => {
    return (
      <div className="FinalScoreWrapper">
        <div className="FinalScore">
          <Confetti />
          <h1 className="Title">Final Score</h1>
          <h2 className="Score">{7}</h2>
          <button className="PlayAgain" onClick={() => setInPlay(null)}>
            Play Again
          </button>
        </div>
      </div>
    );
  };

  const endGame = async () => {
    const res = await fetch(API_BASE_URL + "/finish", {
      method: "GET",
      credentials: "include",
    });
    const { score: totalScore } = await res.json();
    setScore(totalScore);
    setInPlay(false);
  };

  const displayGame = () => {
    if (inPlay === null) {
      return (
        <div className="StartPage">
          <div className="Info">
            <p>
              Each photo is a Disney character - pick the film or TV show they
              belong to.
            </p>
          </div>
          <button className="StartBtn" onClick={() => startGame()}>
            Start Game
          </button>
        </div>
      );
    } else if (inPlay === true) {
      return <Game endGame={endGame} />;
    } else if (inPlay === false && score !== null) {
      return displayFinishPage();
    }
  };

  return (
    <div className="App">
      <h1>Guess the Disney Film!</h1>
      {displayGame()}
      {/* {displayFinishPage()} */}
    </div>
  );
}

export default App;
