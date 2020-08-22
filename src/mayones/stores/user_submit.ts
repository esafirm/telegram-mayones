import * as FaundaDb from 'faunadb';
import { Indexes, FCollection, Collections } from './types';
import { FQL } from './common_store';
import { Promisify } from '../actions/common/utils';

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
    return Promisify.ignoreError(
      this.client.query(FQL.find(Indexes.UserSubmit, word)),
    );
  }

  private createUserSubmit(word: string) {
    this.client.query(
      FQL.create(Collections.UserSubmit, {
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
      FQL.updateBy(
        {
          index: Indexes.UserSubmit,
          match: currentSubmit.word,
        },
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
