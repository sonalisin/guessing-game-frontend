import { useState, useEffect, useCallback } from "react";
import Question from "./Question";
const API_BASE_URL = "http://localhost:8000/api";

export default function Game({ endGame }) {
  const [options, setOptions] = useState([]);
  const [questionNo, setQuestionNo] = useState(1);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateQuestion = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "/question", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setNewQuestionData(data);
    } catch (e) {
      updateQuestion();
    }
  }, []);

  useEffect(() => {
    if (questionNo === 11) {
      endGame();
    }
    updateQuestion();
  }, [questionNo, endGame, updateQuestion]);

  const setNewQuestionData = ({ options, correct_id }) => {
    setOptions(options);
    setCorrectAnswer(options.find(({ id }) => id === correct_id));
    setLoading(false);
  };

  const onUserGuess = async (userGuessID) => {
    const res = await fetch(API_BASE_URL + `/score/${userGuessID}`, {
      method: "POST",
      credentials: "include",
    });
    const { question_no: nextQuestionNo } = await res.json();
    setQuestionNo(parseInt(nextQuestionNo));
  };

  return (
    <div className="GameWrapper">
      {options.length && !loading ? (
        <div className="QuestionWrapper">
          <h2 className="GameInstructions">
            What film or TV show does this character appear in?
          </h2>
          <h2 data-testid="questionNo" className="QuestionNo">
            Question {questionNo}
          </h2>
          <Question
            img={correctAnswer.img}
            options={options}
            onUserGuess={onUserGuess}
          />
        </div>
      ) : (
        <div data-testid="loading" className="lds-dual-ring"></div>
      )}
    </div>
  );
}
