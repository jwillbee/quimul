
// src/components/DailyChallengeManager.jsx
import { useEffect, useState } from "react";
import seedrandom from "seedrandom";

export function generateDailyProblems(dateString) {
  const rng = seedrandom(dateString);
  const problems = new Set();

  while (problems.size < 50) {
    const a = Math.floor(rng() * 10);
    const b = Math.floor(rng() * 10);
    problems.add(`${a}x${b}`);
  }

  return Array.from(problems).map((p) => {
    const [a, b] = p.split("x").map(Number);
    return { a, b, answer: a * b };
  });
}

export default function useDailyProblems() {
  const [problems, setProblems] = useState([]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [bestTime, setBestTime] = useState(null);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" });
    const key = `math50-${today}`;

    // Load or generate today's problems
    let stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      setProblems(parsed.problems || []);
      setHasCompleted(parsed.hasCompleted || false);
      setBestTime(parsed.bestTime || null);
    } else {
      const newProblems = generateDailyProblems(today);
      setProblems(newProblems);
      localStorage.setItem(key, JSON.stringify({ problems: newProblems }));
    }
  }, []);

  const saveCompletion = (timeTakenSeconds) => {
    const today = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" });
    const key = `math50-${today}`;
    const stored = JSON.parse(localStorage.getItem(key));

    if (!stored.bestTime || timeTakenSeconds < stored.bestTime) {
      stored.bestTime = timeTakenSeconds;
    }

    stored.hasCompleted = true;
    localStorage.setItem(key, JSON.stringify(stored));

    setHasCompleted(true);
    setBestTime(stored.bestTime);
  };

  return { problems, hasCompleted, bestTime, saveCompletion };
}
