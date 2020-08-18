import { Context } from 'telegraf';
import {
  getGameRoom,
  getLastQuestion,
  getLastSession,
  scoreStore,
} from '../stores';
import { goToNextQuiz } from './common/quiz';

function logAnswer(log: string) {
  console.log(`Answer mode => ${log}`);
}

async function processRightAnswer(ctx: Context, groupId: number) {
  ctx.reply('Yes jawaban kamu benar');

  const lastSession = await getLastSession(groupId);
  await scoreStore.giveScore(ctx.from, lastSession.data);

  return goToNextQuiz(ctx, lastSession.data);
}

async function processWrongAnswer(ctx: Context) {
  return ctx.reply('Jawaban kamu masih salah tuh!');
}

export default async (ctx: Context) => {
  const { chat } = ctx;
  const groupId = chat.id;
  const answer = ctx.message.text;

  if (answer.includes('/') || answer.includes('@')) {
    logAnswer('Answer should not be handled here');
    return Promise.resolve();
  }

  const room = await getGameRoom(groupId);

  if (!room.data.active) {
    logAnswer('Game sedang tidak aktif');
    return Promise.resolve();
  } else {
    logAnswer(`Menjawab ${answer}`);
  }

  const lastQuestion = await getLastQuestion(groupId);
  if (lastQuestion.data.answer === answer.trim().toUpperCase()) {
    return processRightAnswer(ctx, groupId);
  }
  return processWrongAnswer(ctx);
};
