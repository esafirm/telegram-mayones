import { Context } from 'telegraf';
import { sessionStore, roomStore } from '../stores';
import { goToNextSambung } from './common/common_quiz';

const MINMUM_PLAYER = 2;

export default async (ctx: Context) => {
  const { chat, from } = ctx;
  const groupId = chat.id;

  const isAdmin = from.username === '@esafirm';

  const room = await roomStore.getGameRoom(groupId);
  if (!isAdmin && room.data.players.length < MINMUM_PLAYER) {
    return ctx.reply('Game bisa dijalankan dengan minimal peserta 2 orang');
  }

  if (room.data.active) {
    return ctx.reply('Sedang ada sesi game yang aktif. Tunggu dulu ya ~');
  }

  await roomStore.setGameRoomActive(groupId, true);
  const session = await sessionStore.createSession(groupId, 'SAMBUNG');

  return goToNextSambung(ctx, session.data);
};
