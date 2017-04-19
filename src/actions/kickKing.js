import { database } from '../firebase';
import { changeStat } from './changeStat';
import { gameSettings } from '../initial-state';

export const setKing = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);


  console.log('setKIGN indfakdshlkfjashdlkjfh;');
  function setNewKing() {
    game.child('/chosenOne').once('value')
    .then((currentPlayer) => {
      game.child('/king').set(currentPlayer.val())
      .then(() => dispatch(changeStat(currentPlayer.val().uid, gameSettings.becomeKingPoints, 'points')));
      game.child(`/players/${currentPlayer.val().uid}/kingOnTurnStart`).set(true);
      game.child('kingAttackedOnTurn').set(false);
    });
  }

  game.child('king').once('value').then((king) => {
    if (king.val() !== 'none') {
      game.child(`/players/${king.val().uid}/kingOnTurnStart`).set(false)
      .then(setNewKing());
    } else {
      game.child('/chosenOne').once('value')
      .then((chosenOne) => {
        game.child(`/players/${chosenOne.val().uid}`).once('value')
        .then((currentPlayer) => {
          console.log(currentPlayer.val(), 'shit poop');
          game.child('chosenOne').set({ uid: currentPlayer.val().uid, displayName: currentPlayer.val().displayName, photoURL: currentPlayer.val().photoURL, character: currentPlayer.val().character })
        .then(() => setNewKing());
        });
      });
    }
  });
};


export const stayOnHill = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child('kingAttackedOnTurn').set(false);
};
