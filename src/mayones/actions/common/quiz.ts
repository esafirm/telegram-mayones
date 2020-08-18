import { Context } from 'telegraf';
import { getRandomWord } from '../../words';
import { createQuestion, configStore } from '../../stores';
import { SimpleQuiz, QuizSession } from '../../stores/types';

function shuffleWord(word: string) {
  return word
    .split('')
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .join('');
}

export async function nextQuiz(): Promise<SimpleQuiz> {
  const configuration = await configStore.getConfiguration();
  const max = configuration.data.levelDesc[configuration.data.level].length;
  const levelFilter = (text: string) => text.length <= max;

  const answer = getRandomWord(levelFilter).toUpperCase();
  const question = shuffleWord(answer);
  return {
    question: question,
    answer: answer,
  };
}

export async function goToNextQuiz(ctx: Context, session: QuizSession) {
  const quiz = await nextQuiz();
  await createQuestion(session, quiz);

  await ctx.reply('Game dimulai!');

  return ctx.replyWithMarkdown(`Ayo tebak ini kata apa? *${quiz.question}*`);
}
