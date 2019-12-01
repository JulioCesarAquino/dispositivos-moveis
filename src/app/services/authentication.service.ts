import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

import { NavController } from '@ionic/angular';

@Injectable()
export class AuthenticateService {

  constructor(
    private navCtrl: NavController,
    private storage: Storage) { }

  registerUser(value) {
    localStorage.setItem('loggedEmail', value.email.split('@')[0].split('.')[0]);
    localStorage.setItem('fullLoggedEmail', value.email);
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  loginUser(value) {
    localStorage.setItem('loggedEmail', value.email.split('@')[0].split('.')[0]);
    localStorage.setItem('fullLoggedEmail', value.email);
    firebase.database().ref('ranking/' + localStorage.getItem('loggedEmail')).once('value').then((snapshot) => {
      localStorage.setItem('scoreActual', snapshot.val().score);
    });
    localStorage.setItem('scoreActual', '0');
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            console.log('LOG Out');
            this.navCtrl.navigateForward('/login');
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    });
  }

  userDetails() {
    return firebase.auth().currentUser;
  }
}
