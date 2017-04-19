import { database } from '../firebase';

// const game = database.ref('games/aqwewq334');

// export const joinGame = uid => (dispatch) => {
//   game.child('/playerPosition').once('value')
//   .then((PlayersInGame) => {
//     if (!PlayersInGame.val()) {
//       game.child('/playerPosition').set([uid]);
//       dispatch({ type: 'JOIN_GAME', newPlayers: [uid] });
//     } else {
//       game.child('/playerPosition').once('value', (snapshot) => {
//         if (snapshot.val().indexOf(uid) === -1) {
//           const newPlayers = [...snapshot.val(), uid];
//           game.child('/playerPosition').set(newPlayers);
//           dispatch({ type: 'JOIN_GAME', newPlayers });
//         }
//       });
//     }
//   });
// };

// export const leaveGame = uid => (dispatch) => {
//   game.child('/playerPosition').once('value', (snapshot) => {
//     const currentPlayerIndex = snapshot.val().indexOf(uid);
//     if (currentPlayerIndex !== -1) {
//       const playerArr = snapshot.val();
//       playerArr.splice(currentPlayerIndex, 1);
//       game.child('/playerPosition').set(playerArr);
//       dispatch({ type: 'LEAVE_GAME', playerArr });
//     }
//   });
// };

