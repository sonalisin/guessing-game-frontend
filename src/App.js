import "./App.css";

import StartPage from "./pages/StartPage";
import ScorePage from "./pages/ScorePage";
import { useState } from "react";
import Game from "./components/Game";

const API_BASE_URL = "http://localhost:8000/api";

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
      return <StartPage startGame={startGame} />;
    } else if (inPlay === true) {
      return <Game endGame={endGame} />;
    } else if (inPlay === false && score !== null) {
      return <ScorePage score={score} setInPlay={setInPlay} />;
    }
  };

  return (
    <div className="App">
      <h1>Guess the Disney Film!</h1>
      {displayGame()}
    </div>
  );
}

export default App;
