import React, { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import questions from './data/questions';
import './App.css';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 seconds per question
  const [answers, setAnswers] = useState<string[]>([]);

  // Timer countdown for each question
  useEffect(() => {
    if (!showScore && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showScore) {
      handleAnswerTimeout();
    }
  }, [timeLeft, showScore]);

  // Reset timer when moving to next question
  useEffect(() => {
    setTimeLeft(30);
  }, [currentIndex]);

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
    }
  };

  const handleRetry = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowScore(false);
    setAnswers([]);
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

  return (
    <div className="app-container">
      <header className="quiz-header">
        <h1>Knowledge Quiz</h1>
      </header>
      
      {!showScore ? (
        <>
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
      ) : (
        <div className="score-section">
          <h2>Quiz Completed!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-percentage">{calculatePercentage()}%</span>
              <span className="score-text">Score</span>
            </div>
          </div>
          <p className="score-message">{getScoreMessage()}</p>
          <p>You got {score} out of {questions.length} questions correct</p>
          
          <div className="answer-review">
            <h3>Review Your Answers</h3>
            {questions.map((q, index) => (
              <div key={index} className={`review-item ${answers[index] === q.answer ? 'correct' : 'incorrect'}`}>
                <p className="review-question">{index + 1}. {q.question}</p>
                <p className="review-answer">
                  Your answer: {answers[index] || "No answer"} 
                  {answers[index] !== q.answer && <span> | Correct answer: {q.answer}</span>}
                </p>
              </div>
            ))}
          </div>
          
          <button className="retry-button" onClick={handleRetry}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
