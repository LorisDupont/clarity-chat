
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuestionType } from '@/context/CoursesContext';
import { sendQuestion } from '@/services/aiService';

interface ChatInputProps {
  onSendMessage: (message: string, type: QuestionType, options?: string[], correctAnswer?: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<QuestionType>('regular');
  
  // For quiz type
  const [options, setOptions] = useState<string[]>(['', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);

  const handleSend = () => {
    if (messageType === 'regular') {
      if (message.trim()) {
        onSendMessage(message, 'regular');
        sendQuestion(message)
        setMessage('');
      }
    } else {
      // Handle quiz
      const nonEmptyOptions = options.filter(opt => opt.trim());
      if (message.trim() && nonEmptyOptions.length >= 2) {
        onSendMessage(
          message, 
          'quiz', 
          nonEmptyOptions,
          nonEmptyOptions[correctAnswerIndex]
        );
        setMessage('');
        setOptions(['', '', '']);
        setCorrectAnswerIndex(0);
      }
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="border-t p-3">
      <Tabs defaultValue="regular" onValueChange={(value) => setMessageType(value as QuestionType)}>
        <TabsList className="grid w-full grid-cols-2 mb-3">
          <TabsTrigger value="regular">Question/Réponse</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="regular">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Posez votre question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend}>Envoyer</Button>
          </div>
        </TabsContent>

        <TabsContent value="quiz">
          <div className="space-y-3">
            <Input
              placeholder="Question du quiz"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full"
            />
            
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant={correctAnswerIndex === index ? "default" : "outline"}
                    onClick={() => setCorrectAnswerIndex(index)}
                    className={correctAnswerIndex === index ? "bg-green-500 hover:bg-green-600" : ""}
                    size="sm"
                  >
                    {correctAnswerIndex === index ? "Correct" : "Set correct"}
                  </Button>
                </div>
              ))}
            </div>
            
            <Button onClick={handleSend} className="w-full">Envoyer le quiz</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatInput;
