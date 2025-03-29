
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ questions, onSelectQuestion }) => {
  if (!questions.length) return null;
  
  return (
    <div className="p-3 space-y-3 border-l-4 border-clarity-orange bg-gradient-to-r from-clarity-orange/20 to-transparent my-4 rounded-r-md">
      <div className="text-sm font-medium text-clarity-orange">Questions rapides:</div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs rounded-full bg-clarity-orange/10 border-clarity-orange text-clarity-orange hover:bg-clarity-orange hover:text-white transition-colors"
            onClick={() => onSelectQuestion(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickQuestions;
