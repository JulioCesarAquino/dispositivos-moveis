import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Storage } from '@ionic/storage';
import { Register } from './register';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private db: AngularFireDatabase,
    private storage: Storage) { }

  insert(contato: Register) {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('register/' + userId).set({
      isTeacher: contato.isTeacher,
    });
    const nameLogged = localStorage.getItem('loggedEmail');
    const fullNameLogged = localStorage.getItem('fullLoggedEmail');
    firebase.database().ref('ranking/' + nameLogged.split('.')[0]).set({
      score:  0,
      nameChapa: fullNameLogged,
    });
  }
}
