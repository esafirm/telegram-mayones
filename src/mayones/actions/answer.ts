import { Context } from 'telegraf';
import { getGameRoom, getLastQuestion } from '../stores';

export default async (ctx: Context) => {
  const { chat } = ctx;
  const groupId = chat.id;
  const answer = ctx.message.text;

  const room = await getGameRoom(groupId);

  if (!room.data.active) {
    return Promise.resolve();
  }

  const lastQuestion = await getLastQuestion(groupId);
  if (lastQuestion.data.answer === answer) {
    ctx.reply('Yes jawaban kamu benar');
  }
  return ctx.reply('Jawaban kamu masih salah tuh!');
};
