export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_PLAYERS_IN_LOBBY':
      return action.playerArray;
    default:
      return state;
  }
}
