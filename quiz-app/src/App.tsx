import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import questions from './data/questions';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

  const handleAnswerSelect = (selectedOption: string) => {
    if (selectedOption === questions[currentIndex].answer) {
      setScore(score + 1);
    }

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
  };

  return (
    <div className="app-container" style={{ maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
      {!showScore ? (
        <QuestionCard
          question={questions[currentIndex].question}
          options={questions[currentIndex].options}
          onAnswerSelect={handleAnswerSelect}
        />
      ) : (
        <div>
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={handleRetry}>Retry Quiz</button>
        </div>
      )}
    </div>
  );
};

export default App;
