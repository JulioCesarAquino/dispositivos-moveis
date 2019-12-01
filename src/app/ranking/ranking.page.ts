import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-ranking',
  templateUrl: 'ranking.page.html',
  styleUrls: ['ranking.page.sass']
})
export class RankingPage implements OnInit {

  public arrRanking = [];

  constructor() { }

  ngOnInit(): void { }

  ionViewWillEnter() {
    this.selectRanking();
  }

  selectRanking() {
    firebase.database().ref('ranking/').orderByChild('score').once('value').then((snapshot) => {
      localStorage.setItem('rankingJSON', JSON.stringify(snapshot.val()));
    });

    this.arrRanking = Object.values(JSON.parse(localStorage.getItem('rankingJSON')));
    console.log(this.arrRanking);
  }

}
