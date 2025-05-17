import React, { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import WelcomeScreen from './components/WelcomeScreen';
import SubjectSelection from './components/SubjectSelection';
import { subjects } from './data/questions';
import type { Question } from './data/questions';
import './App.css';

// Define the possible app states
type AppState = 'welcome' | 'subject-selection' | 'quiz' | 'results';

const App: React.FC = () => {
  // App state management
  const [appState, setAppState] = useState<AppState>('welcome');
  const [playerName, setPlayerName] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  // Quiz state management
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 seconds per question
  const [answers, setAnswers] = useState<string[]>([]);

  // Get the questions based on selected subject
  const getQuestions = (): Question[] => {
    const subject = subjects.find(s => s.id === selectedSubject);
    return subject ? subject.questions : subjects[0].questions;
  };

  const questions = getQuestions();

  // Timer countdown for each question
  useEffect(() => {
    if (appState === 'quiz' && !showScore && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showScore && appState === 'quiz') {
      handleAnswerTimeout();
    }
  }, [timeLeft, showScore, appState]);

  // Reset timer when moving to next question
  useEffect(() => {
    setTimeLeft(30);
  }, [currentIndex]);

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setAppState('subject-selection');
  };

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    resetQuiz();
    setAppState('quiz');
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowScore(false);
    setAnswers([]);
    setTimeLeft(30);
  };

  const handleAnswerTimeout = () => {
    // Record an empty answer when time runs out
    const newAnswers = [...answers];
    newAnswers[currentIndex] = "";
    setAnswers(newAnswers);
    
    // Move to next question
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowScore(true);
      setAppState('results');
    }
  };

  const handleAnswerSelect = (selectedOption: string) => {
    // Record the answer
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedOption;
    setAnswers(newAnswers);
    
    // Update score if correct
    if (selectedOption === questions[currentIndex].answer) {
      setScore(score + 1);
    }

    // Move to next question or show final score
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowScore(true);
      setAppState('results');
    }
  };

  const handleRetry = () => {
    resetQuiz();
    setAppState('subject-selection');
  };

  const handleNewQuiz = () => {
    setAppState('subject-selection');
  };

  const calculatePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = calculatePercentage();
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Good job!";
    if (percentage >= 40) return "Not bad!";
    return "Keep practicing!";
  };

  const renderContent = () => {
    switch (appState) {
      case 'welcome':
        return <WelcomeScreen onNameSubmit={handleNameSubmit} />;
      
      case 'subject-selection':
        return (
          <SubjectSelection 
            subjects={subjects} 
            playerName={playerName} 
            onSubjectSelect={handleSubjectSelect} 
          />
        );
      
      case 'quiz':
        return (
          <>
            <div className="player-info">
              <span>Player: {playerName}</span>
              <span>Subject: {subjects.find(s => s.id === selectedSubject)?.name}</span>
            </div>

            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(currentIndex / questions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="timer-container">
              <div className="timer">
                <span className={timeLeft <= 10 ? 'timer-low' : ''}>
                  Time remaining: {timeLeft}s
                </span>
              </div>
            </div>
            
            <QuestionCard
              question={questions[currentIndex].question}
              options={questions[currentIndex].options}
              currentQuestion={currentIndex}
              totalQuestions={questions.length}
              onAnswerSelect={handleAnswerSelect}
            />
          </>
        );
      
      case 'results':
        return (
          <div className="score-section">
            <h2>Quiz Completed!</h2>
            <p className="player-result">{playerName}'s Result</p>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-percentage">{calculatePercentage()}%</span>
                <span className="score-text">Score</span>
              </div>
            </div>
            <p className="score-message">{getScoreMessage()}</p>
            <p>You got {score} out of {questions.length} questions correct</p>
            
            <h3 className="review-heading">Review Your Answers</h3>
            <div className="answer-review">
              {questions.map((q, index) => {
                const isCorrect = answers[index] === q.answer;
                return (
                  <div key={index} className={`review-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <p className="review-question">{index + 1}. {q.question}</p>
                    <div className="review-answer">
                      <strong>Your answer:</strong> 
                      <span className={isCorrect ? 'correct-answer' : ''}>
                        {answers[index] || "No answer"}
                      </span>
                      
                      {!isCorrect && (
                        <>
                          <strong>Correct answer:</strong>
                          <span className="correct-answer">{q.answer}</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="action-buttons">
              <button className="retry-button" onClick={handleRetry}>Try Another Subject</button>
              <button className="new-quiz-button" onClick={() => resetQuiz()}>Retry This Quiz</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <header className="quiz-header">
        <h1>Knowledge Quiz</h1>
      </header>
      
      {renderContent()}
    </div>
  );
};

export default App;
