import * as FaundaDb from 'faunadb';
import { Indexes, FCollection } from './types';
import { FQL } from './common_store';

export type Configuration = {
  level: number;
  levelDesc: Map<
    string,
    {
      lenght: number;
    }
  >;
};

export class ConfigStore {
  client: FaundaDb.Client;

  constructor(client: FaundaDb.Client) {
    this.client = client;
  }

  getConfiguration(): Promise<FCollection<Configuration>> {
    return this.client.query(FQL.findFirst(Indexes.Configuration));
  }
}
