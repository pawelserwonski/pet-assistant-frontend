import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetsComponent} from './pets.component';
import {PetsDetailsComponent} from './pets-details/pets-details.component';
import {PetsListComponent} from './pets-list/pets-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {NewPetComponent} from './new-pet/new-pet.component';

const petsRoutes: Routes = [
  {
    path: '', component: PetsComponent, children: [
      {path: 'new', component: NewPetComponent},
      {path: ':id', component: PetsDetailsComponent},
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(petsRoutes)
  ],
  declarations: [PetsComponent, PetsDetailsComponent, PetsListComponent, NewPetComponent]
})
export class PetsModule {
}
