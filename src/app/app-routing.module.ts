import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'choose-quest-method', loadChildren: './choose-quest-method/choose-quest-method.module#ChooseQuestMethodPageModule' },
  { path: 'explain', loadChildren: './explain/explain.module#ExplainPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },  { path: 'explain-teacher', loadChildren: './explain-teacher/explain-teacher.module#ExplainTeacherPageModule' },
  { path: 'questshows', loadChildren: './questshows/questshows.module#QuestshowsPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
