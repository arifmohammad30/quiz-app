import React, { useState } from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  currentQuestion: number;
  totalQuestions: number;
  onAnswerSelect: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  options, 
  currentQuestion,
  totalQuestions, 
  onAnswerSelect 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    
    // Add a small delay before moving to next question for better UX
    setTimeout(() => {
      onAnswerSelect(option);
      setSelectedOption(null); // Reset selection for next question
    }, 300);
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">Question {currentQuestion + 1}/{totalQuestions}</span>
      </div>
      <h2>{question}</h2>
      <div className="options-container">
        {options.map((opt, idx) => (
          <button 
            key={idx} 
            className={`option-button ${selectedOption === opt ? 'selected' : ''}`}
            onClick={() => handleOptionClick(opt)}
            disabled={selectedOption !== null}
          >
            <span className="option-letter">{String.fromCharCode(65 + idx)}.</span> {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
