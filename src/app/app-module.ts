import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { App } from './app';
import { HomePage } from './features/series/pages/home-page/home-page';
import { DetailPage } from './features/series/pages/detail-page/detail-page';
import { EpisodePage } from './features/series/pages/episode-page/episode-page';
import { ActorPage } from './features/series/pages/actor-page/actor-page';
import { SeriesList } from './features/series/components/series-list/series-list';
import { SeriesCard } from './features/series/components/series-card/series-card';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [
    App,
    HomePage,
    DetailPage,
    EpisodePage,
    ActorPage,
    SeriesList,
    SeriesCard,
  ],
  imports: [
  BrowserModule,
  CommonModule,
  HttpClientModule,
  AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
