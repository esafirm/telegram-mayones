import * as FaundaDb from 'faunadb';
import { User } from 'telegraf/typings/telegram-types';
import {
  Indexes,
  Collections,
  FCollection,
  Room,
  QuizSession,
  SimpleQuiz,
  AnagramQuiz,
  GameType,
  Quiz,
} from './types';
import { sessionId } from '../actions/common/utils';

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

export async function createSession(
  roomId: number,
  gameType: GameType,
): Promise<FCollection<QuizSession>> {
  return client.query(
    q.Create(q.Collection(Collections.Session), {
      data: {
        roomId: roomId,
        session: Date.now(),
        gameType: gameType,
      },
    }),
  );
}

export async function createQuestion(
  session: QuizSession,
  simpleQuiz: SimpleQuiz,
) {
  return client.query(
    q.Create(q.Collection(Collections.Quiz), {
      data: {
        sessionId: sessionId(session),
        ...simpleQuiz,
      },
    }),
  );
}

export function getLastSession(
  groupId: number,
): Promise<FCollection<QuizSession>> {
  return client.query(
    q.Get(q.Match(q.Index(Indexes.LastSessionIndex), groupId)),
  );
}

export async function getLastQuestion(
  groupId: number,
): Promise<FCollection<Quiz>> {
  console.log('Get last session for', groupId);

  const lastSession = await getLastSession(groupId);
  const sId = sessionId(lastSession.data);
  console.log('Get last question for', sId);
  return client.query(q.Get(q.Match(q.Index(Indexes.LastQuestionIndex), sId)));
}

/* Queries */
/* ------------------------------------------ */

function selectRoomById(roomId: number) {
  return q.Select('ref', q.Get(q.Match(q.Index(Indexes.RoomIdIndex), roomId)));
}

/* New Format */
/* ------------------------------------------ */

import ScoreStore from './score';
export const scoreStore = new ScoreStore(client);

import { ConfigStore } from './config';
export const configStore = new ConfigStore(client);

import { UserSubmitStore } from './user_submit';
export const userSubmitStore = new UserSubmitStore(client);
