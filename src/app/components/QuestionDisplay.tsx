'use client';

import { useState } from 'react';
import { Question } from '../types/chat';
import Timer from './Timer';

// Mock questions data - in real app, this would come from an API
const mockQuestions: Question[] = [
  {
    id: 1,
    content: "Can you explain the difference between 'let', 'const', and 'var' in JavaScript?",
    category: 'JavaScript',
    difficulty: 'easy',
  },
  {
    id: 2,
    content: 'What is the Virtual DOM in React and how does it work?',
    category: 'React',
    difficulty: 'medium',
  },
  // Add more questions as needed
];

export default function QuestionDisplay() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowHint(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowHint(false);
    }
  };

  const handleStartInterview = () => {
    setIsInterviewStarted(true);
    setIsInterviewEnded(false);
    setCurrentQuestionIndex(0);
  };

  const handleEndInterview = () => {
    setIsInterviewStarted(false);
    setIsInterviewEnded(true);
  };

  const currentQuestion = mockQuestions[currentQuestionIndex];

  return (
    <div className='space-y-4'>
      {/* Interview Controls */}
      <div className='flex items-center justify-between rounded-lg bg-gray-800 p-4'>
        <div className='flex items-center space-x-4'>
          {!isInterviewStarted ? (
            <button
              onClick={handleStartInterview}
              className='rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700'
            >
              Start Interview
            </button>
          ) : (
            <button
              onClick={handleEndInterview}
              className='rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700'
            >
              End Interview
            </button>
          )}
        </div>
        <Timer isRunning={isInterviewStarted} />
      </div>

      {/* Question Display */}
      <div className='w-full max-w-2xl rounded-lg bg-gray-800 p-6 shadow-lg'>
        {isInterviewStarted ? (
          <>
            <div className='mb-6'>
              <div className='mb-4 flex items-center justify-between'>
                <span className='text-gray-400'>
                  Question {currentQuestionIndex + 1} of {mockQuestions.length}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    currentQuestion.difficulty === 'easy'
                      ? 'bg-green-600'
                      : currentQuestion.difficulty === 'medium'
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                  }`}
                >
                  {currentQuestion.difficulty}
                </span>
              </div>

              <h3 className='mb-2 text-xl font-semibold text-white'>{currentQuestion.content}</h3>

              <div className='text-sm text-gray-400'>Category: {currentQuestion.category}</div>
            </div>

            <div className='flex items-center justify-between'>
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`rounded-lg px-4 py-2 ${
                  currentQuestionIndex === 0 ? 'cursor-not-allowed bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                Previous
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === mockQuestions.length - 1}
                className={`rounded-lg px-4 py-2 ${
                  currentQuestionIndex === mockQuestions.length - 1
                    ? 'cursor-not-allowed bg-gray-600'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className='py-8 text-center text-white'>
            {isInterviewEnded ? (
              <p className='text-xl'>Interview Ended</p>
            ) : (
              <p className='text-xl'>Click Start Interview to begin</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
