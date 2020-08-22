import { newUser, scoreStore, roomStore } from '../stores';
import { getFormattedCurrentScore } from '../actions/score';
import { nextQuiz } from '../actions/common/common_quiz';

async function start() {
  /* Quiz */
  /* ------------------------------------------ */

  const nQuiz = await nextQuiz();
  console.log('Next Quiz:', nQuiz);

  /* Room */
  /* ------------------------------------------ */

  const room1 = await roomStore.getGameRoom(1111);
  const room2 = await roomStore.getGameRoom(111);

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

  const score = await scoreStore.findScore('1111');
  console.log('Find score', score.data);

  try {
    const giveScore = await scoreStore.giveScore(
      {
        username: 'esafirm',
        first_name: 'esa',
        is_bot: false,
        id: 1,
        language_code: null,
        last_name: 'last',
      },
      {
        roomId: 1111,
        session: 1,
        gameType: 'ANAGRAM',
      },
    );
    console.log('Give score:', giveScore);
  } catch (err) {
    console.error(err);
  }

  try {
    const formattedScore = await getFormattedCurrentScore(1111);
    console.log('Formatted score', formattedScore);
  } catch (err) {
    console.error(err);
  }
}

start();
