import { getGameRoom, newUser, scoreStore } from '../stores';
import { getFormattedCurrentScore } from '../actions/score';

async function start() {
  /* Room */
  /* ------------------------------------------ */

  const room1 = await getGameRoom(1111);
  const room2 = await getGameRoom(111);

  console.log('Room1', room1);
  console.log('Room2', room2);

  /* User */
  /* ------------------------------------------ */

  newUser({ id: 203544816 })
    .then(res => {
      console.log('The user is:', res);
    })
    .catch(err => {
      console.error(err);
    });

  /* Score */
  /* ------------------------------------------ */

  const score = await scoreStore.findScore("1111");
  console.log('Find score', score.data);

  const formattedScore = await getFormattedCurrentScore(1111)
  console.log('Formatted score', formattedScore)
}

start();
