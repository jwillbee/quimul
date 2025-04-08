import React, { useEffect, useState } from 'react';
import { fetchDailyProblems, recordCompletion } from './api'; // Don't forget recordCompletion!

const App = () => {
  const [problems, setProblems] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [completionTime, setCompletionTime] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null); // Add startTime

  useEffect(() => {
    const storedProblems = localStorage.getItem('quimul_daily_problems');
    if (storedProblems) {
      setProblems(JSON.parse(storedProblems));
      setStartTime(Date.now()); // Start timer if problems already in localStorage
    } else {
      fetchDailyProblems()
        .then(data => {
          setProblems(data);
          localStorage.setItem('quimul_daily_problems', JSON.stringify(data));
          setStartTime(Date.now()); // Start timer after problems are fetched
        })
        .catch(error => console.error('Error fetching daily problems:', error));
    }
  }, []);

  const handleAnswer = (problemIndex, answer) => {
    setUserAnswers(prev => ({ ...prev, [problemIndex]: answer }));
  };

  const handleSubmit = () => {
    if (!startTime) {
      console.error('Start time not set.');
      return;
    }

    const timeMs = Date.now() - startTime;
    setCompletionTime(timeMs);
    setIsCompleted(true);
    recordCompletion(timeMs);
  };

  return (
    <div>
      <h1>Math Challenge</h1>
      {!isCompleted ? (
        <>
          {problems.map((problem, index) => (
            <div key={index}>
              <p>{problem.question}</p>
              <input
                type="number"
                onChange={e => handleAnswer(index, e.target.value)}
                value={userAnswers[index] || ''}
              />
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Answers</button>
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
