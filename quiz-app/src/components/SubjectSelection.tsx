import React from 'react';
import type { SubjectType } from '../data/questions';

interface SubjectSelectionProps {
  subjects: SubjectType[];
  playerName: string;
  onSubjectSelect: (subjectId: string) => void;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({ 
  subjects, 
  playerName, 
  onSubjectSelect 
}) => {
  return (
    <div className="subject-selection">
      <h1 className="welcome-title">Hello, {playerName}!</h1>
      <p className="welcome-subtitle">Choose a subject to start your quiz</p>
      
      <div className="subjects-container">
        {subjects.map((subject) => (
          <div 
            key={subject.id} 
            className="subject-card"
            onClick={() => onSubjectSelect(subject.id)}
          >
            <div className="subject-icon">{subject.icon}</div>
            <h2 className="subject-name">{subject.name}</h2>
            <p className="subject-description">{subject.description}</p>
            <span className="question-count">{subject.questions.length} questions</span>
            <button className="select-subject-btn">Start Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelection; 