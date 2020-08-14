import Telegraf from 'telegraf'
import { newUser } from './stores'

import {
  StartAction,
  InlineAction
} from './actions'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.start(ctx => {
  return StartAction(ctx)
})

bot.command('play', async ctx => {
  console.log('Request to play:', ctx.message)
  console.log('Logging:', ctx)

  await newUser(ctx.chat.id)

  return ctx.reply('Memulai game DOTA…')
})

bot.hears('kamu', ctx => {
  return ctx.reply('adalah ANJI(g)')
})

bot.on('inline_query', ctx => {
  return InlineAction(ctx)
})

bot.on('chosen_inline_result', ({ chosenInlineResult }) => {
  console.log('chosen inline result', chosenInlineResult)
})

exports.handler = async (event: { body: string }) => {
  await bot.handleUpdate(JSON.parse(event.body));
  return { statusCode: 200, body: '' };
}
