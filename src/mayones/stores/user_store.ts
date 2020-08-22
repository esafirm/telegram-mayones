import * as FaundaDb from 'faunadb';
import { Indexes, FCollection, Collections } from './types';
import { FQL } from './common_store';
import { User } from 'telegraf/typings/telegram-types';

export default class UserStore {
  client: FaundaDb.Client;

  constructor(client: FaundaDb.Client) {
    this.client = client;
  }

  async createUser(from: any): Promise<FCollection<User>> | null {
    const isExist = await this.client.query(
      FQL.exist(Indexes.UserIdIndex, from.id),
    );
    if (isExist) return Promise.resolve(null);

    return this.client.query(
      FQL.create(Collections.UserSubmit, { data: from }),
    );
  }
}
