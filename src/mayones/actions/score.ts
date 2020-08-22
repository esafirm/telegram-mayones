import { scoreStore, sessionStore } from '../stores';
import { Context } from 'telegraf';
import { sessionId } from './common/utils';

async function getCurrentScore(groupId: number) {
  const { data } = await sessionStore.findSessionByGroupId(groupId);
  return scoreStore.findOrCreateScore(sessionId(data));
}

function getTitle(index: number) {
  switch (index) {
    case 0:
      return '- *DEWA JUDI*';
    case 1:
      return '- *IVAN LANIN*';
    case 2:
      return '- *BUKA KBBI.COM*';
  }
  return '';
}

export async function getFormattedCurrentScore(groupId: number) {
  const { data } = await getCurrentScore(groupId);
  const keyArray = Object.keys(data.scores);

  if (keyArray.length === 0) {
    return 'Masih belum ada score';
  }

  const scoreObj = keyArray.map(k => ({ username: k, score: data.scores[k] }));
  const message = scoreObj
    .sort((a, b) => b.score - a.score)
    .map(
      (score, index) =>
        `${index + 1}. ${score.username} (${score.score}) ${getTitle(index)}`,
    )
    .join('\n');

  return `Score sementara:\n${message}`;
}

export default async (ctx: Context) => {
  const groupId = ctx.chat.id;
  return ctx.replyWithMarkdown(await getFormattedCurrentScore(groupId));
};
