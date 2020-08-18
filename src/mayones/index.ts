import Telegraf from 'telegraf';
import * as TelegrafLogger from 'telegraf-logger';

import {
  StartAction,
  InlineAction,
  JoinAction,
  PlayAction,
  EndAction,
  AnswerAction,
  ScoreAction
} from './actions';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const logger = new TelegrafLogger();

bot.use(logger.middleware());

bot.start(ctx => {
  return StartAction(ctx);
});

bot.command('join', async ctx => {
  return JoinAction(ctx);
});

bot.command('play', async ctx => {
  return PlayAction(ctx);
});

bot.command('end', ctx => {
  return EndAction(ctx);
});

bot.command('score', ctx => {
  return ScoreAction(ctx)
})

bot.hears('kamu', ctx => {
  return ctx.reply('adalah ANJI(g)');
});

bot.on('inline_query', ctx => {
  return InlineAction(ctx);
});

bot.on('chosen_inline_result', ({ chosenInlineResult }) => {
  console.log('chosen inline result', chosenInlineResult);
});

bot.on('text', ctx => {
  return AnswerAction(ctx);
});

exports.handler = async (event: { body: string }) => {
  await bot.handleUpdate(JSON.parse(event.body));
  return { statusCode: 200, body: '' };
};
