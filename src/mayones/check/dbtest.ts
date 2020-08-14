import { getGameRoom, newUser } from '../stores';

/* Room */
/* ------------------------------------------ */

getGameRoom(1111)
  .then(res => {
    console.log(res);
    console.log('The data would be:', res.data);
  })
  .catch(err => {
    console.log(err);
  });

/* User */
/* ------------------------------------------ */

newUser({ id: 203544816 })
  .then(res => {
    console.log('The user is:', res);
  })
  .catch(err => {
    console.error(err);
  });
