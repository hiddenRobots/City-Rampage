import { database } from '../firebase';

// const game = database.ref('games/aqwewq334');

const updateGamesList = gamesList => ({
  type: 'UPDATE_GAMESLIST',
  gamesList,
});

const setGidtoAuth = gid => ({
  type: 'ADD_GID',
  gid,
});


export const grabListOfGames = () => (dispatch) => {
  database.ref('games').once('value').then((games) => {
    // go thru each game and grab its id, name, and number of players,
    // but check to make sure the game has not started
    const checkedGames = [];
    const gamesData = games.val();
    for (const i in gamesData) {
      if (gamesData[i].started === false) {
        const gameObj = { gid: i, name: gamesData[i].name };
        checkedGames.push(gameObj);
      }
    }
    dispatch(updateGamesList(checkedGames));
  });
};

const updateGameData = gameData => ({
  type: 'UPDATE_GAME_DATA',
  gameData,
});

export const joinGame = (uid, gid) => (dispatch) => {
  console.log('i as called');
  database.ref(`users/${uid}/currentGame`).set(gid).then(() => {
    dispatch(setGidtoAuth(gid));

    const game = database.ref(`games/${gid}`);
    game.child('/playerPosition').once('value')
  .then((PlayersInGame) => {
    if (!PlayersInGame.val()) {
      game.child('/playerPosition').set([uid]);
      dispatch({ type: 'JOIN_GAME', newPlayers: [uid] });
    } else {
      game.child('/playerPosition').once('value', (snapshot) => {
        if (snapshot.val().indexOf(uid) === -1) {
          const newPlayers = [...snapshot.val(), uid];
          game.child('/playerPosition').set(newPlayers);
          dispatch({ type: 'JOIN_GAME', newPlayers });
        }
      });
    }
  });
    return game;
  }).then((game) => {
    game.once('value').then((gameData) => {
      console.log('Join Game', gameData.val());
      const data = gameData.val();
      dispatch(updateGameData(data));
    });
  });
};


export const leaveGame = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child('/playerPosition').once('value', (snapshot) => {
    const currentPlayerIndex = snapshot.val().indexOf(uid);
    if (currentPlayerIndex !== -1) {
      const playerArr = snapshot.val();
      playerArr.splice(currentPlayerIndex, 1);

      game.child('/playerPosition').set(playerArr);
      dispatch({ type: 'LEAVE_GAME', playerArr });
    }
    database.ref(`users/${uid}/currentGame`).set('');
  });
};

