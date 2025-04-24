import { useCallback, useState } from 'react';
import { Question } from '../types/chat';

export function useQuestions(initialQuestions: Question[]) {
  const [questions] = useState<Question[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
  }, [questions.length]);

  const previousQuestion = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const jumpToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length) {
        setCurrentIndex(index);
      }
    },
    [questions.length],
  );

  return {
    currentQuestion: questions[currentIndex],
    currentIndex,
    isFirst: currentIndex === 0,
    isLast: currentIndex === questions.length - 1,
    totalQuestions: questions.length,
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
  };
}
