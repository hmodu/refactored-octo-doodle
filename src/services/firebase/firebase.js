import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from '../../config/firebaseConfig';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // Auth API
  signUp = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  sendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_EMAIL_CONFIRMATION_REDIRECT
    });

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  signOut = () => this.auth.signOut();

  // Database API
  addUser = (uid, userData) =>
    this.db
      .collection('users')
      .doc(uid)
      .set(userData);

  getUser = uid =>
    this.db
      .collection('users')
      .doc(uid)
      .get();
}

export default Firebase;
