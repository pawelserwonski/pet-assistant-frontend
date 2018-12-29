import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetsComponent} from './pets.component';
import {PetsDetailsComponent} from './pets-details/pets-details.component';
import {PetsListComponent} from './pets-list/pets-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {NewPetComponent} from './new-pet/new-pet.component';
import {NewFeedComponent} from './new-feed/new-feed.component';
import {NewVaccineComponent} from './new-vaccine/new-vaccine.component';
import {NewVetVisitComponent} from './new-vet-visit/new-vet-visit.component';
import {NewWalkComponent} from './new-walk/new-walk.component';
import {AuthGuard} from '../auth/auth.guard';

const petsRoutes: Routes = [
  {
    path: '', component: PetsComponent, canActivate: [AuthGuard], children: [
      {path: 'new', component: NewPetComponent, canActivate: [AuthGuard]},
      {path: 'edit/:id', component: NewPetComponent, canActivate: [AuthGuard]},
      {path: ':id', component: PetsDetailsComponent, canActivate: [AuthGuard]},
      {path: ':id/feed', component: NewFeedComponent, canActivate: [AuthGuard]},
      {path: ':id/walk', component: NewWalkComponent, canActivate: [AuthGuard]},
      {path: ':id/vaccine', component: NewVaccineComponent, canActivate: [AuthGuard]},
      {path: ':id/vetvisit', component: NewVetVisitComponent, canActivate: [AuthGuard]}
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(petsRoutes)
  ],
  declarations: [PetsComponent, PetsDetailsComponent, PetsListComponent,
    NewPetComponent, NewFeedComponent, NewVaccineComponent, NewVetVisitComponent, NewWalkComponent]
})
export class PetsModule {
}
