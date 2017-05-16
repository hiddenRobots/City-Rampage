import { database } from '../firebase';
import groupBy from 'lodash/groupBy';
import { changeStat } from './changeStat';
import { setKing } from './kickKing';
import { gameSettings } from '../initial-state';
import fire from '../Cards/effects';

const game = database.ref('games/aqwewq334');

const diceOptions = {
  1: '1',
  2: '2',
  3: '3',
  4: 'energy',
  5: 'health',
  6: 'attack',
};

const defaultDice = {
  one: { val: '?', selected: false },
  two: { val: '?', selected: false },
  three: { val: '?', selected: false },
  four: { val: '?', selected: false },
  five: { val: '?', selected: false },
  six: { val: '?', selected: false },
};

const randNum = () => Math.ceil((Math.random() * 6));

const updateRolls = listOfDice => ({
  type: 'UPDATE_DICEBOX',
  listOfDice,
});

const updateRollCount = newRollCount => ({
  type: 'UPDATE_ROLLCOUNT',
  newRollCount,
});

const decrementRoll = () => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  game.child('/rollCount').once('value')
  .then((rollCount) => {
    const newRollCount = rollCount.val() - 1;
    game.child('/rollCount').set(newRollCount);
    dispatch(updateRollCount(newRollCount));
  });
};

export const rollDice = (uid, chosenId, roller) => (dispatch, storeState) => {
  if (uid === chosenId) {
    const gid = storeState().auth.gid;
    const game = database.ref(`games/${gid}`);

  // if rollCount greater than 1, {decrement} else {submit}
    game.child('/rollCount').once('value').then((rollCount) => {
      if (rollCount.val() > 0) {
        game.child('/diceBox').once('value')
      .then((listOfDiceSnap) => {
        const listOfDice = listOfDiceSnap.val();
        const pArray = [];

        for (const i in listOfDice) {
          if (listOfDice[i].selected !== true) {
            pArray.push(game.child(`/diceBox/${i}`).set({ val: diceOptions[randNum()], selected: false }));
          }
        }
        // Promise.all(pArray)
      })
      .then(() => {
        game.child('/diceBox').once('value').then((updatedDice) => {
          dispatch(updateRolls(updatedDice.val()));
          dispatch(decrementRoll());
        });
      })
      .then(() => {
        if (rollCount.val() === 1) {
          dispatch(submitRoll(roller));
        }
      });
      }
    });
  }
};


const selectDie = die => ({
  type: 'CHANGE_SELECTED_DICE',
  die,
});

export const selectDice = (die, uid, chosenId) => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  if (uid == chosenId) {
    let valueOfSelected;
    let valueOfVal;

    game.child(`/diceBox/${die}`).once('value', (snapshot) => {
      valueOfSelected = snapshot.val().selected;
      valueOfVal = snapshot.val().val;
    }).then(() => {
      if (valueOfVal !== '?') {
        game.child(`/diceBox/${die}/selected`).set(!valueOfSelected).then(() => {
          game.child('/diceBox').once('value', (snapshot) => {
            const other = {};
            for (const i in snapshot.val()) {
              other[i] = snapshot.val()[i];
            }
            dispatch(selectDie(other));
          });
        });
      }
    });
  }
};

