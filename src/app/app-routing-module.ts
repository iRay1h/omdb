import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './features/series/pages/home-page/home-page';
import { DetailPage } from './features/series/pages/detail-page/detail-page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'detail/:id',
    component: DetailPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}