import { Context } from 'telegraf';

import {
  newUser as createUserIfNotExist,
  createGameRoom,
  getGameRoom,
  setPlayerToRoom,
} from '../stores';

import { User } from 'telegraf/typings/telegram-types';

export default async (ctx: Context) => {
  const from = ctx.from as User;
  const groupId = ctx.chat.id;

  await createUserIfNotExist(from);

  const room = await getGameRoom(groupId);

  if (room == null) {
    await createGameRoom(groupId, from);
  }

  if (room.data.active) {
    return ctx.reply('Sedang ada game yang berlangsung. Tungguin dlu ya ~');
  }

  const filtered = room.data.players.filter(p => p.id != from.id);
  const newPlayers = [...filtered, from];
  await setPlayerToRoom(groupId, newPlayers);

  return ctx.reply(createMessage(newPlayers));
};

function createMessage(players: Array<User>): string {
  const playerList = players.map(p => p.username).join('\n');

  return `DOTA siap dimulai. Pemain:
	${playerList}

	Klik /join untuk ikutan!
	`;
}
