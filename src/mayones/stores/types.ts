import { User } from 'telegraf/typings/telegram-types';

export const Indexes = {
  UserIdIndex: 'UserIdIndex',
  RoomIdIndex: 'RoomIdIndex',
  LastSessionIndex: 'SessionIndex',
  LastQuestionIndex: 'QuestionIndex',
  ScoreIndex: 'ScoreIndex',
};

export const Collections = {
  User: 'user',
  Room: 'room',
  Session: 'session',
  Quiz: 'question',
  Score: 'score',
};

export type FCollection<T> = {
  ref: any;
  ts: number;
  data: T;
};

export type Room = {
  roomId: number;
  active: boolean;
  players: Array<User>;
};

export type QuizSession = {
  roomId: number;
  session: number;
};

export type Quiz = {
  sessionId: number;
  question: string;
  answer: string;
};

export type SimpleQuiz = {
  question: string;
  answer: string;
};

export type Score = {
  sessionId: number
  scores: Map<string, number>;
};
