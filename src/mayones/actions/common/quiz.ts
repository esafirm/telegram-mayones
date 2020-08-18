import { Context } from 'telegraf';
import { getRandomWord } from '../../words';
import { createQuestion } from '../../stores';
import { SimpleQuiz, QuizSession } from '../../stores/types';

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

export async function goToNextQuiz(ctx: Context, session: QuizSession) {
  const quiz = nextQuiz();
  await createQuestion(session, quiz);

  await ctx.reply('Game dimulai!');

  return ctx.replyWithMarkdown(`Ayo tebak ini kata apa? *${quiz.question}*`);
}
