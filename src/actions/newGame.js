import { database } from '../firebase';
import { gameSettings } from '../initial-state';

export const createNewGame = (name, numPlayers = 4) => (dispatch) => {
  const gid = database.ref('games').push().key;
  database.ref(`games/${gid}`).set(
    {
      gid,
      numPlayers,
      name,
      rollCount: gameSettings.initialRolls,
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
      charactersSelected: false,
      characters: [
        { name: 'RICK SANCHEZ', image: 'rick', selected: false },
        { name: 'CYBER KITTY', image: 'cyberKitty', selected: false },
        { name: 'JOHN CENA', image: 'cenaSmash', selected: false },
        { name: 'gigazaur', image: 'gigazaur', selected: false },
        { name: 'MR MEESEEKS', image: 'golfMeeseeks', selected: false },
        { name: 'KING DEDEDE', image: 'kingDedede', selected: false },
      ],
    });
  dispatch({ type: 'ADD_USER', type: 'user' });
};
