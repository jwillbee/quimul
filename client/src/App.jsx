import React, { useEffect, useState } from 'react';
import { fetchDailyProblems } from './api'; // Import the fetchDailyProblems function

const App = () => {
  const [problems, setProblems] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [completionTime, setCompletionTime] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Check if the daily problems already exist in LocalStorage
    const storedProblems = localStorage.getItem('quimul_daily_problems');
    if (storedProblems) {
      setProblems(JSON.parse(storedProblems));
    } else {
      // Fetch new daily problems from the API
      fetchDailyProblems()
        .then(data => {
          setProblems(data);
          // Store the fetched problems in LocalStorage for the day
          localStorage.setItem('quimul_daily_problems', JSON.stringify(data));
        })
        .catch(error => console.error('Error fetching daily problems:', error));
    }
  }, []);

  const handleAnswer = (problemIndex, answer) => {
    setUserAnswers(prev => ({ ...prev, [problemIndex]: answer }));
  };

  const handleSubmit = () => {
    const timeMs = Date.now() - startTime; // Calculate time taken to complete
    setCompletionTime(timeMs);
    setIsCompleted(true);

    // Call the API to record the completion time
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
              {/* Render the NumberPad component or input form to answer the problem */}
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