export const submitRoll = roller => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  const submittedRoll = [];
  let pointsFrom1 = 0;
  let pointsFrom2 = 0;
  let pointsFrom3 = 0;

  game.child('/diceBox').once('value', (snapshot) => {
    for (const i in snapshot.val()) {
      submittedRoll.push(snapshot.val()[i].val);
    }
  })
  .then(() => {
    game.child('chosenOne').once('value', (snapshot) => {
      const currentPlayer = snapshot.val().uid;
      const currentRoll = groupBy(submittedRoll);


      if (currentRoll.health) {
        game.child('/king').once('value', (kingSpot) => {
          if (kingSpot.val().uid !== currentPlayer) {
            const healthIncrease = currentRoll.health.length;
            dispatch(changeStat(currentPlayer, healthIncrease, 'health'));
          }
        });
      }

      if (currentRoll.energy) {
        game.child(`/players/${currentPlayer}/stats/energy`).once('value', (snapshot) => {
          const energyIncrease = currentRoll.energy.length;
          dispatch(changeStat(currentPlayer, energyIncrease, 'energy'));
        });
      }

      // start - CARD EFFECTS for dice.
      roller.hand ? roller.hand.forEach((card) => {
        if (card.window === 'dice') {
          fire[card.effect](currentRoll);
        }
      }) : null;
      // end — card effect for dice.

      if (currentRoll[3] && currentRoll[3].length >= 3) {
        pointsFrom3 = currentRoll[3].length;
      }
      if (currentRoll[2] && currentRoll[2].length >= 3) {
        pointsFrom2 = currentRoll[2].length - 1;
      }
      if (currentRoll[1] && currentRoll[1].length >= 3) {
        pointsFrom1 = currentRoll[1].length - 2;
      }
      if (currentRoll[1] || currentRoll[2] || currentRoll[3]) {
        dispatch(changeStat(currentPlayer, pointsFrom3 + pointsFrom2 + pointsFrom1, 'points'));
      }

      if (currentRoll.attack) {
        const attacks = -currentRoll.attack.length;

        dispatch(attack(attacks, currentPlayer));
      }
    });
  })
  .then(() => {
    game.child('/king').once('value')
    .then((kingSpot) => {
      if (kingSpot.val() === 'none') {
        dispatch(setKing());
      }
    });

    game.child('/submitted').set(true)
    .then(() => {
      const setSubmittedTrueAction = { type: 'SET_SUBMITTED', hasBeenSubmitted: true };
      dispatch(setSubmittedTrueAction);
    });
  });
};


export const endTurn = () => (dispatch, storeState) => {
  let nextTurn;
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);

  // start: end_turn card effects: effects must be self-inflicted
  game.child('chosenOne').once('value', (chosenOne) => {
    game.child('players').once('value', (players) => {
      const allPlayers = players.val();
      const cardOwner = allPlayers[chosenOne.val().uid];


      cardOwner.hand ? cardOwner.hand.forEach((card) => {
        if (card.window === 'end_turn') {
          fire[card.effect](cardOwner);
        }
        game.child('players').set(allPlayers);
      }) : null;
    });
  });
  // end: end_turn card effects

  const currentTurn = game.child('/currentTurn').once('value');
  const gameSize = game.child('/gameSize').once('value');
  const savant = game.child('/savant').once('value');

  Promise.all([currentTurn, gameSize, savant])
  .then(([currentTurn, gameSize, savant]) => {
    if (savant.val()) {
      nextTurn = (currentTurn.val()) % gameSize.val();
    } else {
      nextTurn = (currentTurn.val() + 1) % gameSize.val();
    }
    game.child('/currentTurn').set(nextTurn);
    game.child('/savant').set(false);

    return nextTurn;
  })
  .then((nextTurn) => {
    game.child(`/playerPosition/${nextTurn}`).once('value')
    .then(playerID => game.child(`/players/${playerID.val()}`).once('value'))
    .then((player) => {
      game.child('/rollCount').set(gameSettings.initialRolls);
      game.child('/submitted').set(false);
      game.child('/diceBox').set(defaultDice);
      if (player) {
        game.child('/chosenOne').set({ uid: player.val().uid, displayName: player.val().displayName, photoURL: player.val().photoURL, character: player.val().character });
      }
      game.child('kingAttackedOnTurn').set(false);

      if (player.val().kingOnTurnStart) {
        dispatch(changeStat(player.val().uid, gameSettings.startTurnKing, 'points'));
      }
    });
  });
};


const attack = (numAttacks, currentPlayerID) => (dispatch, storeState) => {
  const gid = storeState().auth.gid;
  const game = database.ref(`games/${gid}`);
  const king = game.child('king').once('value');
  const playerPos = game.child('/playerPosition').once('value');
  const requests = [king, playerPos];

  Promise.all(requests)
  .then((snapshots) => {
    const kingID = snapshots[0].val().uid;
    const playerPosArr = snapshots[1].val();

    if (kingID === currentPlayerID) {
      const toAttack = playerPosArr.filter(uid => uid !== kingID);
      return toAttack;
    } else if (kingID) {
      const toAttack = playerPosArr.filter(uid => uid === kingID);
      game.child('kingAttackedOnTurn').set(true);
      return toAttack;
    }
  })
  .then((toAttack) => {
    if (toAttack) {
      toAttack.forEach((uid) => {
        dispatch(changeStat(uid, numAttacks, 'health'));
      });
    }
  });
};
