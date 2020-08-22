import start from './start';
import inline from './inline';
import join from './join';
import play from './play_action';
import answer from './answer';
import end from './end';
import score from './score';
import skip from './skip';
import submit from './submit';
import sambungkata from './sambungkata';

/**
 * text '/start@yourbot Hello world!'
 * command 'start'
 * bot 'yourbot'
 * args 'Hello world!'
 * splitArgs ['Hello', 'world!']
 */
export type CommandPart = {
  text: string;
  command: string;
  bot: string;
  args: string;
  splitArgs: Array<string>;
};

const Commands = {
  Submit: 'submit',
  Play: 'play',
  Join: 'join',
  Score: 'score',
};

const AdvancedAction = ctx => {
  const commandPart = ctx.state.command as CommandPart;
  const command = commandPart ? commandPart.command.toLowerCase() : '';

  if (command === Commands.Submit) {
    return submit(ctx);
  }
  if (command === Commands.Join) {
    return join(ctx);
  }
  if (command === Commands.Score) {
    return score(ctx);
  }
  if (command === Commands.Play) {
    return play(ctx);
  }

  return answer(ctx);
};

export {
  start as StartAction,
  inline as InlineAction,
  join as JoinAction,
  play as PlayAction,
  end as EndAction,
  answer as AnswerAction,
  score as ScoreAction,
  skip as SkipAction,
  sambungkata as SambungKataAction,
  AdvancedAction,
};
