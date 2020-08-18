import { getLastSession, scoreStore } from '../stores';
import { Context } from 'telegraf';

async function getCurrentScore(groupId: number) {
  const { data } = await getLastSession(groupId);
  const sessionId = data.roomId + data.session;
  return scoreStore.findOrCreateScore(sessionId);
}

function getTitle(index: number) {
  if (index == 0) {
    return '- *DEWA JUDI*';
  }
  return '';
}

async function getFormattedCurrentScore(groupId: number) {
  const { data } = await getCurrentScore(groupId);
  const keyArray = Array.from(data.scores.keys());
  const scoreObj = keyArray.map(k => ({ username: k, score: data.scores[k] }));

  const message = scoreObj
    .sort((a, b) => a.score - b.score)
    .map(
      (score, index) =>
        `${index + 1}. ${score.username} ${score.score} ${getTitle(index)}`,
    )
    .join('\n');

  return `Score sementara:\n${message}`;
}

export default async (ctx: Context) => {
  const groupId = ctx.chat.id;
  return ctx.reply(await getFormattedCurrentScore(groupId));
};
