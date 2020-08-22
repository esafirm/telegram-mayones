import * as FaundaDb from 'faunadb';

const client = new FaundaDb.Client({
  secret: process.env.FAUNA_TOKEN,
  timeout: 2000,
});

/* New Format */
/* ------------------------------------------ */

import ScoreStore from './score_store';
export const scoreStore = new ScoreStore(client);

import { ConfigStore } from './config_store';
export const configStore = new ConfigStore(client);

import { UserSubmitStore } from './user_submit';
export const userSubmitStore = new UserSubmitStore(client);

import QuestionStore from './question_store';
export const questionStore = new QuestionStore(client);

import SessionStore from './session_store';
export const sessionStore = new SessionStore(client);

import RoomStore from './room_store';
export const roomStore = new RoomStore(client);

import UserStore from './user_store';
export const userStore = new UserStore(client);
