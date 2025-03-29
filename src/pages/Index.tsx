
import React, { useState, useRef, useEffect } from 'react';
import { useCourses, Course } from '@/context/CoursesContext';
import CourseCard from '@/components/CourseCard';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import QuickQuestions from '@/components/QuickQuestions';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const { courses, activeCourse, setActiveCourse, sendMessage, getQuickQuestions } = useCourses();
  const [showCoursesList, setShowCoursesList] = useState(true);
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Switch to messages view when a course is selected on mobile
  useEffect(() => {
    if (isMobile && activeCourse) {
      setShowCoursesList(false);
    }
  }, [activeCourse, isMobile]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeCourse?.messages]);

  const handleCourseSelect = (course: Course) => {
    setActiveCourse(course);
  };

  const handleSendMessage = (message: string, type: "regular" | "quiz", options?: string[], correctAnswer?: string) => {
    if (activeCourse) {
      sendMessage(activeCourse.id, message, type, options, correctAnswer);
    }
  };

  const handleQuickQuestionSelect = (question: string) => {
    if (activeCourse) {
      sendMessage(activeCourse.id, question);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Courses sidebar (hidden on mobile when viewing messages) */}
      {(!isMobile || showCoursesList) && (
        <div className="lg:w-80 border-r bg-muted/30 overflow-y-auto p-4">
          <h2 className="font-semibold mb-4">Mes cours</h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => handleCourseSelect(course)}
                isActive={activeCourse?.id === course.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chat area (hidden on mobile when viewing courses list) */}
      {(!isMobile || !showCoursesList) && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeCourse ? (
            <>
              {/* Chat header */}
              <div className="border-b p-4 flex items-center justify-between">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowCoursesList(true)}
                  >
                    Retour
                  </Button>
                )}
                <div>
                  <h2 className="font-medium">{activeCourse.title}</h2>
                  <p className="text-sm text-muted-foreground">{activeCourse.instructor}</p>
                </div>
                <div className="w-8"></div> {/* Spacer for alignment */}
              </div>

              {/* Messages container */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeCourse.messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick questions */}
              <QuickQuestions 
                questions={getQuickQuestions(activeCourse.id)}
                onSelectQuestion={handleQuickQuestionSelect}
              />

              {/* Chat input */}
              <ChatInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-20 h-20 rounded-full bg-clarity-blue-light flex items-center justify-center mb-4">
                <ArrowUp className="text-clarity-blue-dark" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-2">Sélectionnez un cours</h3>
              <p className="text-muted-foreground max-w-md">
                Choisissez un cours dans la liste pour poser vos questions et accéder aux ressources.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
