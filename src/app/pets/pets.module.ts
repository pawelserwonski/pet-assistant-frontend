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

const petsRoutes: Routes = [
  {
    path: '', component: PetsComponent, children: [
      {path: 'new', component: NewPetComponent},
      {path: ':id', component: PetsDetailsComponent},
      {path: ':id/feed', component: NewFeedComponent},
      {path: ':id/walk', component: NewWalkComponent},
      {path: ':id/vaccine', component: NewVaccineComponent},
      {path: ':id/vetvisit', component: NewVetVisitComponent}
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
