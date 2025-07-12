import React, { useEffect, useState } from 'react';
import NumberPad from './components/NumberPad';
import ResultsCard from './components/ResultsCard';
import { fetchDailyProblems } from './api';

const App = () => {
  const [problems, setProblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load problems on first mount
  useEffect(() => {
    const stored = localStorage.getItem('quimul_daily_problems');
    const best = localStorage.getItem('quimul_best_time');
    const completed = localStorage.getItem('quimul_completed');

    if (best) setBestTime(parseInt(best));
    if (completed) setIsCompleted(true);

    let parsed = [];
    try {
      parsed = JSON.parse(stored);
    } catch (err) {
      console.warn("Failed to parse stored problems:", err);
    }

    if (parsed && Array.isArray(parsed) && parsed.length > 0) {
      setProblems(parsed);
    } else {
      fetchDailyProblems()
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const shuffled = data.sort(() => Math.random() - 0.5);
            setProblems(shuffled);
            localStorage.setItem('quimul_daily_problems', JSON.stringify(shuffled));
          } else {
            console.error("No problems received from backend.");
          }
        })
        .catch(err => {
          console.error("Error fetching daily problems:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (problems.length > 0 && startTime === null) {
      setStartTime(Date.now());
    }
  }, [problems]);

  const handleNumberClick = (digit) => {
    setUserInput(prev => prev + digit);
  };

  const handleDelete = () => {
    setUserInput(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!userInput) return;
    const correctAnswer = problems[currentIndex].answer;
    if (parseInt(userInput) === correctAnswer) {
      if (currentIndex === problems.length - 1) {
        const end = Date.now();
        const timeTaken = Math.floor((end - startTime) / 1000);
        setCompletionTime(timeTaken);
        setIsCompleted(true);
        localStorage.setItem('quimul_completed', 'true');

        const best = localStorage.getItem('quimul_best_time');
        if (!best || timeTaken < parseInt(best)) {
          setBestTime(timeTaken);
          localStorage.setItem('quimul_best_time', timeTaken);
        }
      } else {
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
      }
    }
  };

  const restartChallenge = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="app">
      <h1>QUIMUL Daily Challenge</h1>

      {problems.length === 0 && !isCompleted && (
        <p>Loading today’s challenge...</p>
      )}

      {!isCompleted && problems.length > 0 && problems[currentIndex] && (
        <>
          <div className="problem-box">
            <h2>Problem {currentIndex + 1} of {problems.length}</h2>
            <p className="problem-question">{problems[currentIndex].question}</p>
            <div className="user-input">{userInput || ' '}</div>
          </div>

          <NumberPad
            onNumberClick={handleNumberClick}
            onDelete={handleDelete}
            onSubmit={handleSubmit}
          />
        </>
      )}

      {isCompleted && (
        <ResultsCard
          timeTaken={completionTime}
          bestTime={bestTime}
          onRestart={restartChallenge}
          problems={problems}
        />
      )}
    </div>
  );
};

export default App;
