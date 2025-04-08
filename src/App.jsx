import React, { useEffect, useState } from 'react';
import { fetchDailyProblems, recordCompletion } from './api';
import NumberPad from './NumberPad';

const App = () => {
  const [problems, setProblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const storedProblems = localStorage.getItem('quimul_daily_problems');
    if (storedProblems) {
      setProblems(JSON.parse(storedProblems));
      setStartTime(Date.now());
    } else {
      fetchDailyProblems()
        .then(data => {
          setProblems(data);
          localStorage.setItem('quimul_daily_problems', JSON.stringify(data));
          setStartTime(Date.now());
        })
        .catch(err => console.error('Error loading problems:', err));
    }
  }, []);

  const handleNumberClick = (num) => {
    setUserInput(prev => prev + num);
  };

  const handleDelete = () => {
    setUserInput(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const currentProblem = problems[currentIndex];
    const correctAnswer = currentProblem.answer.toString();
    if (userInput === correctAnswer) {
      if (currentIndex + 1 < problems.length) {
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
      } else {
        const timeMs = Date.now() - startTime;
        setCompletionTime(timeMs);
        setIsCompleted(true);
        recordCompletion(timeMs);
      }
    } else {
      alert('Wrong answer. Try again!');
    }
  };

  if (!problems.length) return <p>Loading problems...</p>;

  return (
    <div>
      <h1>Math Challenge</h1>
      {!isCompleted ? (
        <>
          <p>
            Problem {currentIndex + 1} of {problems.length}
          </p>
          <h2>{problems[currentIndex].question}</h2>
          <div className="answer-display">{userInput || '_'}</div>
          <NumberPad
            onNumberClick={handleNumberClick}
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
        </>
      ) : (
        <div>
          <h2>Well done!</h2>
          <p>You completed all the problems in {completionTime}ms</p>
        </div>
      )}
    </div>
  );
};

export default App;
