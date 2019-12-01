import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChooseQuestMethodPage } from './choose-quest-method.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseQuestMethodPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChooseQuestMethodPage]
})
export class ChooseQuestMethodPageModule {}
