import { database } from '../firebase';


export const increaseHealth = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  let health;
  game.child(`players/${uid}`).once('value', (snapshot) => {
    health = snapshot.val().stats.health;
  });
  health += 1;
  game.child(`players/${uid}/stats/health`).set(health);
};


export const decreaseHealth = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  let health;
  game.child(`players/${uid}`).once('value', (snapshot) => {
    health = snapshot.val().stats.health;
  });
  health -= 1;
  game.child(`players/${uid}/stats/health`).set(health);
};
