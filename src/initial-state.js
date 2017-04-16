import { database } from './firebase';

const initialState = {
  auth: {
    status: 'ANONYMOUS',
    email: null,
    displayName: null,
    photoURL: null,
    uid: null,
  },
  users: {},
  diceBox: {
    one: { val: '?', selected: false },
    two: { val: '?', selected: false },
    three: { val: '?', selected: false },
    four: { val: '?', selected: false },
    five: { val: '?', selected: false },
    six: { val: '?', selected: false },
  },
  rollCount: 3,
};

export const gameSettings = {
  pointsToWin: 20,
  initialHealth: 10,
  maxHealth: 10,
  startTurnKing: 2,
  becomeKingPoints: 1,
  initialRolls: 3,
  initialEnergy: 0,
  initialPoints: 0,
  maxPlayers: 5,
  resetMarketCost: 2,
};

// set the dicebox
// database.ref('/diceBox/one').set({ val: '?', selected: false });
// database.ref('/diceBox/two').set({ val: '?', selected: false });
// database.ref('/diceBox/three').set({ val: '?', selected: false });
// database.ref('/diceBox/four').set({ val: '?', selected: false });
// database.ref('/diceBox/five').set({ val: '?', selected: false });
// database.ref('/diceBox/six').set({ val: '?', selected: false });

// set roll count
// database.ref('/rollCount').set(3);
// set king

// set current player
// database.ref('/currentPlayer').set('none');


database.ref('games').set('');
//   {
//     aqwewq334: {
//       // started: false,
//       // players: {
//       //   aslkdja4rf: {
//       //     name: 'Derek',
//       //     photoURL: 'pic.png',
//       //     triggers: { noAttacks: false },
//       //     online: true,
//       //     stats: {
//       //       health: 10,
//       //       energy: 0,
//       //       points: 0,
//       //     },
//       //     hand: {
//       //       card1: { test: 'testing' },
//       //     },
//       //   },
//       //   fiod21ces422: {
//       //     name: 'Jaime',
//       //     photoURL: 'pic.png',
//       //     online: true,
//       //     triggers: { noAttacks: false },
//       //     stats: {
//       //       health: 10,
//       //       energy: 0,
//       //       points: 0,
//       //     },
//       //     hand: {
//       //       card1: { test: 'testing' },
//       //     },
//       //   },
//       // },
//       // market: { test: 'testing' },
//       // king: {
//       //   uid: 'fiod21ces422',
//       //   name: 'Jaime',
//       // },
//       // chosenOne: {
//       //   uid: 'aslkdja4rf',
//       //   name: 'Derek',
//       // },
//       // gameName: 'First Game',
//       rollCount: 3,
//       started: false,
//       name: 'Jaimes Game',
//       // submitted: false,
//       diceBox: {
//         one: { val: '?', selected: false },
//         two: { val: '?', selected: false },
//         three: { val: '?', selected: false },
//         four: { val: '?', selected: false },
//         five: { val: '?', selected: false },
//         six: { val: '?', selected: false },
//       },
//     },
//   },
// );


// set roll count
// database.ref('games/aqwewq334/rollCount').set(3);
// set king
// database.ref('games/aqwewq334/king').set('none');
// set current player
// database.ref('games/aqwewq334/chosenOne').set('none');


export default initialState;
