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
    return this.client.query(q.Get(q.Match(q.Index(Indexes.UserSubmit), word)));
  }

  submit(word: string) {
    this.client.query(
      q.Create(q.Collection(Collections.UserSubmit), {
        data: {
          word: word,
          count: 1,
        },
      }),
    );
  }
}
