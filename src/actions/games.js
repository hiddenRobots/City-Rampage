import { database } from '../firebase';
import { gameSettings } from '../initial-state';

const updateGamesList = gamesList => ({
  type: 'UPDATE_GAMESLIST',
  gamesList,
});

const setGidtoAuth = gid => ({
  type: 'ADD_GID',
  gid,
});


export const grabListOfGames = () => (dispatch) => {
  database.ref('games').on('value', (games) => {
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

export const joinGame = (uid, gid) => (dispatch, storeState) => {
  let game = '';
  const LeaveGid = storeState().auth.gid;
  const oldGame = database.ref(`games/${LeaveGid}`);

  oldGame.child('/playerPosition').once('value', (snapshot) => {
    const currentPlayerIndex = snapshot.val() ? snapshot.val().indexOf(uid) : -1;
    if (currentPlayerIndex !== -1) {
      const playerArr = snapshot.val();
      playerArr.splice(currentPlayerIndex, 1);

      oldGame.child('/playerPosition').set(playerArr)
      .then(() => {
        oldGame.child('/players').off();
        oldGame.off();
        oldGame.child('/market').off();
        database.ref(`users/${uid}/currentGame`).set('');
      }).then(() => {
      // off(listener)
      // set player array without user
        dispatch({ type: 'LEAVE_GAME', playerArr });
        dispatch({ type: 'REMOVE_GAME' });

      // set playersOnline to  []
        dispatch({ type: 'UPDATE_PLAYERS', players: [] });
      // set game to null
        dispatch({ type: 'UPDATE_GAME_DATA', gameData: null });
      // set gamelist?
      })
      .then(() => {
        database.ref(`users/${uid}/currentGame`).set(gid).then(() => {
          dispatch(setGidtoAuth(gid));
        });

        database.ref(`games/${gid}`).once('value').then((gameData) => {
          game = database.ref(`games/${gameData.val().gid}`);
        }).then(() => {
          game.child('/playerPosition').once('value')
      .then((playersInGame) => {
        if (!playersInGame.val()) {
          game.child('/playerPosition').set([uid]);
        } else if (playersInGame.val().indexOf(uid) === -1 && playersInGame.val().length < gameSettings.maxPlayers) {
          const newPlayers = [...playersInGame.val(), uid];
          game.child('/playerPosition').set(newPlayers);
        }
        if (playersInGame.val() && playersInGame.val().length < gameSettings.maxPlayers) {
          // error handle
        }
      })
      .then(() => {
        game.once('value').then((gameData) => {
          const data = gameData.val();
          dispatch(updateGameData(data));
        });
      });
        });
      });
    } else {
      database.ref(`users/${uid}/currentGame`).set(gid).then(() => {
        dispatch(setGidtoAuth(gid));
      });

      database.ref(`games/${gid}`).once('value').then((gameData) => {
        game = database.ref(`games/${gameData.val().gid}`);
      }).then(() => {
        game.child('/playerPosition').once('value')
      .then((playersInGame) => {
        if (!playersInGame.val()) {
          game.child('/playerPosition').set([uid]);
        } else if (playersInGame.val().indexOf(uid) === -1 && playersInGame.val().length < gameSettings.maxPlayers) {
          const newPlayers = [...playersInGame.val(), uid];
          game.child('/playerPosition').set(newPlayers);
        }
        if (playersInGame.val() && playersInGame.val().length < gameSettings.maxPlayers) {
          // error handle
        }
      })
      .then(() => {
        game.once('value').then((gameData) => {
          const data = gameData.val();
          dispatch(updateGameData(data));
        });
      });
      });
    }
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

      game.child('players').once('value').then((players) => {
        const playersData = players.val();
        delete playersData[uid];
        game.child('players').set(playersData);
      }).then(() => {
        game.child('/players').off();
        game.off();
        game.child('/market').off();
        database.ref(`users/${uid}/currentGame`).set('');
      });


      // off(listener)
      // set player array without user
      dispatch({ type: 'LEAVE_GAME', playerArr });
      dispatch({ type: 'REMOVE_GAME' });

      // set playersOnline to  []
      dispatch({ type: 'UPDATE_PLAYERS', players: [] });
      // set game to null
      dispatch({ type: 'UPDATE_GAME_DATA', gameData: null });
      // set gamelist?
      return game.child('/numPlayers').once('value');
    }
  });
};

