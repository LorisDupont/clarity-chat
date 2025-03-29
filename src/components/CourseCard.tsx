
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Course } from '@/context/CoursesContext';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  isActive?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, isActive = false }) => {
  const lastMessage = course.messages[course.messages.length - 1];
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isActive 
          ? 'border-clarity-blue border-2' 
          : 'border-border'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-base">{course.title}</h3>
            <p className="text-sm text-muted-foreground">{course.instructor}</p>
          </div>
          <div className="w-2 h-2 bg-clarity-orange rounded-full mt-1"></div>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
          {lastMessage.content}
        </p>
        
        <div className="mt-2 text-xs text-muted-foreground">
          {new Date(lastMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
