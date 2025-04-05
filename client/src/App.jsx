import React, { useState } from 'react';
import DailyChallengeManager from './components/DailyChallengeManager';
import ProblemDisplay from './components/ProblemDisplay';
import NumberPad from './components/NumberPad';
import Timer from './components/Timer';
import ResultsCard from './components/ResultsCard';
import './styles.css';

export default function App() {
  const [problems, setProblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [completed, setCompleted] = useState(false);

  const startChallenge = (generatedProblems) => {
    setProblems(generatedProblems);
    setCurrentIndex(0);
    setUserInput('');
    setStartTime(Date.now());
    setEndTime(null);
    setCompleted(false);
  };

  const handleInput = (digit) => {
    if (digit === '←') {
      setUserInput(userInput.slice(0, -1));
    } else if (digit === '↵') {
      const [a, b] = problems[currentIndex];
      if (parseInt(userInput) === a * b) {
        if (currentIndex === problems.length - 1) {
          setEndTime(Date.now());
          setCompleted(true);
        } else {
          setCurrentIndex(currentIndex + 1);
          setUserInput('');
        }
      }
    } else {
      setUserInput(userInput + digit);
    }
  };

  return (
    <div className="app-container">
      <h1>Math 50 Challenge</h1>
      <DailyChallengeManager onStart={startChallenge} />

      {problems.length > 0 && !completed && (
        <>
          <Timer startTime={startTime} running={!completed} />
          <ProblemDisplay
            problem={problems[currentIndex]}
            userInput={userInput}
          />
          <NumberPad onInput={handleInput} />
        </>
      )}

      {completed && (
        <ResultsCard startTime={startTime} endTime={endTime} />
      )}

      <div className="ad-space">
        {/* Reserved space for Google Ads */}
      </div>
    </div>
  );
}

