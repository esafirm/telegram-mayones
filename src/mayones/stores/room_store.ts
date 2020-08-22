import * as FaundaDb from 'faunadb';
import { Indexes, FCollection, Collections, Room } from './types';
import { FQL } from './common_store';
import { Promisify } from '../actions/common/utils';
import { User } from 'telegraf/typings/telegram-types';

export default class RoomStore {
  client: FaundaDb.Client;

  constructor(client: FaundaDb.Client) {
    this.client = client;
  }

  async getGameRoom(roomId: any): Promise<FCollection<Room>> {
    return Promisify.ignoreError(
      this.client.query(FQL.find(Indexes.RoomIdIndex, roomId)),
    );
  }

  async createGameRoom(id: any, user: User) {
    return this.client.query(
      FQL.create(Collections.Room, {
        data: {
          roomId: id,
          active: false,
          players: [user],
        },
      }),
    );
  }

  async setPlayerToRoom(roomId: number, players: Array<User>) {
    return this.client.query(
      FQL.updateBy(
        {
          index: Indexes.RoomIdIndex,
          match: roomId,
        },
        {
          data: {
            players: players,
          },
        },
      ),
    );
  }

  async setGameRoomActive(roomId: number, isActive: boolean) {
    return this.client.query(
      FQL.updateBy(
        {
          index: Indexes.RoomIdIndex,
          match: roomId,
        },
        {
          data: {
            active: isActive,
          },
        },
      ),
    );
  }
}
