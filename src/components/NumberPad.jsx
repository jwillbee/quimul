import React from 'react';

const NumberPad = ({ onNumberClick, onDelete, onSubmit }) => {
  const numbers = ['1','2','3','4','5','6','7','8','9','0'];

  return (
    <div className="number-pad">
      <div className="pad-grid">
        {numbers.map((num, i) => (
          <button key={i} onClick={() => onNumberClick(num)}>{num}</button>
        ))}
        <button onClick={onDelete}>←</button>
        <button onClick={onSubmit}>OK</button>
      </div>
    </div>
  );
};

export default NumberPad;
