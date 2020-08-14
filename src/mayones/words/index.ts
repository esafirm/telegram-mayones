import { readFileSync } from 'fs';

const text = readFileSync('./src/mayones/words/words.txt', 'utf-8');
const textByLine = text.split('\n');

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomWord() {
  return textByLine[getRandomInt(textByLine.length - 1)];
}
