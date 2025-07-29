# Math Wave Survivor - Debug Questions

A React application for debugging and testing LaTeX equations in math questions.

## Features

- **Question Debug Interface**: View and test all questions from different math skills
- **LaTeX Rendering**: Proper rendering of mathematical expressions using KaTeX
- **Wave Filtering**: Filter questions by wave number
- **Skill Selection**: Choose from different math skills to debug
- **Raw Data View**: See the raw JSON data for each question

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components
- KaTeX for math rendering
- React Query for data fetching

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL (usually `http://localhost:5173`)

## Usage

1. Select a skill from the dropdown menu
2. Optionally filter questions by wave number
3. View all questions with their LaTeX expressions properly rendered
4. See the correct answer highlighted in green
5. Expand the "Raw JSON Data" section to view the question's raw data

## Project Structure

```
src/
├── components/
│   └── ui/           # Essential UI components (card, badge, select, toast)
├── hooks/
│   └── use-toast.ts  # Toast notification hook
├── lib/
│   └── utils.ts      # Utility functions
├── pages/
│   └── DebugQuestions.tsx  # Main debug interface
└── App.tsx           # Root component
```

## Data Files

The application loads question data from JSON files in the `public/data/` directory:

- `games.json` - List of available skills
- `skills/*.json` - Individual skill question data
