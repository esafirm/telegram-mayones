import Telegraf from 'telegraf';
import * as TelegrafLogger from 'telegraf-logger';

import { StartAction, InlineAction, JoinAction, PlayAction } from './actions';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const logger = new TelegrafLogger();

bot.use(logger.midlleware());

bot.start(ctx => {
  return StartAction(ctx);
});

bot.command('play', async ctx => {
  return JoinAction(ctx);
});

bot.command('start', async ctx => {
  return PlayAction(ctx);
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

exports.handler = async (event: { body: string }) => {
  const status = await bot.handleUpdate(JSON.parse(event.body));
  console.log('status', status);
  return { statusCode: 200, body: '' };
};
