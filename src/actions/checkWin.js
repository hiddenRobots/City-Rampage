import { database } from '../firebase';
import { gameSettings } from '../initial-state';

export const checkWin = players => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  for (const i in players) {
    if (players[i].stats.health <= 0) {
      dispatch(killPlayer(players[i].uid));
    }
    if (players[i].stats.points >= gameSettings.pointsToWin) {
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
    const newPlayers = game.child('/playerPosition').set(newPlayerPos);
    const newGameSize = game.child('/gameSize').set(newPlayerPos.length);
    const chosenOne = game.child('/chosenOne').once('value');
    const king = game.child('/king').once('value');

    Promise.all([newPlayers, newGameSize, chosenOne, king])
    .then(([newPlayers, newGameSize, chosenOne, king]) => {
      let newCurrentTurn;

      if (chosenOne.val().uid === uid) {
        newCurrentTurn = newPlayerPos.indexOf(chosenOne.val().uid) + 1;
        game.child('/currentTurn').set(newCurrentTurn);
      } else {
        newCurrentTurn = newPlayerPos.indexOf(chosenOne.val().uid);
        game.child('/currentTurn').set(newCurrentTurn);
      }
      dispatch({ type: 'UPDATE_DEAD', payload: 'deadPlayers' });

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
  });
};
