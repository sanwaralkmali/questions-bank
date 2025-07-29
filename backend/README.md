# Math Questions Backend

A simple Express.js backend API for saving math questions to a JSON file.

## Features

- ✅ Save questions to a single JSON file
- ✅ Validate question data
- ✅ CORS enabled for frontend integration
- ✅ Health check endpoint
- ✅ Error handling and logging

## Local Development

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

### 3. Test the API

**Health Check:**

```bash
curl http://localhost:3001/api/health
```

**Get All Questions:**

```bash
curl http://localhost:3001/api/questions
```

**Add a Question:**

```bash
curl -X POST http://localhost:3001/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is 2 + 2?",
    "choices": ["3", "4", "5", "6"],
    "correctAnswer": "4",
    "skill": "algebra-basics",
    "grade": "5",
    "level": "easy"
  }'
```

## API Endpoints

### GET /api/health

Health check endpoint.

**Response:**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 123.456
}
```

### GET /api/questions

Get all saved questions.

**Response:**

```json
{
  "success": true,
  "data": [...],
  "total": 5,
  "lastUpdated": "2024-01-01T12:00:00.000Z"
}
```

### POST /api/questions

Add a new question.

**Request Body:**

```json
{
  "question": "What is 2 + 2?",
  "choices": ["3", "4", "5", "6"],
  "correctAnswer": "4",
  "skill": "algebra-basics",
  "grade": "5",
  "level": "easy"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Question saved successfully!",
  "question": {
    "id": 1703123456789,
    "question": "What is 2 + 2?",
    "choices": ["3", "4", "5", "6"],
    "correctAnswer": "4",
    "skill": "algebra-basics",
    "grade": "5",
    "level": "easy",
    "wave": 1,
    "points": 10,
    "createdAt": "2024-01-01T12:00:00.000Z"
  },
  "totalQuestions": 6
}
```

## Data Structure

Questions are saved in `data/questions.json`:

```json
{
  "questions": [
    {
      "id": 1703123456789,
      "question": "What is 2 + 2?",
      "choices": ["3", "4", "5", "6"],
      "correctAnswer": "4",
      "skill": "algebra-basics",
      "grade": "5",
      "level": "easy",
      "wave": 1,
      "points": 10,
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ],
  "lastUpdated": "2024-01-01T12:00:00.000Z"
}
```

## Deployment Options

### Option 1: Render (Recommended - Free)

1. Create account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Deploy!

### Option 2: Railway (Free Tier)

1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy automatically

### Option 3: Heroku (Free Tier Discontinued)

1. Create account at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Deploy with Git

### Option 4: Vercel (Free)

1. Create account at [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Deploy automatically

## Environment Variables

- `PORT`: Server port (default: 3001)

## File Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── README.md         # This file
└── data/
    └── questions.json # Questions data file
```
