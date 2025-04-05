const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const router = express.Router();
const problemsFilePath = path.join(__dirname, '../data/problems.json');

// Endpoint to get the daily problems
router.get('/', async (req, res) => {
  try {
    const problems = await fs.readJson(problemsFilePath);
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

// Endpoint to save the user's time and progress
router.post('/submit', async (req, res) => {
  const { time, userId } = req.body;
  const resultFilePath = path.join(__dirname, '../data/results.json');

  try {
    let results = await fs.readJson(resultFilePath);
    results[userId] = { time, date: new Date().toISOString() };
    await fs.writeJson(resultFilePath, results);
    res.status(200).json({ message: 'Results saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save results' });
  }
});

module.exports = router;
