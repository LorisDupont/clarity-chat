import React, { createContext, useContext, useState } from 'react';
import { sendQuestion, sendQuiz } from '@/services/aiService';

export type QuestionType = 'regular' | 'quiz';

export interface Message {
  id: string;
  sender: 'user' | 'system';
  content: string;
  timestamp: Date;
  questionType?: QuestionType;
  options?: string[];
  correctAnswer?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  messages: Message[];
  materials: {
    id: string;
    title: string;
    type: 'pdf' | 'video';
    url: string;
    date: Date;
  }[];
}

interface CoursesContextType {
  courses: Course[];
  activeCourse: Course | null;
  setActiveCourse: (course: Course | null) => void;
  sendMessage: (courseId: string, content: string, questionType?: QuestionType, options?: string[], correctAnswer?: string) => void;
  getQuickQuestions: (courseId: string) => string[];
}

// Mock data
const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Mathématiques',
    description: 'Algèbre et géométrie',
    instructor: 'Prof. Thomas Bernard',
    messages: [
      {
        id: '1',
        sender: 'system',
        content: 'Bienvenue dans le cours de Mathématiques. Comment puis-je vous aider?',
        timestamp: new Date('2023-05-10T10:00:00')
      }
    ],
    materials: [
      {
        id: '100',
        title: 'Introduction à l\'algèbre',
        type: 'pdf',
        url: '/mocks/sample.pdf',
        date: new Date('2023-05-09')
      }
    ]
  },
  {
    id: '2',
    title: 'Physique',
    description: 'Mécanique et électricité',
    instructor: 'Dr. Marie Leroy',
    messages: [
      {
        id: '1',
        sender: 'system',
        content: 'Bienvenue dans le cours de Physique. Comment puis-je vous aider?',
        timestamp: new Date('2023-05-10T10:00:00')
      }
    ],
    materials: [
      {
        id: '1',
        title: 'Lois de Newton',
        type: 'pdf',
        url: '/mocks/sample.pdf',
        date: new Date('2023-05-09')
      }
    ]
  },
  {
    id: '3',
    title: 'Histoire',
    description: 'Histoire moderne',
    instructor: 'Prof. Jean Dupont',
    messages: [
      {
        id: '1',
        sender: 'system',
        content: 'Bienvenue dans le cours d\'Histoire. Comment puis-je vous aider?',
        timestamp: new Date('2023-05-10T10:00:00')
      }
    ],
    materials: [
      {
        id: '1',
        title: 'La Révolution française',
        type: 'pdf',
        url: '/mocks/sample.pdf',
        date: new Date('2023-05-09')
      }
    ]
  }
];

// Quick questions by course
const QUICK_QUESTIONS: Record<string, string[]> = {
  '1': [
    'Comment résoudre une équation du second degré?',
    'Qu\'est-ce que le théorème de Pythagore?',
    'Comment calculer l\'aire d\'un cercle?'
  ],
  '2': [
    'Quelle est la première loi de Newton?',
    'Comment calculer la force électrostatique?',
    'Qu\'est-ce que l\'effet Doppler?'
  ],
  '3': [
    'Quand a eu lieu la Révolution française?',
    'Qui était Napoléon Bonaparte?',
    'Quelles ont été les causes de la Première Guerre mondiale?'
  ]
};

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  const sendMessage = async (
    courseId: string, 
    content: string, 
    questionType: QuestionType = 'regular', 
    options?: string[], 
    correctAnswer?: string
  ) => {
    // Create user message
    const newUserMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      content,
      timestamp: new Date(),
      questionType,
      options,
      correctAnswer
    };
    
    // Update state with user message first (for better UX)
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, messages: [...course.messages, newUserMessage] } 
          : course
      )
    );
    
    if (activeCourse?.id === courseId) {
      setActiveCourse(prevCourse => 
        prevCourse ? {
          ...prevCourse,
          messages: [...prevCourse.messages, newUserMessage]
        } : null
      );
    }
    
    try {
      // Send to API and get response
      let responseContent: string;
      
      if (questionType === 'quiz' && options) {
        responseContent = await sendQuiz(content, options, courseId);
      } else {
        responseContent = await sendQuestion(content);
      }
      
      // Create system response message
      const newSystemMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'system',
        content: responseContent,
        timestamp: new Date(),
        questionType
      };
      
      // Update state with system response
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === courseId 
            ? { ...course, messages: [...course.messages, newSystemMessage] } 
            : course
        )
      );
      
      if (activeCourse?.id === courseId) {
        setActiveCourse(prevCourse => 
          prevCourse ? {
            ...prevCourse,
            messages: [...prevCourse.messages, newSystemMessage]
          } : null
        );
      }
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'system',
        content: "Désolé, je n'ai pas pu obtenir une réponse. Veuillez réessayer plus tard.",
        timestamp: new Date(),
        questionType
      };
      
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === courseId 
            ? { ...course, messages: [...course.messages, errorMessage] } 
            : course
        )
      );
      
      if (activeCourse?.id === courseId) {
        setActiveCourse(prevCourse => 
          prevCourse ? {
            ...prevCourse,
            messages: [...prevCourse.messages, errorMessage]
          } : null
        );
      }
    }
  };

  const getQuickQuestions = (courseId: string): string[] => {
    return QUICK_QUESTIONS[courseId] || [];
  };

  return (
    <CoursesContext.Provider 
      value={{ 
        courses, 
        activeCourse, 
        setActiveCourse,
        sendMessage,
        getQuickQuestions
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  
  return context;
};
