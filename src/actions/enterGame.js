import { database } from '../firebase';


export const joinGame = uid => (dispatch) => {
  database.ref('/PlayersInGame').once('value', snapshot => snapshot.val())
  .then((PlayersInGame) => {
    if (!PlayersInGame.val()) {
      database.ref('/PlayersInGame').set([uid]);
      dispatch({ type: 'JOIN_GAME', newPlayers: [uid] });
    } else {
      database.ref('/PlayersInGame').once('value', (snapshot) => {
        if (snapshot.val().indexOf(uid) === -1) {
          const newPlayers = [...snapshot.val(), uid];
          database.ref('/PlayersInGame').set(newPlayers);
          dispatch({ type: 'JOIN_GAME', newPlayers });
        }
      });
    }
  });
};

export const leaveGame = uid => (dispatch) => {
  database.ref('/PlayersInGame').once('value', (snapshot) => {
    const currentPlayerIndex = snapshot.val().indexOf(uid);
    console.log(currentPlayerIndex);
    if (currentPlayerIndex !== -1) {
      const playerArr = snapshot.val();
      playerArr.splice(currentPlayerIndex, 1);
      console.log('currentPlayer', playerArr);
      database.ref('/PlayersInGame').set(playerArr);
      dispatch({ type: 'LEAVE_GAME', playerArr });
    }
  });
};

