import { database } from '../firebase';
import keys from 'lodash/keys';
import filter from 'lodash/filter';
import market from '../Cards/cards';

const game = database.ref('games/aqwewq334');

const startGameAction = playerArr => ({
  type: 'START_GAME',
  playerArr,
});

const initializePlayer = (uid, idx) => database.ref(`/users/${uid}`).once('value')
  .then((user) => {
    const playerObj = Object.assign({}, user.val(), {
      turnOrder: idx,
      stats: {
        energy: 0,
        health: 10,
        points: 0,
      },
      triggers: {
        coolAf: true,
      },
      hand: {
        test: 'test',
      },
    });
    return [uid, playerObj];
  });


export const startGame = () => (dispatch) => {
  const playerArr = [];
  game.child('/playerPosition').once('value')
    .then((userIDS) => {
      if (userIDS.val()) {
        userIDS.val().map((userID, idx) => {
          playerArr.push(initializePlayer(userID, idx));
        });
        return playerArr;
      }
    })
    .then(players => Promise.all(players))
    .then((resolvedPlayerArray) => {
      const playerObj = {};
      resolvedPlayerArray.map((el) => {
        playerObj[el[0]] = el[1];
      });
      game.child('players').set(playerObj);
    })
    .then(
      game.child('/playerPosition').once('value')
      .then(newPlayerArr => dispatch(startGameAction(newPlayerArr)))
      .then(() => game.child('market').set(market)),
    );
  setFirstPlayer();
};

const setFirstPlayer = () => {
 // set the first player
  game.child('/playerPosition').once('value')
  .then(playersArray => playersArray.val()[0]).then((firstPlayer) => {
    game.child('/players').once('value')
    .then((players) => {
      console.log(players.val());
      game.child('/chosenOne').set({ uid: players.val()[firstPlayer].uid, displayName: players.val()[firstPlayer].displayName });
    });
  }).then(() => {
    game.child('started').set(true);
  });
};
