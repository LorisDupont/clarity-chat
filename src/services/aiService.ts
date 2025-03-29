import { QuestionType } from '@/context/CoursesContext';

interface AIResponse {
  content: string;
}

// Configuration for the API endpoints
const API_URL = 'http://localhost:27015/ai'; // À remplacer par l'URL réelle de l'API

// Service for sending a question to the AI API and getting a response
export const sendQuestion = async (question: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "question": question
      }),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: string = await response.text();
    return data;
  } catch (error) {
    console.error('Error sending question:', error);
    return "Je suis désolé, je ne peux pas répondre à cette question pour le moment. Veuillez réessayer plus tard.";
  }
};

// Service for sending a quiz to the AI API and getting a response
export const sendQuiz = async (question: string, options: string[], courseId: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        options,
        courseId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: AIResponse = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error sending quiz:', error);
    return "Je suis désolé, je ne peux pas évaluer ce quiz pour le moment. Veuillez réessayer plus tard.";
  }
};
