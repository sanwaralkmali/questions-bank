// Utility functions for handling question operations

export interface QuestionData {
  question: string;
  choices: string[];
  correctAnswer: string;
  skill: string;
  grade: string;
  level: string;
}

export interface QuestionForJSON {
  id: number;
  wave: number;
  question: string;
  choices: string[];
  answer: string;
  points: number;
}

// Backend API URL - using the deployed backend
const API_BASE_URL = 'https://questions-bank-8z7m.onrender.com';

// Function to save question to backend API
export const saveQuestionToFile = async (questionData: QuestionData): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/api/questions`);
    console.log('Request data:', questionData);
    
    const response = await fetch(`${API_BASE_URL}/api/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    });

    console.log('Response status:', response.status);
    const result = await response.json();
    console.log('Response data:', result);

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || 'Question saved successfully!'
      };
    } else {
      return {
        success: false,
        message: result.message || 'Failed to save question'
      };
    }

  } catch (error) {
    console.error('Error saving question:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.'
    };
  }
};

// Function to get all questions from backend
export const getAllQuestions = async (): Promise<{ success: boolean; data?: QuestionForJSON[]; message?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/questions`);
    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        data: result.data
      };
    } else {
      return {
        success: false,
        message: result.message || 'Failed to fetch questions'
      };
    }

  } catch (error) {
    console.error('Error fetching questions:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.'
    };
  }
};

// Function to check if backend is running
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
};

// Function to map difficulty level to wave number
export const mapDifficultyToWave = (level: string): number => {
  switch (level) {
    case 'easy': return 1;
    case 'medium': return 2;
    case 'hard': return 3;
    case 'expert': return 4;
    default: return 1;
  }
};

// Function to map wave number to difficulty level
export const mapWaveToDifficulty = (wave: number): string => {
  switch (wave) {
    case 1: return 'easy';
    case 2: return 'medium';
    case 3: return 'hard';
    case 4: return 'expert';
    default: return 'easy';
  }
};