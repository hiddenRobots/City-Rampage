import { database } from '../firebase';
import keys from 'lodash/keys';
import market from '../Cards/cards';

const startGameAction = playerArr => ({
  type: 'START_GAME',
  playerArr,
});

const initializePlayer = (uid, idx) => database.ref(`/users/${uid}`).once('value', snapshot => snapshot)
  .then((user) => {
    const playerObj = Object.assign({}, {
      uid,
      turnOrder: idx,
      displayName: user.val().displayName,
      stats: {
        energy: 0,
        health: 10,
        points: 0,
      },
    });
    return playerObj;
  });


export const startGame = () => (dispatch) => {
  database.ref('/PlayersInGame').once('value', snapshot => (snapshot.val()))
    .then((userIDS) => {
      if (userIDS.val()) {
        userIDS.val().forEach((userID, idx) => {
          initializePlayer(userID, idx)
          .then((playerObj) => {
            const playerArr = [];
            playerArr.push(playerObj);
            return playerArr;
          })
          .then((playerArr) => {
            // eventually this will set at gameID/playerArr
            database.ref('playerArr').set(playerArr);
          })
          .then(() => database.ref('playerArr').once('value', (snapshot) => {
            dispatch(startGameAction(snapshot.val()));
          }));
        });
      }
    });


   // .then(() => database.ref('market/').set(market));
};


// initialize the stats

    // .then((userID) => {
    //   const user = userID.val();
    //   database.ref('/currentPlayer').set({ displayName: user.displayName, uid: user.uid }); return user.displayName;
    // })

    // .then(user => dispatch(startGameAction(user)))


// export const startListeningToAuthChanges = () => (dispatch) => {
//   auth.onAuthStateChanged((user) => {
//     if (user) {
//       dispatch(signedIn(user));

//       const obj = Object.assign({}, pick(user, ['displayName', 'photoURL', 'email', 'uid']), {
//         currentlyOn: true,
//         stats: {
//           energy: 0,
//           health: 10,
//           points: 0,
//         },
//       });

//       usersRef.child(user.uid).set(obj);
//     } else {
//       dispatch(signedOut());
//     }
//   });
// };
