import Telegraf from 'telegraf'

import {
  StartAction,
  InlineAction
} from './actions'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.start(ctx => {
  return StartAction(ctx)
})

bot.command('play', ctx => {
  return ctx.reply('Memulai game DOTA…')
})

bot.hears('kamu', ctx => {
  return ctx.reply('adalah ANJI(g)')
})

bot.on('inline_query', ctx => {
  return InlineAction(ctx)
})

bot.on('text', ctx => {
  return ctx.reply('Naon')
})

exports.handler = async (event: { body: string }) => {
  await bot.handleUpdate(JSON.parse(event.body));
  return { statusCode: 200, body: '' };
}
