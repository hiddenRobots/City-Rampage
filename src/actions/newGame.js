import { database } from '../firebase';

export const createNewGame = (name, numPlayers = 4) => {
  const gid = database.ref('games').push().key;
  database.ref(`games/${gid}`).set(
    {
      gid,
      numPlayers,
      name,
      rollCount: 3,
      started: false,
      submitted: false,
      diceBox: {
        one: { val: '?', selected: false },
        two: { val: '?', selected: false },
        three: { val: '?', selected: false },
        four: { val: '?', selected: false },
        five: { val: '?', selected: false },
        six: { val: '?', selected: false },
      },
    });
}
;
