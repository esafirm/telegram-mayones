import * as FaundaDb from 'faunadb';
import { User } from 'telegraf/typings/telegram-types';
import { Indexes, Collections, FCollection } from './types';

const client = new FaundaDb.Client({
  secret: process.env.FAUNA_TOKEN,
  timeout: 2000,
});
const q = FaundaDb.query;

export async function newUser(from: any): Promise<FCollection<User>> | null {
  const isExist = await client.query(
    q.Exists(q.Match(q.Index(Indexes.UserIdIndex), from.id)),
  );
  if (isExist) return Promise.resolve(null);

  return client.query(q.Create(q.Collection(Collections.User), { data: from }));
}

/* New Format */
/* ------------------------------------------ */

import ScoreStore from './score_store';
export const scoreStore = new ScoreStore(client);

import { ConfigStore } from './config_store';
export const configStore = new ConfigStore(client);

import { UserSubmitStore } from './user_submit';
export const userSubmitStore = new UserSubmitStore(client);

import QuestionStore from './question_store';
export const questionStore = new QuestionStore(client);

import SessionStore from './session_store';
export const sessionStore = new SessionStore(client);

import RoomStore from './room_store';
export const roomStore = new RoomStore(client);
