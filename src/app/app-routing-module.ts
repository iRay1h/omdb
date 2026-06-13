import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './features/series/pages/home-page/home-page';
import { DetailPage } from './features/series/pages/detail-page/detail-page';
import { EpisodePage } from './features/series/pages/episode-page/episode-page';
import { ActorPage } from './features/series/pages/actor-page/actor-page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'detail/:id',
    component: DetailPage
  },
  {
    path: 'episode/:id',
    component: EpisodePage
  },
  {
    path: 'actor/:name',
    component: ActorPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}