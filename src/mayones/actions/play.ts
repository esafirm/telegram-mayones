import { Context } from 'telegraf';
import { getRandomWord } from '../words';
import {
  getGameRoom,
  setGameRoomActive,
  createSession,
  createQuestion,
  SimpleQuiz,
} from '../stores';

export default async (ctx: Context) => {
  const { chat } = ctx;
  const groupId = chat.id;

  const room = await getGameRoom(groupId);
  if (room.data.players.length < 2) {
    return ctx.reply('Game bisa dijalankan dengan minimal peserta 2 orang');
  }

  if (room.data.active) {
    return ctx.reply('Sedang ada sesi game yang aktif. Tunggu dulu ya ~');
  }

  await setGameRoomActive(groupId, true);
  const session = await createSession(groupId);

  const quiz = nextQuiz();
  await createQuestion(session.data, quiz);

  await ctx.reply('Game dimulai!');
  return ctx.replyWithMarkdown(`Ayo tebak ini kata apa? *${quiz.question}*`);
};

function shuffleWord(word: string) {
  return word
    .split('')
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .join('');
}

function nextQuiz(): SimpleQuiz {
  const answer = getRandomWord().toUpperCase();
  const question = shuffleWord(answer);
  return {
    question: question,
    answer: answer,
  };
}
