import { Context } from 'telegraf';

import {
  newUser as createUserIfNotExist,
  createGameRoom,
  getGameRoom,
  Room,
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

  return ctx.reply(createMessage(room.data));
};

function createMessage(room: Room): string {
  const playerList = room.players.map(p => p.username).join('\n');

  return `DOTA siap dimulai. Pemain:
	${playerList}

	Klik /join untuk ikutan!
	`;
}
