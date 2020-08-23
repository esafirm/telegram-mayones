import { Context, Markup } from 'telegraf';
import { scoreStore, sessionStore, roomStore } from '../stores';
import {
  goToNextQuiz,
  findWord,
  goToNextSambung,
  getLastQuestion,
} from './common/common_quiz';
import { Quiz } from '../stores/types';
import { platform } from 'os';
import { User } from 'telegraf/typings/telegram-types';

type AnswerParam = {
  groupId: number;
  userAnswer: string;
  quiz: Quiz;
};

function logAnswer(log: string) {
  console.log(`Answer mode => ${log}`);
}

async function processWrongAnswer(ctx: Context, param: AnswerParam) {
  if (isAnagram(param.quiz)) {
    return ctx.reply('Jawaban kamu masih salah tuh!');
  }
  const message = `🤬 GA ADA KATA *${param.userAnswer}*\n\n Harus dimulai dari *${param.quiz.question}*`;
  return ctx.replyWithMarkdown(message, Markup.forceReply().extra());
}

async function processRightAnswer(ctx: Context, param: AnswerParam) {
  const { groupId, userAnswer } = param;

  ctx.reply('Yes jawaban kamu benar');

  const { data } = await sessionStore.findSessionByGroupId(groupId);
  await scoreStore.giveScore(ctx.from, data);

  return isAnagram(param.quiz)
    ? goToNextQuiz(ctx, data)
    : goToNextSambung(ctx, data, userAnswer);
}

async function processSambungKataAnswer(ctx: Context, param: AnswerParam) {
  const { userAnswer, quiz } = param;
  const question = quiz.question;
  const prefixOfAnswer = userAnswer
    .substring(0, question.length)
    .toUpperCase()
    .trim();

  console.log(
    `Comparing ${prefixOfAnswer} and ${question}. Answer: ${userAnswer}`,
  );

  const isMatch = prefixOfAnswer === question;
  if (!isMatch) {
    return ctx.replyWithMarkdown(`SOALNYA *${question}*. Yang bener dong ~`);
  }

  const matchWord = await findWord(userAnswer);
  console.log('match word', matchWord);

  if (matchWord) {
    return processRightAnswer(ctx, param);
  }
  return processWrongAnswer(ctx, param);
}

function processAnagramAnswer(ctx: Context, param: AnswerParam) {
  const { userAnswer, quiz } = param;
  if (quiz.answer === userAnswer.trim().toUpperCase()) {
    return processRightAnswer(ctx, param);
  }
  return processWrongAnswer(ctx, param);
}

function isAnagram(quiz: Quiz): boolean {
  return quiz.type == 'ANAGRAM';
}

function isPlayerInTheRoom(players: Array<User>, from: User) {
  return players.some(p => p.id == from.id);
}

export default async (ctx: Context) => {
  const { chat, from } = ctx;
  const groupId = chat.id;
  const answer = ctx.message.text;

  if (answer.includes('/') || answer.includes('@')) {
    logAnswer('Command and mention should not be handled here');
    return Promise.resolve();
  }

  const room = await roomStore.getGameRoom(groupId);
  const { active, players } = room.data;

  if (!active) {
    logAnswer(`Game is not active: ${room.data.roomId}`);
    return Promise.resolve();
  }

  // Check if the player that answer already join the session or not
  if (!isPlayerInTheRoom(players, from)) {
    logAnswer(`${from.first_name} is not in the room`);
    return Promise.resolve();
  }

  logAnswer(`Menjawab ${answer}`);

  const lastQuestion = await getLastQuestion(groupId);
  const param: AnswerParam = {
    groupId: groupId,
    userAnswer: answer,
    quiz: lastQuestion.data,
  };

  if (isAnagram(lastQuestion.data)) {
    return processAnagramAnswer(ctx, param);
  }
  return processSambungKataAnswer(ctx, param);
};
