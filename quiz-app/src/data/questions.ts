import generalKnowledgeQuestions from './generalKnowledge';
import scienceQuestions from './scienceQuestions';
import historyQuestions from './historyQuestions';

export interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  
export interface SubjectType {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  icon: string;
}

export const subjects: SubjectType[] = [
  {
    id: 'general',
    name: 'General Knowledge',
    description: 'Test your knowledge on various general topics',
    questions: generalKnowledgeQuestions,
    icon: '🧠'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Challenge yourself with questions about physics, chemistry, and biology',
    questions: scienceQuestions,
    icon: '🔬'
  },
  {
    id: 'history',
    name: 'History',
    description: 'Explore the past with questions about important historical events',
    questions: historyQuestions,
    icon: '📜'
  }
];

// Default export is the first subject's questions (for backwards compatibility)
export default generalKnowledgeQuestions;
  