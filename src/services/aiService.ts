
import { QuestionType } from '@/context/CoursesContext';

interface AIResponse {
  content: string;
}

// Configuration de base pour les appels API
const API_URL = 'https://api.example.com/ai'; // À remplacer par l'URL réelle de l'API

// Service pour envoyer une question à l'API IA et obtenir une réponse
export const sendQuestion = async (question: string, courseId: string, questionType: QuestionType = 'regular'): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        courseId,
        questionType,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data: AIResponse = await response.json();
    return data.content;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la question:', error);
    return "Je suis désolé, je ne peux pas répondre à cette question pour le moment. Veuillez réessayer plus tard.";
  }
};

// Service pour envoyer un quiz à l'API IA et obtenir une réponse
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
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data: AIResponse = await response.json();
    return data.content;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du quiz:', error);
    return "Je suis désolé, je ne peux pas évaluer ce quiz pour le moment. Veuillez réessayer plus tard.";
  }
};
