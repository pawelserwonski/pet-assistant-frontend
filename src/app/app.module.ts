import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AnimalService} from './shared/service/animal.service';
import {CommonModule} from '@angular/common';

const rootRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'pets', loadChildren: './pets/pets.module#PetsModule'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(rootRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [AnimalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
