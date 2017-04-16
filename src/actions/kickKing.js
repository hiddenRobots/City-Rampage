import { database } from '../firebase';
import { changeStat } from './changeStat';
import { gameSettings } from '../initial-state';

export const setKing = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const kingUid = storeState().auth.uid;
  const game = database.ref(`games/${gid}`);

  function setNewKing() {
    game.child('/chosenOne').once('value')
    .then((currentPlayer) => {
      game.child('/king').set(currentPlayer.val())
      .then(() => dispatch(changeStat(currentPlayer.val().uid, gameSettings.becomeKingPoints, 'points')));
      game.child(`/players/${currentPlayer.val().uid}/kingOnTurnStart`).set(true);
      game.child('kingAttackedOnTurn').set(false);
    });
  }

  if (kingUid) {
    game.child(`/players/${kingUid}/kingOnTurnStart`).set(false)
    .then(setNewKing());
  } else {
    setNewKing();
  }
};

export const stayOnHill = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child('kingAttackedOnTurn').set(false);
};
