import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'classes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../classes/classes.module').then(m => m.ClassesPageModule)
          }
        ]
      },
      {
        path: 'ranking',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../ranking/ranking.module').then(m => m.RankingPageModule)
          }
        ]
      },
      {
        path: 'register-quest',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../register-quest/register-quest.module').then(m => m.RegisterQuestPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/classes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/classes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
