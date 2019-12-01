import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExplainTeacherPage } from './explain-teacher.page';

const routes: Routes = [
  {
    path: '',
    component: ExplainTeacherPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExplainTeacherPage]
})
export class ExplainTeacherPageModule {}
