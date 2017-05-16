import { database } from '../firebase';

export const sendMessage = messageData => (dispatch, getState) => {
  const gid = getState().auth.gid;
  const game = database.ref(`games/${gid}`);
  game.child('messages').push({ id: messageData.id, text: messageData.text });
}
;