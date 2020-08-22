import * as FaundaDb from 'faunadb';
import { User } from 'telegraf/typings/telegram-types';
import { Indexes, Collections, FCollection, Score, QuizSession } from './types';
import { sessionId } from '../actions/common/utils';
import { FQL } from './comon_store';

export default class ScoreStore {
  client: FaundaDb.Client;

  constructor(client: FaundaDb.Client) {
    this.client = client;
  }

  findScore(sessionId: string): Promise<FCollection<Score> | null> {
    return new Promise(resolve => {
      this.client
        .query(FQL.find(Indexes.ScoreIndex, sessionId))
        .then(res => {
          resolve(res as FCollection<Score>);
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  createScore(sessionId: string): Promise<FCollection<Score>> {
    return this.client.query(
      FQL.create(Collections.Score, {
        data: {
          sessionId: sessionId,
          scores: {},
        } as Score,
      }),
    );
  }

  async findOrCreateScore(sessionId: string): Promise<FCollection<Score>> {
    const currentScore = await this.findScore(sessionId);
    if (currentScore == null) {
      return await this.createScore(sessionId);
    }
    return currentScore;
  }

  async giveScore(from: User, session: QuizSession) {
    const currentScore = await this.findOrCreateScore(sessionId(session));
    const currentPlayerScore = currentScore.data.scores[from.username];
    const newPlayerScore = currentPlayerScore ? currentPlayerScore + 1 : 1;

    const newScore = {
      ...currentScore.data,
      scores: {
        ...currentScore.data.scores,
        [from.username]: newPlayerScore,
      },
    };

    return this.client.query(
      FQL.updateBy(
        {
          index: Indexes.ScoreIndex,
          match: sessionId(session),
        },
        {
          data: newScore,
        },
      ),
    );
  }
}
