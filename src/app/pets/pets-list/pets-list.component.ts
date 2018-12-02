import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnimalService} from '../../shared/service/animal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Animal} from '../../shared/model/animal.model';
import {Subscription} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent implements OnInit, OnDestroy {
  pets: Animal[];
  subscription: Subscription;

  constructor(private animalService: AnimalService, private router: Router, private route: ActivatedRoute,
              public domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getPets();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPets() {
    this.subscription = this.animalService.getAnimals().subscribe(
      (animals: Animal[]) => {
        this.pets = animals;
      }
    );
  }

  onNewPet() {

  }
}
