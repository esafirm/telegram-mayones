import { Context } from 'telegraf';
import { setGameRoomActive } from '../stores';

export default async (ctx: Context) => {
  const { chat } = ctx;
  const groupId = chat.id;

  await setGameRoomActive(groupId, false);

  return ctx.replyWithMarkdown('*GAME OVER*');
};
