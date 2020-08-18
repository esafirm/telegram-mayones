import { readFileSync } from 'fs';
import { join } from 'path';

const text = readFileSync(join(__dirname, 'words.txt'), 'utf-8');
const textByLine = text.split('\n');

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomWord(filter: (text: string) => boolean) {
  const filtered = textByLine.filter(filter);
  return filtered[getRandomInt(filtered.length - 1)];
}
