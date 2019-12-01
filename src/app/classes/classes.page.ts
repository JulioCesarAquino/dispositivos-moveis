import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChooseQuestMethodPage } from '../choose-quest-method/choose-quest-method.page';
import { AuthenticateService } from '../services/authentication.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-classes',
  templateUrl: 'classes.page.html',
  styleUrls: ['classes.page.sass']
})
export class ClassesPage {

  public classesArr: {
    seriesName: string,
    seriesClassification: string,
    serieId: number
  }[];

  constructor(
    public modalController: ModalController,
    private authService: AuthenticateService
    ) {
    this.classesArr = [
      {
        seriesName: `7° Série`,
        seriesClassification: `Fundamental`,
        serieId: 7
      },
      {
        seriesName: `8° Série`,
        seriesClassification: `Fundamental`,
        serieId: 8
      },
      {
        seriesName: `9° Série`,
        seriesClassification: `Fundamental`,
        serieId: 9
      },
      {
        seriesName: `1° Ano`,
        seriesClassification: `Ensino medio`,
        serieId: 1
      },
      {
        seriesName: `2° Ano`,
        seriesClassification: `Ensino medio`,
        serieId: 2
      },
      {
        seriesName: `3° Ano`,
        seriesClassification: `Ensino medio`,
        serieId: 3
      }
    ];
  }

  getQuestData(id) {
    firebase.database().ref('questions/' + id).once('value').then((snapshot) => {
      if (snapshot.val() !== null) {
        localStorage.setItem('haveQuest', '1');
        localStorage.setItem('questionJSON', JSON.stringify(snapshot.val()));
      } else {
        localStorage.setItem('haveQuest', '0');
        // tslint:disable-next-line: max-line-length
        localStorage.setItem('questionJSON', '{"-4740":{"answerOne":"","answerTree":"","answerTwo":"","correctAnswer":false,"isOne":false,"isTree":false,"isTwo":true,"quest":""}');
      }
    });
  }

  async presentModalChooseMethod(name: string, id: number) {
    this.getQuestData(id);
    const modal = await this.modalController.create({
      component: ChooseQuestMethodPage,
      componentProps: {
        nameClass: name,
        idClass: id
      }
    });
    return await modal.present();
  }

  logoutUserLogged() {
    this.authService.logoutUser();
  }
}
