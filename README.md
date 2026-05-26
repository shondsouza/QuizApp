# QuizApp

A simple quiz platform with React frontend and Express/MongoDB backend.

## Setup

1. Install dependencies
   - `cd client && npm install`
   - `cd server && npm install`

2. Run the app
   - `cd server && npm run dev`
   - `cd client && npm run dev`

3. Open the client URL shown by Vite (usually `http://localhost:5173`).

## Features

- Category-based quizzes
- Answer feedback and progress tracking
- Saved quiz results for authenticated users

## Notes

- Backend runs on port `7000` by default
- Make sure MongoDB is running locally or set `MONGODB_URI` in `server/.env`
