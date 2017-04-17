import { database } from '../firebase';

const setPlayersInLobby = array => ({
  type: 'UPDATE_PLAYERS_IN_LOBBY',
  playerArray: array,
});


export const playersInLobby = gid => (dispatch) => {
  const game = database.ref(`games/${gid}`);

  game.child('/playerPosition').once('value').then((playerList) => {
    const userList = [];
    playerList.val().forEach((uid) => {
      userList.push(database.ref(`users/${uid}`).once('value'));
    });
    Promise.all(userList)
    .then((resolvedUserList) => {
      const userNameList = resolvedUserList.map(user => user.val().displayName);
      return userNameList;
    })
    .then(userNameList => dispatch(setPlayersInLobby(userNameList)));
  })
  // this is gonne be jenky as crap but whatevs
  .then(() => {
    game.child('started').once('value')
    .then((started) => {
      started.val() ? null : setTimeout(() => { dispatch(playersInLobby(gid)); }, 2000);
    });
  });
};
