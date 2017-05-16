import { database } from '../firebase';


// const game = database.ref('games/aqwewq334');


export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_PLAYERS' :
      return action.players;
    default:
      return state;
  }
}

