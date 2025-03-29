
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ questions, onSelectQuestion }) => {
  if (!questions.length) return null;
  
  return (
    <div className="p-2 space-y-2">
      <div className="text-sm font-medium text-muted-foreground">Questions rapides:</div>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs rounded-full border-clarity-blue text-clarity-blue hover:bg-clarity-blue-light"
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
