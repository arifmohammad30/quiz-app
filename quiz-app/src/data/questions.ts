export interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  
  const questions: Question[] = [
    {
      question: "What is the capital of India?",
      options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
      answer: "New Delhi"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Saturn", "Mars", "Jupiter"],
      answer: "Mars"
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
      answer: "William Shakespeare"
    }
  ];
  
  export default questions;
  