import { database } from '../firebase';
import { gameSettings } from '../initial-state';

export const selectCharacter = (uid, character, index) => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  console.log('this is the uid of the player who wants to pick', uid, character);

  game.child(`/players/${uid}/character`).once('value')
  .then((currentCharacter) => {
    if (currentCharacter.val() === 'none') {
      game.child(`characters/${index}`).once('value')
      .then((char) => {
        const newChar = char.val();
        if (!newChar.selected) {
          newChar.selected = !newChar.selected;
          game.child(`characters/${index}`).set(newChar)
          .then(() => game.child(`/players/${uid}/character`).set(character))
          .then(() => {
            game.child('players').once('value')
            .then((players) => {
              const arePlayersReady = Object.keys(players.val()).reduce((prev, curr) => {
                if (prev && players.val()[curr].character === 'none') {
                  return false;
                }
                return prev;
              }, true);
              game.child('charactersSelected').set(arePlayersReady);
            });
          });
        }
      });
    }
    // can make it so that you can reselect here
  });
};


export const enterGame = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  // decided to do this up there
  game.child('charactersSelected').set(true);
  // this will set playerReady to true and then it will loop through all players and check if they are true and set charSelected to true if everyone is ready
};
