import { database } from '../firebase';
// import {bindActionCreators}

export const addUser = user => ({
  type: 'ADD_USER',
  displayName: user.displayName,
  uid: user.uid,
  photoURL: user.photoURL,
});

export const showOnlineUsersAction = players => ({
  type: 'UPDATE_PLAYERS',
  players,
});

export const startListeningForUsers = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  console.log(gid);
  game.child('/players').on('value', (players) => {
    // console.log('startListeningForUsers ', snapshot.val());
    console.log(players.val());
    dispatch(showOnlineUsersAction(players.val()));
  });
};

// import { database } from '../firebase';
// // import {bindActionCreators}
// const game = database.ref('games/aqwewq334');

// export const addUser = user => ({
//   type: 'ADD_USER',
//   displayName: user.displayName,
//   uid: user.uid,
//   photoURL: user.photoURL,
// });

// export const showOnlineUsersAction = () => ({
//   type: 'UPDATE_PLAYERS',
// });

// export const startListeningForUsers = () => (dispatch) => {
//   game.on('value', (snapshot) => {
//     // console.log('startListeningForUsers ', snapshot.val());
//     dispatch(showOnlineUsersAction());
//   });
// };
