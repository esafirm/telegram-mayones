import { Context } from 'telegraf';
import { roomStore } from '../stores';

export default async (ctx: Context) => {
  const { chat } = ctx;
  const groupId = chat.id;

  await roomStore.setGameRoomActive(groupId, false);

  return ctx.replyWithMarkdown('*GAME OVER*');
};
