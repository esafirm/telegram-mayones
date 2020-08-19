import * as FaundaDb from 'faunadb';
import { Indexes, FCollection, Collections } from './types';

const q = FaundaDb.query;

export type UserSubmit = {
  word: string;
  count: number;
};

export class UserSubmitStore {
  client: FaundaDb.Client;

  constructor(client: FaundaDb.Client) {
    this.client = client;
  }

  getUserSubmit(word: string): Promise<FCollection<UserSubmit>> {
    return new Promise(resolve => {
      this.client
        .query(q.Get(q.Match(q.Index(Indexes.UserSubmit), word)))
        .then(res => resolve(res as FCollection<UserSubmit>))
        .catch(() => resolve(null));
    });
  }

  private createUserSubmit(word: string) {
    this.client.query(
      q.Create(q.Collection(Collections.UserSubmit), {
        data: {
          word: word,
          count: 1,
        },
      }),
    );
  }

  private addCountForUserSubmit(currentSubmit: UserSubmit) {
    const newData = {
      ...currentSubmit,
      count: currentSubmit.count + 1,
    };
    this.client.query(
      q.Update(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index(Indexes.ScoreIndex), currentSubmit.word)),
        ),
        {
          data: newData,
        },
      ),
    );
  }

  async submit(word: string) {
    const currentSubmit = await this.getUserSubmit(word);
    if (currentSubmit) {
      this.addCountForUserSubmit(currentSubmit.data);
    } else {
      this.createUserSubmit(word);
    }
  }
}
