import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AnimalService} from './shared/service/animal.service';
import {CommonModule} from '@angular/common';
import {FeedService} from './shared/service/feed.service';
import {UserService} from './shared/service/user.service';
import {VaccineService} from './shared/service/vaccine.service';
import {VetVisitService} from './shared/service/vet-visit.service';
import {WalkService} from './shared/service/walk.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const rootRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pets', loadChildren: './pets/pets.module#PetsModule'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(rootRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [AnimalService, FeedService, UserService, VaccineService, VetVisitService, WalkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
