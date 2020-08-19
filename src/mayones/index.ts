import Telegraf from 'telegraf';
import * as TelegrafLogger from 'telegraf-logger';
import * as commandParts from 'telegraf-command-parts';

import {
  StartAction,
  InlineAction,
  JoinAction,
  PlayAction,
  EndAction,
  ScoreAction,
  SkipAction,
  AdvancedAction,
  SambungKataAction,
} from './actions';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const logger = new TelegrafLogger();

bot.use(logger.middleware());
bot.use(commandParts());

bot.start(ctx => {
  return StartAction(ctx);
});

bot.command('join', async ctx => {
  return JoinAction(ctx);
});

bot.command('play', async ctx => {
  return PlayAction(ctx);
});

bot.command('sambung_play', async ctx => {
  return SambungKataAction(ctx);
});

bot.command('hajar', async ctx => {
  return PlayAction(ctx);
});

bot.command('skip', async ctx => {
  return SkipAction(ctx);
});

bot.command('end', ctx => {
  return EndAction(ctx);
});

bot.command('score', ctx => {
  return ScoreAction(ctx);
});

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
  return AdvancedAction(ctx);
});

exports.handler = async (event: { body: string }) => {
  await bot.handleUpdate(JSON.parse(event.body));
  return { statusCode: 200, body: '' };
};
