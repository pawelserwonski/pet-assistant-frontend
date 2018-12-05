import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AnimalService} from './shared/service/animal.service';
import {CommonModule} from '@angular/common';
import {FeedService} from './shared/service/feed.service';
import {UserService} from './shared/service/user.service';
import {VaccineService} from './shared/service/vaccine.service';
import {VetVisitService} from './shared/service/vet-visit.service';
import {WalkService} from './shared/service/walk.service';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {LoggedOffGuard} from './auth/logged-off.guard';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TokenStorage} from './auth/token-storage';
import {AuthInterceptor} from './auth/auth.interceptor';
import {AuthService} from './auth/auth.service';

const rootRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoggedOffGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoggedOffGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoggedOffGuard]},
  {path: 'pets', loadChildren: './pets/pets.module#PetsModule', canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(rootRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [AnimalService, FeedService, UserService, VaccineService, VetVisitService, WalkService, TokenStorage, AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
