import { useEffect, useRef, useState } from "react";

export default function Timer({ isRunning, onTimeUpdate }) {
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          const updated = prev + 1;
          onTimeUpdate(updated);
          return updated;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return <div className="timer">⏱️ Time: {formatTime(elapsed)}</div>;
}

