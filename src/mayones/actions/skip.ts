import { Context } from 'telegraf';
import { getLastQuestion, getLastSession } from '../stores';
import { goToNextQuiz } from './common/quiz';

export default async (ctx: Context) => {
  const { chat } = ctx;
  const groupId = chat.id;

  const lastQuestion = await getLastQuestion(groupId);
  ctx.replyWithMarkdown(`Jawabannya adalah: *${lastQuestion.data.answer}*`);

  const lastSession = await getLastSession(groupId);
  return goToNextQuiz(ctx, lastSession.data);
};
