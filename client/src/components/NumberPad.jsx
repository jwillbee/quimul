import React from "react";
import "./NumberPad.css"; // Optional styling file

const NumberPad = ({ onInput, onDelete, onEnter, disabled }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="number-pad">
      <div className="number-buttons">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onInput(num)}
            disabled={disabled}
            className="number-btn"
          >
            {num}
          </button>
        ))}
      </div>
      <div className="pad-actions">
        <button onClick={onDelete} disabled={disabled} className="action-btn">⌫</button>
        <button onClick={onEnter} disabled={disabled} className="action-btn">⏎</button>
      </div>
    </div>
  );
};

export default NumberPad;
