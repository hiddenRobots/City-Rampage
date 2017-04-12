export default function (state = [], action) {
  switch (action.type) {
    case 'START_GAME':
      console.log(action);
      return action.gameData;
    case 'UPDATE_GAME_DATA':
      console.log('why is this not working?', action);
      return action.gameData;
    default:
      return state;
  }
}
