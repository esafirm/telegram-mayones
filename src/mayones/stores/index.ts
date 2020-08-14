import * as FaundaDb from 'faunadb';
import { User } from 'telegraf/typings/telegram-types';

const Indexes = {
  UserIdIndex: 'UserIdIndex',
  RoomIdIndex: 'RoomIdIndex',
};

const Collections = {
  User: 'user',
  Room: 'room',
};

type FCollection<T> = {
  ref: any;
  ts: number;
  data: T;
};

export type Room = {
  roomId: number;
  active: boolean;
  players: Array<User>;
};

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

export async function addPlayerToRoom(roomId: number, playerRef: any) {
  return client.query(
    q.Update(
      q.Select('ref', q.Get(q.Match(q.Index(Indexes.RoomIdIndex), roomId))),
      {
        data: {
          players: playerRef,
        },
      },
    ),
  );
}
