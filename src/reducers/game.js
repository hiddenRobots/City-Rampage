export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_GAME_DATA':
      console.log('In the update game data action', action);
      return action.gameData;
    default:
      return state;
  }
}
