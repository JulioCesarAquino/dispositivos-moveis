import { Component, OnInit, Input, ɵConsole } from '@angular/core';

import { NavController, ModalController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@Component({
  selector: 'app-choose-quest-method',
  templateUrl: './choose-quest-method.page.html',
  styleUrls: ['./choose-quest-method.page.sass'],
})
export class ChooseQuestMethodPage implements OnInit {

  @Input() nameClass: string;

  public nameClassToShow: string;
  public questionRandom;
  public question;
  public timeRemain = '00:00';
  public haveQuestion = '';
  public count = 1;

  constructor(
    navParams: NavParams,
    private nav: NavController,
    private modalCtrl: ModalController,
    public alertController: AlertController,
    private storage: Storage,
  ) {
    this.nameClassToShow = navParams.get('nameClass');
    localStorage.setItem('classname', this.nameClassToShow.substr(0, 1));
  }

  ngOnInit() { }

  ionViewWillEnter() {
    setTimeout(() => {
      this.selectQuestion();
      this.haveQuestion = localStorage.getItem('haveQuest');
    }, 300);
    setTimeout(() => {
      if (this.haveQuestion !== '1') {
        this.presentAlertNoQuest();
        this.closeModal();
      }
    }, 400);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectQuestion() {
    const myObj = JSON.parse(localStorage.getItem('questionJSON'));
    console.log(Object.values(myObj)[Math.floor((Math.random() * Object.values(myObj).length) + 0)]);
    this.questionRandom = Object.values(myObj)[Math.floor((Math.random() * Object.values(myObj).length) + 0)];
    this.questCounter();
  }

  questCounter(flag = 0) {
    let sec = 120;
    let counterSec;

    if (flag === 0) {
      counterSec = setInterval(() => {
        this.timeRemain = `${this.pad(sec--)}`;
      }, 1000);
      setTimeout(() => {
        clearInterval(counterSec);
      }, 120000);
    } else if (flag === 1) {
      console.log('parou');
      clearInterval(counterSec);
    }
  }

  pad(val) {
    return val > 9
      ? val
      : '0' + val;
  }

  replyQuestion(result) {
    console.log(typeof (result));
    const nameLogged = localStorage.getItem('loggedEmail'); // + '@'[0]
    const fullNameLogged = localStorage.getItem('fullLoggedEmail');
    if (result === true) {
      this.presentAlert();
      this.closeModal();
      firebase.database().ref('ranking/' + nameLogged).once('value').then((snapshot) => {
        localStorage.setItem('scoreActual', snapshot.val().score);
      });
      firebase.database().ref('ranking/' + nameLogged).set({
        score: Number(localStorage.getItem('scoreActual')) + 1,
        nameChapa: fullNameLogged,
      });
    } else if (result === false) {
      this.presentAlertLoose();
    }
    this.questCounter(1);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Parabéns!',
      subHeader: 'Pontuação +1',
      message: 'Voce acertou a questão!',
      buttons: ['Fechar']
    });

    await alert.present();
  }

  async presentAlertLoose() {
    if (this.count === 1) {
      const alert = await this.alertController.create({
        header: `Dica 1`,
        subHeader: 'Se chegar na terceira dica você perde um ponto!',
        message: `${this.questionRandom.dic1}`,
        buttons: ['Fechar']
      });

      await alert.present();
      this.count = 2;
    } else if (this.count === 2) {
      this.count = 3;
      const alert = await this.alertController.create({
        header: `Dica 2`,
        subHeader: 'Se chegar na terceira dica você perde um ponto!',
        message: `${this.questionRandom.dic2}`,
        buttons: ['Fechar']
      });

      await alert.present();
    } else if (this.count === 3) {
      const alert = await this.alertController.create({
        header: `Dica 3`,
        subHeader: 'Se chegar na terceira dica você perde um ponto!',
        message: `${this.questionRandom.dic3}`,
        buttons: ['Fechar']
      });

      await alert.present();
      this.count = 4;
    } else if (this.count === 4) {
      const alerterror = await this.alertController.create({
        header: `Errou muitas vezes!`,
        message: `Você perdeu um ponto! Está com: ${Number(localStorage.getItem('scoreActual')) - 1} agora`,
        buttons: ['Fechar']
      });
      await alerterror.present();
      localStorage.setItem('scoreActual', (Number(localStorage.getItem('scoreActual')) - 1).toString());
      const nameLogged = localStorage.getItem('loggedEmail'); // + '@'[0]
      firebase.database().ref('ranking/' + nameLogged).set({
        score: Number(localStorage.getItem('scoreActual')),
      });
      this.count = 0;
      this.closeModal();
    } else {

    }
  }

  async presentAlertNoQuest() {
    const alert = await this.alertController.create({
      header: `Sem questões`,
      subHeader: 'Contate seu professor',
      message: `Não existem questões registradas no/a ${this.nameClassToShow}.`,
      buttons: ['Fechar']
    });

    await alert.present();
  }
}
