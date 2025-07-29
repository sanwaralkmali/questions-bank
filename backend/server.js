const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to the questions JSON file
const QUESTIONS_FILE = path.join(__dirname, 'data', 'questions.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize questions file if it doesn't exist
if (!fs.existsSync(QUESTIONS_FILE)) {
  const initialData = {
    questions: [],
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(initialData, null, 2));
}

// Helper function to read questions
function readQuestions() {
  try {
    const data = fs.readFileSync(QUESTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading questions file:', error);
    return { questions: [], lastUpdated: new Date().toISOString() };
  }
}

// Helper function to write questions
function writeQuestions(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing questions file:', error);
    return false;
  }
}

// Routes

// GET /api/questions - Get all questions
app.get('/api/questions', (req, res) => {
  try {
    const data = readQuestions();
    res.json({
      success: true,
      data: data.questions,
      total: data.questions.length,
      lastUpdated: data.lastUpdated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions',
      error: error.message
    });
  }
});

// POST /api/questions - Add a new question
app.post('/api/questions', (req, res) => {
  try {
    const { question, choices, correctAnswer, skill, grade, level } = req.body;

    // Validate required fields
    if (!question || !choices || !correctAnswer || !skill || !grade || !level) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: question, choices, correctAnswer, skill, grade, level'
      });
    }

    // Validate choices array
    if (!Array.isArray(choices) || choices.length !== 4) {
      return res.status(400).json({
        success: false,
        message: 'Choices must be an array with exactly 4 items'
      });
    }

    // Validate that correctAnswer is one of the choices
    if (!choices.includes(correctAnswer)) {
      return res.status(400).json({
        success: false,
        message: 'Correct answer must be one of the provided choices'
      });
    }

    // Create new question object
    const newQuestion = {
      id: Date.now(),
      question,
      choices,
      correctAnswer,
      skill,
      grade,
      level,
      wave: mapDifficultyToWave(level),
      points: 10,
      createdAt: new Date().toISOString()
    };

    // Read existing questions
    const data = readQuestions();
    
    // Add new question
    data.questions.push(newQuestion);

    // Write back to file
    const success = writeQuestions(data);

    if (success) {
      res.json({
        success: true,
        message: 'Question saved successfully!',
        question: newQuestion,
        totalQuestions: data.questions.length
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to save question'
      });
    }

  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET /api/health - Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Helper function to map difficulty level to wave number
function mapDifficultyToWave(level) {
  switch (level) {
    case 'easy': return 1;
    case 'medium': return 2;
    case 'hard': return 3;
    case 'expert': return 4;
    default: return 1;
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Questions file: ${QUESTIONS_FILE}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/questions`);
});