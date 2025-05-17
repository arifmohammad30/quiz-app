import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswerSelect: (option: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, onAnswerSelect }) => {
  return (
    <div className="question-card">
      <h2>{question}</h2>
      <div className="options">
        {options.map((opt, idx) => (
          <button key={idx} onClick={() => onAnswerSelect(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
