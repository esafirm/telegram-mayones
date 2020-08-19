import { CommandPart } from '.';
import { userSubmitStore } from '../stores';
import { getTextArray } from '../words';

export default async ctx => {
  const commandPart = ctx.state.command as CommandPart;
  const word = commandPart.args.toLowerCase();

  const isExist = getTextArray().find(s => s === word);
  if (isExist) {
    return ctx.reply(`*${word.toUpperCase()}* is already exists in word bank`);
  }

  userSubmitStore.submit(word);

  return ctx.reply(`Submitting ${word}…`);
};
