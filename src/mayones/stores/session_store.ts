import * as FaundaDb from 'faunadb';
import {
  Indexes,
  FCollection,
  QuizSession,
  GameType,
  Collections,
} from './types';
import { FQL } from './common_store';

export default class SessionStore {
  client: FaundaDb.Client;

  constructor(client: FaundaDb.Client) {
    this.client = client;
  }

  async findSessionByGroupId(
    groupId: number,
  ): Promise<FCollection<QuizSession>> {
    return this.client.query(FQL.find(Indexes.LastSessionIndex, groupId));
  }

  async createSession(
    roomId: number,
    gameType: GameType,
  ): Promise<FCollection<QuizSession>> {
    return this.client.query(
      FQL.create(Collections.Session, {
        data: {
          roomId: roomId,
          session: Date.now(),
          gameType: gameType,
        },
      }),
    );
  }
}
