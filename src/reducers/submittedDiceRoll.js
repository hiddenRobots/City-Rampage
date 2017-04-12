export default function (state = false, action) {
  switch (action.type) {
    case 'SET_SUBMITTED':
      return action.hasBeenSubmitted;
    default:
      return state;
  }
}
