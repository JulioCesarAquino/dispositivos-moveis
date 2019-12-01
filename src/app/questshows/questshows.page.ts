import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-questshows',
  templateUrl: './questshows.page.html',
  styleUrls: ['./questshows.page.sass'],
})
export class QuestshowsPage implements OnInit {

  public questions: {}[];
  public questionsResps: {}[];

  constructor(
    navParams: NavParams,
    private nav: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getQuestData();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  getQuestData() {
    firebase.database().ref('questions/').once('value').then((snapshot) => {
      // snapshot.val().isTeacher === true
      this.questions = Object.entries(snapshot.val());
      console.log(this.questions);
    });
  }

}
