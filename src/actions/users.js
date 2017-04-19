import { database } from '../firebase';
import { checkWin } from './checkWin';
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

  game.child('/players').on('value', (players) => {
    dispatch(showOnlineUsersAction(players.val()));
    dispatch(checkWin(players.val()));
  });
};
