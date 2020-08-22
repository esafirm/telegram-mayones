import * as FaundaDb from 'faunadb';
import {
  Indexes,
  FCollection,
  QuizSession,
  GameType,
  Collections,
} from './types';

const q = FaundaDb.query;

export default class SessionStore {
  client: FaundaDb.Client;

  constructor(client: FaundaDb.Client) {
    this.client = client;
  }

  async findSessionByGroupId(
    groupId: number,
  ): Promise<FCollection<QuizSession>> {
    return this.client.query(
      q.Get(q.Match(q.Index(Indexes.LastSessionIndex), groupId)),
    );
  }

  async createSession(
    roomId: number,
    gameType: GameType,
  ): Promise<FCollection<QuizSession>> {
    return this.client.query(
      q.Create(q.Collection(Collections.Session), {
        data: {
          roomId: roomId,
          session: Date.now(),
          gameType: gameType,
        },
      }),
    );
  }
}
