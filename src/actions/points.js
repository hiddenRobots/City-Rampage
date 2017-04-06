import { database } from '../firebase';

export const increasePoints = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let points;
     database.ref(`users/${uid}`).once('value', (snapshot) => {
       points = snapshot.val().stats.points;
       console.log(points);
     });
     points += 1;
     database.ref(`users/${uid}/stats/points`).set(points);
   };


export const decreasePoints = uid =>
  // do some stuff in firebase
   (dispatch) => {
     let points;
     database.ref(`users/${uid}`).once('value', (snapshot) => {
       points = snapshot.val().stats.points;
       console.log(points);
     });
     points -= 1;
     database.ref(`users/${uid}/stats/points`).set(points);
   };

