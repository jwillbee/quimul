import { useEffect, useState } from "react";

export default function ResultsCard({ timeTaken, bestTime }) {
  const [copied, setCopied] = useState(false);

  const formatted = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
  };

  const resultText = `✅ Math50: Solved all 50 in ${formatted(timeTaken)}!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="results-card">
      <h2>🎉 Challenge Complete!</h2>
      <p>Your time: <strong>{formatted(timeTaken)}</strong></p>
      {bestTime && (
        <p>Best time: <strong>{formatted(bestTime)}</strong></p>
      )}
      <div className="share-buttons">
        <button onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy Result"}
        </button>
        {/* Optional: Add social sharing here */}
      </div>
    </div>
  );
}

