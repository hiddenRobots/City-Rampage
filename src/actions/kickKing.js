import { database } from '../firebase';
import { changeStat } from './changeStat';

export const setKing = () => (dispatch, storeState) => {
  console.log('Setting the king');
  const gid = storeState().auth.gid;
  const kingUid = storeState().auth.uid;
  const game = database.ref(`games/${gid}`);
  // game.child('/chosenOne').once('value', snapshot => snapshot)
  // .then((chosenOne) => {
  //   game.child('/king').set(chosenOne.val());
  //   game.child(`/players/${chosenOne.val().uid}/stats/points`).once('value').then((points) => {
  //     const p = points.val() + 1;
  //     game.child(`/players/${chosenOne.val().uid}/stats/points`).set(p);
  //   });
  // });
  function setNewKing() {
    game.child('/chosenOne').once('value')
    .then((currentPlayer) => {
      game.child('/king').set(currentPlayer.val())
      .then(() => dispatch(changeStat(currentPlayer.val().uid, 1, 'points')));
      game.child(`/players/${currentPlayer.val().uid}/kingOnTurnStart`).set(true);
    });
  }

  if (kingUid) {
    console.log(kingUid, 'I am the KINGUID in setKING');
    game.child(`/players/${kingUid}/kingOnTurnStart`).set(false)
    .then(setNewKing());
  } else {
    setNewKing();
  }
};
