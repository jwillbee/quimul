import { useEffect, useState } from "react";

export default function ResultsCard({ timeTaken, bestTime, onRestart, problems }) {
  const [copied, setCopied] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const formatted = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  const resultText = `✅ Quimul: Solved all 50 in ${formatted(timeTaken)}!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(resultText)}`;
  const threadsShareUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(resultText)}`;

  return (
    <div className="results-card">
      <h2>🎉 Challenge Complete!</h2>
      <p>Your time: <strong>{formatted(timeTaken)}</strong></p>
      {bestTime && <p>Best time: <strong>{formatted(bestTime)}</strong></p>}

      <div className="share-buttons">
        <button onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy Result"}
        </button>
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">Share on Twitter</a>
        <a href={threadsShareUrl} target="_blank" rel="noopener noreferrer">Share on Threads</a>
      </div>

      <button onClick={onRestart}>🔄 Restart Challenge</button>

      <button onClick={() => setShowAnswers(!showAnswers)}>
        {showAnswers ? "Hide Answers" : "Show Answers"}
      </button>

      {showAnswers && (
        <div className="answers-preview">
          <h3>Answers</h3>
          <ul>
            {problems.map((prob, i) => (
              <li key={i}>
                {prob.question} = <strong>{prob.answer}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
