import { database } from '../firebase';
import { gameSettings } from '../initial-state';

export const changeStat = (uid, absChange = -5, stat = 'health') => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child(`players/${uid}`).once('value')
  .then((snapshot) => {
    const displayName = snapshot.val().displayName;
    let currentStat = snapshot.val().stats[stat];

    currentStat += absChange;
    if (stat === 'health') { currentStat = Math.min(currentStat, gameSettings.maxHealth); }
    return currentStat;
  }).then(currentStat => game.child(`players/${uid}/stats/${stat}`).set(currentStat));
};

