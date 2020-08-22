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

const q = FaundaDb.query;

export default class QuestionStore {
  client: FaundaDb.Client;

  constructor(client: FaundaDb.Client) {
    this.client = client;
  }

  async createQuestion(session: QuizSession, simpleQuiz: SimpleQuiz) {
    return this.client.query(
      q.Create(q.Collection(Collections.Quiz), {
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
    return this.client.query(
      q.Get(q.Match(q.Index(Indexes.LastQuestionIndex), sessionId)),
    );
  }
}
