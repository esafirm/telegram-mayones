import * as FaundaDb from 'faunadb';
import { User } from 'telegraf/typings/telegram-types';
import { Indexes, Collections, FCollection, Room } from './types';

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

export async function getGameRoom(roomId: any): Promise<FCollection<Room>> {
  return new Promise(resolve => {
    client
      .query(q.Get(q.Match(q.Index(Indexes.RoomIdIndex), roomId)))
      .then(result => {
        resolve(result as FCollection<Room>);
      })
      .catch(() => {
        resolve(null);
      });
  });
}

export async function createGameRoom(id: any, user: User) {
  return client.query(
    q.Create(q.Collection(Collections.Room), {
      data: {
        roomId: id,
        active: false,
        players: [user],
      },
    }),
  );
}

export async function setPlayerToRoom(roomId: number, players: Array<User>) {
  return client.query(
    q.Update(
      q.Select('ref', q.Get(q.Match(q.Index(Indexes.RoomIdIndex), roomId))),
      {
        data: {
          players: players,
        },
      },
    ),
  );
}

export async function setGameRoomActive(roomId: number, isActive: boolean) {
  return client.query(
    q.Update(selectRoomById(roomId), {
      data: {
        active: isActive,
      },
    }),
  );
}

/* Queries */
/* ------------------------------------------ */

function selectRoomById(roomId: number) {
  return q.Select('ref', q.Get(q.Match(q.Index(Indexes.RoomIdIndex), roomId)));
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
