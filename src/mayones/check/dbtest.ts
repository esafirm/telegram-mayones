import { getGameRoom, newUser } from '../stores';

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
}

start();
