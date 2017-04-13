import { database } from '../firebase';

export const setKing = () => (dispatch, storeState) => {
  console.log('Setting the king');
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  game.child('/chosenOne').once('value', snapshot => snapshot)
  .then((chosenOne) => {
    game.child('/king').set(chosenOne.val());
    game.child(`/players/${chosenOne.val().uid}/stats/points`).once('value').then((points) => {
      const p = points.val() + 1;
      game.child(`/players/${chosenOne.val().uid}/stats/points`).set(p);
    });
  });
};
