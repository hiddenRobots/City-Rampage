import firebase from 'firebase';
import config from '../config.js';

firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();

const marketRef = database.ref('/market');

export const addCardToHand = (buyerHash, card) => database.ref(`/users/${buyerHash}/hand`).push(card);

export const updateMarket = copy => marketRef.set(copy);

export const getMarket = _ => new Promise((resolve, reject) => {
  marketRef.once('value', (snapshot) => {
    const copy = snapshot.val();
    // No error handling :(
    resolve(copy);
  });
});

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
