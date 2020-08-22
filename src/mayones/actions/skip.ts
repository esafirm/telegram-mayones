import { Context } from 'telegraf';
import { goToNextQuiz, getLastQuestion } from './common/common_quiz';
import { sessionStore } from '../stores';

export default async (ctx: Context) => {
  const { chat } = ctx;
  const groupId = chat.id;

  const lastQuestion = await getLastQuestion(groupId);
  ctx.replyWithMarkdown(`Jawabannya adalah: *${lastQuestion.data.answer}*`);

  const lastSession = await sessionStore.findSessionByGroupId(groupId);
  return goToNextQuiz(ctx, lastSession.data);
};
