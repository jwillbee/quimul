const fs = require('fs-extra');
const path = require('path');

// Utility function to generate random multiplication problems
function generateProblems() {
  let problems = [];
  
  for (let i = 0; i < 50; i++) {
    const num1 = Math.floor(Math.random() * 10); // Random number between 0 and 9
    const num2 = Math.floor(Math.random() * 10); // Random number between 0 and 9
    const correctAnswer = num1 * num2;

    problems.push({
      question: `${num1} × ${num2}`,
      correctAnswer: correctAnswer
    });
  }

  return problems;
}

// Save generated problems to a JSON file
async function saveProblems() {
  const problems = generateProblems();
  const problemsFilePath = path.join(__dirname, '../data/problems.json');

  await fs.writeJson(problemsFilePath, problems);
}

module.exports = { saveProblems };
