const BASE_URL = 'https://quimul-694e28d58e56.herokuapp.com/api';

// Function to fetch the daily problems from the backend
export async function fetchDailyProblems() {
  try {
    const response = await fetch(`${BASE_URL}/problems`);
    if (!response.ok) throw new Error('Failed to fetch problems');
    return await response.json();
  } catch (error) {
    console.error("Error fetching daily problems:", error);
    throw error;
  }
}

// Function to record the user's completion time
export async function recordCompletion(timeMs) {
  try {
    const response = await fetch(`${BASE_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: timeMs })
    });
    if (!response.ok) throw new Error('Failed to record completion');
    return await response.json();
  } catch (error) {
    console.error("Error recording completion:", error);
    throw error;
  }
}

