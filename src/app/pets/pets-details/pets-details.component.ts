import {Component, OnDestroy, OnInit} from '@angular/core';
import {Animal} from '../../shared/model/animal.model';
import {AnimalService} from '../../shared/service/animal.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {VetVisit} from '../../shared/model/vet-visit.model';
import {FeedService} from '../../shared/service/feed.service';
import {WalkService} from '../../shared/service/walk.service';
import {VaccineService} from '../../shared/service/vaccine.service';
import {VetVisitService} from '../../shared/service/vet-visit.service';

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
              public domSanitizer: DomSanitizer,
              private feedService: FeedService,
              private walkService: WalkService,
              private vaccineService: VaccineService,
              private vetVisitService: VetVisitService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.petId = +params['id'];
      this.getAnimalDetails();
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  private getAnimalDetails() {
    this._selectedVetVisit = null;
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    this.serviceSubscription = this.animalService.getAnimal(this.petId).subscribe((animal: Animal) => {
      this.pet = animal;
    }, error => {
      this.router.navigate(['not-found']);
    });
  }

  get selectedVetVisit(): VetVisit {
    return this._selectedVetVisit;
  }

  set selectedVetVisit(value: VetVisit) {
    this._selectedVetVisit = value;
  }

  onNewFeed() {
    this.router.navigate(['feed'], {relativeTo: this.route});
  }

  onNewWalk() {
    this.router.navigate(['walk'], {relativeTo: this.route});
  }

  onNewVaccine() {
    this.router.navigate(['vaccine'], {relativeTo: this.route});
  }

  onNewVetVisit() {
    this.router.navigate(['vetvisit'], {relativeTo: this.route});
  }

  onDeleteFeed(id: number) {
    this.feedService.deleteFeed(id).subscribe(() => {
      this.getAnimalDetails();
    });
  }

  onDeleteWalk(id: number) {
    this.walkService.deleteWalk(id).subscribe(() => {
      this.getAnimalDetails();
    });
  }

  onDeleteVaccine(id: number) {
    this.vaccineService.deleteVaccine(id).subscribe(() => {
      this.getAnimalDetails();
    });
  }

  onDeleteVetVisit(id: number) {
    this.vetVisitService.deleteVetVisit(id).subscribe(() => {
      this.getAnimalDetails();
    });
  }

  onEditVisit(id: number) {
    this.router.navigate(['vetvisit', 'edit', id], {relativeTo: this.route});
  }

  onEditFeed(id: number) {
    this.router.navigate(['feed', 'edit', id], {relativeTo: this.route});
  }

  onEditWalk(id: number) {
    this.router.navigate(['walk', 'edit', id], {relativeTo: this.route});
  }

  onEditVaccine(id: number) {
    this.router.navigate(['vaccine', 'edit', id], {relativeTo: this.route});
  }
}
