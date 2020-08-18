import { Context } from 'telegraf';
import { getGameRoom, setGameRoomActive, createSession } from '../stores';
import { goToNextQuiz } from './common/quiz';

const MINMUM_PLAYER = 2;

export default async (ctx: Context) => {
  const { chat, from } = ctx;
  const groupId = chat.id;

  const isAdmin = from.username === '@esafirm';
  console.log('isAdmin', isAdmin);
  console.log('username', from.username);

  const room = await getGameRoom(groupId);
  if (!isAdmin && room.data.players.length < MINMUM_PLAYER) {
    return ctx.reply('Game bisa dijalankan dengan minimal peserta 2 orang');
  }

  if (room.data.active) {
    return ctx.reply('Sedang ada sesi game yang aktif. Tunggu dulu ya ~');
  }

  await setGameRoomActive(groupId, true);
  const session = await createSession(groupId);

  return goToNextQuiz(ctx, session.data);
};
