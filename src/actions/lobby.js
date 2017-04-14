import { database } from '../firebase';

const setPlayersInLobby = array => ({
  type: 'UPDATE_PLAYERS_IN_LOBBY',
  playerArray: array,
});


export const playersInLobby = gid => (dispatch) => {
  const game = database.ref(`games/${gid}`);

  game.child('/playerPosition').once('value').then((playerList) => {
    console.log(playerList.val());
    dispatch(setPlayersInLobby(playerList.val()));
  });
};
