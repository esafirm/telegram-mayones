import { Context } from 'telegraf';
import { getRandomWord } from '../words';

export default async (ctx: Context) => {
  return ctx.reply(`Cus lah, ini kata apa? ${getRandomWord()}`);
};
