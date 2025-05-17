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
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean"
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
      answer: "Oxygen"
    },
    {
      question: "In which year did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
      answer: "1945"
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      answer: "Blue Whale"
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Ringgit"],
      answer: "Yen"
    },
    {
      question: "Which programming language was developed by Microsoft?",
      options: ["Java", "Python", "C#", "PHP"],
      answer: "C#"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      answer: "Leonardo da Vinci"
    }
  ];
  
  export default questions;
  