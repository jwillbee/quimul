import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// GET today's 50 problems
export const fetchDailyProblems = () => API.get('/api/problems');

// GET user record from localStorage-compatible ID
export const fetchUserRecord = (userId) => API.get(`/api/user/${userId}`);

// POST a new completion
export const postCompletion = ({ userId, time }) =>
  API.post('/api/submit', { userId, time });

export default API;
