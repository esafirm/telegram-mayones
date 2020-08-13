import Telegraf from 'telegraf'

import {
  StartAction,
  InlineAction
} from './actions'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.start(ctx => {
  return StartAction(ctx)
})

bot.on('text', ctx => {
  return ctx.reply('Naon')
})

bot.command('play', ctx => {
  return ctx.reply('Memulai game DOTA…')
})

bot.on('inline_query', ctx => {
  return InlineAction(ctx)
})

exports.handler = async (event: { body: string }) => {
  await bot.handleUpdate(JSON.parse(event.body));
  return { statusCode: 200, body: '' };
}
