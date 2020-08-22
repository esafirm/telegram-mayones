import { Context } from 'telegraf';
import { roomStore, userStore } from '../stores';
import { User } from 'telegraf/typings/telegram-types';

export default async (ctx: Context) => {
  const from = ctx.from as User;
  const groupId = ctx.chat.id;

  await userStore.createUser(from);

  const room = await roomStore.getGameRoom(groupId);

  if (room == null) {
    await roomStore.createGameRoom(groupId, from);
  }

  if (room.data.active) {
    return ctx.reply('Sedang ada game yang berlangsung. Tungguin dlu ya ~');
  }

  const filtered = room.data.players.filter(p => p.id != from.id);
  const newPlayers = [...filtered, from];
  await roomStore.setPlayerToRoom(groupId, newPlayers);

  return ctx.replyWithMarkdown(createMessage(newPlayers));
};

function createMessage(players: Array<User>): string {
  const playerList = players
    .map((p, index) => `*${index + 1}. ${p.first_name}* (@${p.username})`)
    .join('\n');

  return `DOTA siap dimulai. Pemain:\n${playerList}\nKlik /join untuk ikutan!`;
}
