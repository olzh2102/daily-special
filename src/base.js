import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDQSn0h0aIUTdB9Gmgz9ZuiMA_6GhBJdNc",
  authDomain: "daily-special-3e63c.firebaseapp.com",
  databaseURL: "https://daily-special-3e63c.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
