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

const CONSONANT = ['A', 'I', 'U', 'E', 'O'];
const MAX_LAST_LATTER = 2;

function getLastLetter(word: string) {
  if (word.length == MAX_LAST_LATTER) {
    return word;
  }
  const question = word.substring(word.length - MAX_LAST_LATTER, word.length);
  const shouldReturnOneLetter = question
    .split('')
    .every(letter => CONSONANT.includes(letter));

  if (shouldReturnOneLetter) {
    return word.substring(word.length - 1, word.length);
  }
  return question;
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

export async function goToNextSambung(ctx: Context, session: QuizSession) {
  console.log('session', session);
  const baseWord = getRandomWord(() => true).toUpperCase();
  const question = getLastLetter(baseWord);

  const message = `Mulai: [${baseWord}](http://kbbi.kamus.pelajar.id/arti-kata/${baseWord}))\n${question}...\nSilakan mulai!`;

  return ctx.replyWithMarkdown(message);
}
