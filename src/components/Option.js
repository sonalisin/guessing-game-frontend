export default function Option({ value, id, handleClick }) {
  return (
    <div className="Option">
      <button id={id} onClick={(e) => handleClick(e.target.id)}>
        {value}
      </button>
    </div>
  );
}
