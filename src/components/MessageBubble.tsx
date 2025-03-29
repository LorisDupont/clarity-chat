
import React from 'react';
import { Message } from '@/context/CoursesContext';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const timeString = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Quiz-specific rendering
  if (message.questionType === 'quiz' && message.options && message.options.length > 0) {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser 
            ? 'bg-clarity-orange text-white rounded-tr-none' 
            : 'bg-white border border-border rounded-tl-none'
        }`}>
          <div className="font-medium mb-2">{message.content}</div>
          
          {message.options.map((option, index) => (
            <div 
              key={index}
              className={`p-2 my-1 rounded border ${
                message.sender === 'system' && message.correctAnswer === option
                  ? 'bg-green-100 border-green-500'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              {option}
            </div>
          ))}
          
          <div className="text-xs mt-1 opacity-70">
            {timeString}
          </div>
        </div>
      </div>
    );
  }
  
  // Regular message rendering
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
        isUser 
          ? 'bg-clarity-orange text-white rounded-tr-none' 
          : 'bg-white border border-border rounded-tl-none'
      }`}>
        <div>{message.content}</div>
        <div className="text-xs mt-1 opacity-70">
          {timeString}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
