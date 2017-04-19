import { auth, database, googleAuthProvider } from '../firebase';
// import {addUser} from './users';
import pick from 'lodash/pick';
import { startListeningGameChanges } from './game';


const usersRef = database.ref('users');

export const signIn = () => (dispatch) => {
  dispatch({ type: 'ATTEMPTING_LOGIN' });
  auth.signInWithPopup(googleAuthProvider);
};

export const signOut = uid => (dispatch) => {
  dispatch({ type: 'ATTEMPTING_LOGIN' });
  database.ref(`users/${uid}`).child('currentlyOn').set(false);
  auth.signOut();
};

const signedIn = user => ({
  type: 'SIGN_IN',
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  uid: user.uid,
  gid: user.currentGame,
});

const signedOut = () => ({
  type: 'SIGN_OUT',
});

export const startListeningToAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(signedIn(user));

      const gameIdVal = '';
      const obj = '';
      database.ref(`users/${user.uid}/currentGame`).once('value', (gameId) => {
        if (gameId.val() !== undefined || gameId.val() !== '') {
          gameIdVal = gameId.val();
        }
      }).then(() => {
        obj = Object.assign({}, pick(user, ['displayName', 'photoURL', 'email', 'uid']), {
          currentlyOn: true,
          currentGame: gameIdVal,
        });
        usersRef.child(user.uid).set(obj);
        dispatch(signedIn(obj));
        dispatch(startListeningGameChanges());
      });
    } else {
      dispatch(signedOut());
    }
  });
};

