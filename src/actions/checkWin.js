import { database } from '../firebase';

export const checkWin = players => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  for (const i in players) {
    if (players[i].stats.health <= 0) {
      dispatch(killPlayer(players[i].uid));
    }
    if (players[i].stats.points >= 20) {
      console.log(players[i].displayName, ' won the game');
      game.child('winner').set(players[i]);
    }
  }
};


export const killPlayer = uid => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child('/playerPosition').once('value')
  .then((playerArr) => {
    const newPlayerPos = playerArr.val().filter(playerID => playerID !== uid);

    game.child('/playerPosition').set(newPlayerPos);
    game.child('/gameSize').set(newPlayerPos.length);
    dispatch({ type: 'UPDATE_DEAD', payload: 'YOYOYO' });

    if (newPlayerPos.length === 1) {
      game.child(`/players/${newPlayerPos[0]}`).once('value')
      .then(winner => game.child('winner').set(winner.val()));
    }
  })
  .then(() => {
    game.child('/deadPlayers').once('value', (snapshot) => {
      if (!snapshot.val()) {
        game.child('/deadPlayers').set([uid]);
      } else {
        const newDeadPlayerArr = [...snapshot.val(), uid];
        game.child('/deadPlayers').set(newDeadPlayerArr);
      }
    });
  });
};
