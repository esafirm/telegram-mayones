import { Context } from 'telegraf';
import { getRandomWord } from '../words';
import { getGameRoom, setGameRoomActive } from '../stores';

export default async (ctx: Context) => {
  const { chat } = ctx;
  const groupId = chat.id;

  const room = await getGameRoom(groupId);
  if (room.data.players.length < 2) {
    return ctx.reply('Game bisa dijalankan dengan minimal peserta 2 orang');
  }

  await setGameRoomActive(groupId, true);

  await ctx.reply('Game dimulai!');
  return ctx.reply(nextQuestion());
};

function shuffleWord(word: string) {
  return word
    .split('')
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .join('');
}

function nextQuestion() {
  return `Tebak, kata apa ini? ${shuffleWord(getRandomWord())}`;
}
