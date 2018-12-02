import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsComponent } from './pets.component';
import { PetsDetailsComponent } from './pets-details/pets-details.component';
import { PetsListComponent } from './pets-list/pets-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

const petsRoutes: Routes = [
  {path: '', component: PetsComponent, children: [
      {path: ':id', component: PetsDetailsComponent}
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(petsRoutes)
  ],
  declarations: [PetsComponent, PetsDetailsComponent, PetsListComponent]
})
export class PetsModule { }
