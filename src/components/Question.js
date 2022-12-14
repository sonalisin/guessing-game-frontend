import Option from "./Option";

export default function Question({ img, options, onUserGuess }) {
  return (
    <div className="Question">
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
