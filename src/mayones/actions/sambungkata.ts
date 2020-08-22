import { Context } from 'telegraf';
import { getGameRoom, setGameRoomActive, sessionStore } from '../stores';
import { goToNextSambung } from './common/common_quiz';

const MINMUM_PLAYER = 2;

export default async (ctx: Context) => {
  const { chat, from } = ctx;
  const groupId = chat.id;

  const isAdmin = from.username === '@esafirm';

  const room = await getGameRoom(groupId);
  if (!isAdmin && room.data.players.length < MINMUM_PLAYER) {
    return ctx.reply('Game bisa dijalankan dengan minimal peserta 2 orang');
  }

  if (room.data.active) {
    return ctx.reply('Sedang ada sesi game yang aktif. Tunggu dulu ya ~');
  }

  await setGameRoomActive(groupId, true);
  const session = await sessionStore.createSession(groupId, 'SAMBUNG');

  return goToNextSambung(ctx, session.data);
};
