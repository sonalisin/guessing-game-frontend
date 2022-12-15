import "../css/StartPage.css";
export default function StartPage({ startGame }) {
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
}
