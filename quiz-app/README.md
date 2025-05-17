# Knowledge Quiz Application

A responsive, interactive quiz application built with React and TypeScript that offers multiple subject categories and provides instant feedback.

## Features

- **Welcome Screen**: Personalized experience with user name entry
- **Subject Selection**: Choose from multiple quiz categories (General Knowledge, Science, History)
- **Interactive Quiz Interface**: 
  - 10 questions per subject
  - 30-second timer for each question
  - Progress tracking
  - Visual feedback
- **Comprehensive Results**: 
  - Score summary with percentage
  - Performance-based feedback messages
  - Detailed review of all answers
  - Option to retry or select a new subject

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with responsive design
- **Deployment**: GitHub Pages

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

- `src/components/`: React components (QuestionCard, WelcomeScreen, SubjectSelection)
- `src/data/`: Quiz questions organized by subject category
- `src/App.tsx`: Main application logic and state management
- `src/App.css`: Application styling

