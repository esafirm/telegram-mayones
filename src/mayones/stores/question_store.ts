import * as FaundaDb from 'faunadb';
import {
  Indexes,
  Collections,
  QuizSession,
  SimpleQuiz,
  FCollection,
  Quiz,
} from './types';
import { sessionId } from '../actions/common/utils';
import { FQL } from './comon_store';

export default class QuestionStore {
  client: FaundaDb.Client;

  constructor(client: FaundaDb.Client) {
    this.client = client;
  }

  async createQuestion(session: QuizSession, simpleQuiz: SimpleQuiz) {
    return this.client.query(
      FQL.create(Collections.Quiz, {
        data: {
          sessionId: sessionId(session),
          ...simpleQuiz,
        },
      }),
    );
  }

  async findQuestion(session: QuizSession): Promise<FCollection<Quiz>> {
    return this.findQuestionBySessionId(sessionId(session));
  }

  async findQuestionBySessionId(sessionId: string): Promise<FCollection<Quiz>> {
    return this.client.query(FQL.find(Indexes.LastQuestionIndex, sessionId));
  }
}
