import Option from "./Option";
import "../css/Question.css";
export default function Question({ img, options, onUserGuess }) {
  return (
    <div className="Question" data-testid="question">
      <img className="QuestionImg" src={img} alt="question-img" />
      <div className="Options">
        {options.map(({ appearance, id }) => (
          <Option
            value={appearance}
            id={id}
            key={id}
            handleClick={onUserGuess}
          />
        ))}
      </div>
    </div>
  );
}
