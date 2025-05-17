import React, { useState } from 'react';

interface WelcomeScreenProps {
  onNameSubmit: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().length < 2) {
      setError('Please enter a valid name (at least 2 characters)');
      return;
    }
    
    onNameSubmit(name);
  };

  return (
    <div className="welcome-screen">
      <h1 className="welcome-title">Welcome to Quiz Master</h1>
      <p className="welcome-subtitle">Test your knowledge across various subjects</p>
      
      <div className="welcome-card">
        <h2>Let's Get Started!</h2>
        <p>Please enter your name to begin the quiz</p>
        
        <form onSubmit={handleSubmit} className="name-form">
          <div className="form-group">
            <label htmlFor="playerName">Your Name</label>
            <input
              type="text"
              id="playerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={error ? 'input-error' : ''}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          
          <button 
            type="submit" 
            className="start-button"
            disabled={name.trim().length === 0}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen; 