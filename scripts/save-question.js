const fs = require('fs');
const path = require('path');

// Function to save a question to a JSON file
function saveQuestionToFile(questionData) {
  try {
    const { skill, question, choices, correctAnswer, level, grade } = questionData;
    
    // Create the question object in the correct format
    const newQuestion = {
      id: Date.now(), // Use timestamp as temporary ID
      wave: mapDifficultyToWave(level),
      question: question,
      choices: choices,
      answer: correctAnswer,
      points: 10 // Default points
    };

    // Path to the skill file
    const filePath = path.join(__dirname, '..', 'public', 'data', 'skills', `${skill}.json`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`Skill file not found: ${filePath}`);
      return { success: false, message: `Skill file not found: ${skill}.json` };
    }

    // Read existing file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const skillData = JSON.parse(fileContent);

    // Add new question
    skillData.questions.push(newQuestion);

    // Update waves count if needed
    const maxWave = Math.max(...skillData.questions.map(q => q.wave));
    skillData.waves = maxWave;

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(skillData, null, 2));

    console.log(`Question saved successfully to ${skill}.json`);
    console.log('New question:', newQuestion);
    
    return { success: true, message: `Question saved to ${skill}.json` };

  } catch (error) {
    console.error('Error saving question:', error);
    return { success: false, message: `Error: ${error.message}` };
  }
}

// Function to map difficulty level to wave number
function mapDifficultyToWave(level) {
  switch (level) {
    case 'easy': return 1;
    case 'medium': return 2;
    case 'hard': return 3;
    case 'expert': return 4;
    default: return 1;
  }
}

// Example usage (you can run this script manually)
if (require.main === module) {
  // Example question data
  const exampleQuestion = {
    skill: 'algebra-basics',
    question: 'What is the value of $x$ in the equation $2x + 5 = 11$?',
    choices: ['2', '3', '4', '5'],
    correctAnswer: '3',
    level: 'medium',
    grade: '8'
  };

  console.log('Saving example question...');
  const result = saveQuestionToFile(exampleQuestion);
  console.log('Result:', result);
}

module.exports = { saveQuestionToFile };