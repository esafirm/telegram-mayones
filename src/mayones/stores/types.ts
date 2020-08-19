import { User } from 'telegraf/typings/telegram-types';

export const Indexes = {
  UserIdIndex: 'UserIdIndex',
  RoomIdIndex: 'RoomIdIndex',
  LastSessionIndex: 'SessionIndex',
  LastQuestionIndex: 'QuestionIndex',
  ScoreIndex: 'ScoreIndex',
  Configuration: 'ConfigurationIndex',
  UserSubmit: 'UserSubmitIndex'
};

export const Collections = {
  User: 'user',
  Room: 'room',
  Session: 'session',
  Quiz: 'question',
  Score: 'score',
  UserSubmit: 'user_submit'
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

export type GameType = 'SAMBUNG' | 'ANAGRAM';

export type QuizSession = {
  roomId: number;
  session: number;
  gameType: GameType;
};

export type Quiz = {
  sessionId: string;
  question: string;
  answer: string;
};

export type SimpleQuiz = {
  question: string;
  answer: string;
};

export type Score = {
  sessionId: string;
  scores: Map<string, number>;
};
