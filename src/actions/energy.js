import { database } from '../firebase';


export const increaseEnergy = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  let energy;
  game.child(`players/${uid}`).once('value', (snapshot) => {
    energy = snapshot.val().stats.energy;
  });
  energy += 1;
  game.child(`players/${uid}/stats/energy`).set(energy);
};

export const decreaseEnergy = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  let energy;
  game.child(`players/${uid}`).once('value', (snapshot) => {
    energy = snapshot.val().stats.energy;
  });
  energy -= 1;
  game.child(`players/${uid}/stats/energy`).set(energy);
};

