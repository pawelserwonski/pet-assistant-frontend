import {Component, OnDestroy, OnInit} from '@angular/core';
import {Animal} from '../../shared/model/animal.model';
import {AnimalService} from '../../shared/service/animal.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {Vaccine} from '../../shared/model/vaccine.model';
import {VetVisit} from '../../shared/model/vet-visit.model';

@Component({
  selector: 'app-pets-details',
  templateUrl: './pets-details.component.html',
  styleUrls: ['./pets-details.component.css']
})
export class PetsDetailsComponent implements OnInit, OnDestroy {
  private serviceSubscription: Subscription;
  private routeSubscription: Subscription;

  pet: Animal;
  petId: number;
  private _selectedVetVisit: VetVisit;

  constructor(private animalService: AnimalService,
              private route: ActivatedRoute,
              private router: Router,
              public domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.petId = +params['id'];
      this.serviceSubscription = this.animalService.getAnimal(this.petId).subscribe((animal: Animal) => {
        this.pet = animal;
      });
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  get selectedVetVisit(): VetVisit {
    return this._selectedVetVisit;
  }
  set selectedVetVisit(value: VetVisit) {
    this._selectedVetVisit = value;
  }
}
