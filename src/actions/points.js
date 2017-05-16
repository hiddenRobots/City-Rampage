import { database } from '../firebase';


export const increasePoints = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  let points;
  game.child(`players/${uid}`).once('value', (snapshot) => {
    points = snapshot.val().stats.points;
  });
  points += 1;
  game.child(`players/${uid}/stats/points`).set(points);
};


export const decreasePoints = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  let points;
  game.child(`players/${uid}`).once('value', (snapshot) => {
    points = snapshot.val().stats.points;
  });
  points -= 1;
  game.child(`players/${uid}/stats/points`).set(points);
};

