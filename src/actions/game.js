import { database } from '../firebase';
import keys from 'lodash/keys';
import filter from 'lodash/filter';
import market from '../Cards/cards';
import { startListeningForUsers } from './users';
import { marketListener } from './market.js';
import { gameSettings } from '../initial-state';

const startGameAction = gameData => ({
  type: 'UPDATE_GAME_DATA',
  gameData,
});


const initializePlayer = (uid, idx) => database.ref(`/users/${uid}`).once('value')
  .then((user) => {
    const playerObj = Object.assign({}, user.val(), {
      turnOrder: idx,
      kingOnTurnStart: false,
      stats: {
        energy: gameSettings.initialEnergy,
        health: gameSettings.initialHealth,
        points: gameSettings.initialPoints,
      },
      triggers: {
        coolAf: true,
      },
      hand: {
        test: 'test',
      },
      character: 'none',
    });
    return [uid, playerObj];
  });


export const startGame = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

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
    .then(() => {
      dispatch(initalizeOnGameStart());
      dispatch(setFirstPlayer());
      // dispatch(startListeningForUsers());
    })
    .then(() => {
      game.once('value').then((data) => {
        dispatch(startGameAction(data.val()));
      });
    });
};


export const heyListen = () => (dispatch) => {
  dispatch(startListeningForUsers());
  dispatch(startListeningGameChanges());
};


const setFirstPlayer = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child('/playerPosition').once('value')
  .then((playersArray) => {
    const gameSize = playersArray.val().length;
    const firstPlayerIdx = Math.floor(Math.random() * gameSize);

    game.child('/currentTurn').set(firstPlayerIdx);
    game.child('/gameSize').set(gameSize);
    return playersArray.val()[firstPlayerIdx];
  }).then((firstPlayer) => {
    game.child('/players').once('value')
    .then((players) => {
      game.child('/chosenOne').set({ uid: players.val()[firstPlayer].uid, displayName: players.val()[firstPlayer].displayName, photoURL: players.val()[firstPlayer].photoURL });
    });
  }).then(() => {
    game.child('started').set(true);
  });
};

const initalizeOnGameStart = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child('started').set(true);
  game.child('gid').set(gid);
  game.child('market').set(market);
  game.child('/rollCount').set(gameSettings.initialRolls);
  game.child('/king').set('none');
  game.child('/diceBox').set({
    one: { val: '?', selected: false },
    two: { val: '?', selected: false },
    three: { val: '?', selected: false },
    four: { val: '?', selected: false },
    five: { val: '?', selected: false },
    six: { val: '?', selected: false },
  });
  game.child('messages').set([{id:'intialize the messages', text:''}])
};


export const startListeningGameChanges = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.on('value', (snapshot) => {
    dispatch(startGameAction(snapshot.val()));
  });
};
