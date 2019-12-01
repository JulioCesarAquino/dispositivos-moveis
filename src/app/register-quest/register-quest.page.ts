
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuestshowsPage } from '../questshows/questshows.page';
import { Register } from './shared/register';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-quest',
  templateUrl: 'register-quest.page.html',
  styleUrls: ['register-quest.page.sass']
})
export class RegisterQuestPage {

  @Input() quest: string;
  @Input() answerOne: string;
  @Input() answerTwo: string;
  @Input() answerTree: string;
  @Input() correctAnswer: string;
  @Input() serie: string;

  numChild: string;

  public classesArr: {
    seriesName: string,
    serieId: number
  }[];

  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Campo obrigatorio.' },
      { type: 'pattern', message: 'Entre com um email valido .' }
    ],
    password: [
      { type: 'required', message: 'Campo obrigatorio.' },
      { type: 'minlength', message: 'A senha deve ter mais de 5 caracteres.' }
    ]
  };

  constructor(
    private register: Register,
    public modalController: ModalController,
    public alertController: AlertController
  ) {
    this.classesArr = [
      { seriesName: `7° Série`, serieId: 7 },
      { seriesName: `8° Série`, serieId: 8 },
      { seriesName: `9° Série`, serieId: 9 },
      { seriesName: `1° Ano`, serieId: 1 },
      { seriesName: `2° Ano`, serieId: 2 },
      { seriesName: `3° Ano`, serieId: 3 }
    ];
  }

  insertQuest() {
    const min = Math.ceil(0);
    const max = Math.floor(1000);
    firebase.database().ref('questions/' + this.register.serie.substr(0, 1) + '/' + Math.floor(Math.random() * (min - max)) + min).set({
      quest: this.register.quest,
      answerOne: this.register.answerOne,
      answerTwo: this.register.answerTwo,
      answerTree: this.register.answerTree,
      correctAnswer: this.register.isOne,
      isOne: this.register.isOne,
      isTwo: this.register.isTwo,
      isTree: this.register.isTree,
      dic1: this.register.dic1,
      dic2: this.register.dic2,
      dic3: this.register.dic3,
    });
    this.register.quest = '';
    this.register.answerOne = '';
    this.register.answerTwo = '';
    this.register.answerTree = '';
    this.register.dic1 = '';
    this.register.dic2 = '';
    this.register.dic3 = '';
    this.register.isOne = false;
    this.register.isTwo = false;
    this.register.isTree = false;

    this.presentAlert();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: QuestshowsPage
    });
    return await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Questão cadastrada com sucesso!',
      buttons: ['Fechar']
    });

    await alert.present();
  }
}
