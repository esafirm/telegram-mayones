import { getLastSession, scoreStore } from '../stores';
import { Context } from 'telegraf';
import { sessionId } from './common/utils';

async function getCurrentScore(groupId: number) {
  const { data } = await getLastSession(groupId);
  return scoreStore.findOrCreateScore(sessionId(data));
}

function getTitle(index: number) {
  if (index == 0) {
    return '- *DEWA JUDI*';
  }
  return '';
}

export async function getFormattedCurrentScore(groupId: number) {
  const { data } = await getCurrentScore(groupId);
  const keyArray = Object.keys(data.scores);
  const scoreObj = keyArray.map(k => ({ username: k, score: data.scores[k] }));

  const message = scoreObj
    .sort((a, b) => b.score - a.score)
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
