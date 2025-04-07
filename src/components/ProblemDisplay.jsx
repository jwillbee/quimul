// src/components/ProblemDisplay.jsx
import { useState, useEffect } from "react";

export default function ProblemDisplay({ problem, onCorrect }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(""); // Reset input on new problem
  }, [problem]);

  const handleInput = (value) => {
    if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
    } else {
      setInput((prev) => prev + value);
    }
  };

  useEffect(() => {
    if (parseInt(input, 10) === problem.answer) {
      setTimeout(() => {
        onCorrect();
      }, 200);
    }
  }, [input, problem, onCorrect]);

  return (
    <div className="problem-container">
      <h2>
        {problem.a} × {problem.b} = ?
      </h2>
      <div className="answer-box">{input || " "}</div>
      <div className="numberpad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => handleInput(num.toString())}>
            {num}
          </button>
        ))}
        <button onClick={() => handleInput("⌫")}>⌫</button>
      </div>
    </div>
  );
}

