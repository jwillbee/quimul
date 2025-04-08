import React, { useEffect, useState } from 'react';
import NumberPad from './components/NumberPad';
import { fetchDailyProblems } from './components/DailyChallengeManager';
import { getStoredProblems, storeProblems, getStoredCompletionTime, storeCompletionTime } from './components/LocalStorageManager';
import ResultsCard from './components/ResultsCard';

const App = () => {
  const [problems, setProblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);

  useEffect(() => {
    const savedProblems = getStoredProblems();
    if (savedProblems) {
      setProblems(savedProblems);
    } else {
      fetchDailyProblems()
        .then((data) => {
          setProblems(data);
          storeProblems(data);
        })
        .catch((err) => console.error('Problem loading problems:', err));
    }

    const storedTime = getStoredCompletionTime();
    if (storedTime) {
      setCompletionTime(storedTime);
    }
  }, []);

  useEffect(() => {
    if (problems.length > 0 && !startTime) {
      setStartTime(Date.now());
    }
  }, [problems, startTime]);

  const handleNumberClick = (num) => {
    setInputValue((prev) => prev + num);
  };

  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const currentProblem = problems[currentIndex];
    if (parseInt(inputValue) === currentProblem.answer) {
      if (currentIndex === problems.length - 1) {
        const timeTaken = Date.now() - startTime;
        setCompletionTime(timeTaken);
        storeCompletionTime(timeTaken);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
      setInputValue('');
    }
  };

  if (completionTime) {
    return <ResultsCard timeMs={completionTime} />;
  }

  if (problems.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="challenge-container">
      <h1>QUIMUL Daily Challenge</h1>
      <div className="problem-display">
        <h2>{problems[currentIndex].question}</h2>
        <div className="answer-box">{inputValue}</div>
        <NumberPad
          onNumberClick={handleNumberClick}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default App;
