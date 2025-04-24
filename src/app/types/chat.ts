export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'interviewer';
  timestamp: Date;
}

export interface Question {
  id: number;
  content: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
