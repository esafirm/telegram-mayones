import { CommandPart } from '.';
import { userSubmitStore } from '../stores';

export default async ctx => {
  const commandPart = ctx.state.command as CommandPart;

  userSubmitStore.submit(commandPart.args);

  return ctx.reply(`Submitting ${commandPart.args}…`);
};
