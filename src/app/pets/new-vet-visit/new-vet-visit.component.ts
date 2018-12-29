import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {VetVisitService} from '../../shared/service/vet-visit.service';

@Component({
  selector: 'app-new-vet-visit',
  templateUrl: './new-vet-visit.component.html',
  styleUrls: ['./new-vet-visit.component.css']
})
export class NewVetVisitComponent implements OnInit {
  animalId: number;
  visitId: number;
  editMode: boolean;

  vetVisitForm: FormGroup;
  visitDate = new Date();
  reason = '';
  location = '';
  vetOpinion = '';

  constructor(private route: ActivatedRoute, private router: Router, private vetVisitService: VetVisitService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animalId = +params['id'];
      this.visitId = +params['visitId'];
      this.editMode = params['visitId'] != null;
      this.initForm();
    });

  }

  onSubmit() {
    if (this.editMode) {
      this.vetVisitService.updateVetVisit(this.vetVisitForm.value, this.visitId).subscribe(value => {
        this.router.navigate(['pets', this.animalId]);
      });
    } else {
      this.vetVisitForm.get('animal').setValue({id: this.animalId});
      console.log(this.vetVisitForm.value);
      this.vetVisitService.createVetVisit(this.vetVisitForm.value).subscribe(value => {
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    }
  }

  private initForm() {
    this.createFormGroup();

    if (this.editMode) {
      this.initEditForm();
    }
  }

  private async initEditForm() {
    const vetVisit = await this.vetVisitService.getVetVisit(this.visitId).toPromise();
    this.visitDate = vetVisit.visitDate;
    this.vetOpinion = vetVisit.vetOpinion;
    this.reason = vetVisit.reason;
    this.location = vetVisit.location;

    this.createFormGroup();
  }

  private createFormGroup() {
    this.vetVisitForm = new FormGroup({
      'animal': new FormControl(),
      'visitDate': new FormControl(this.visitDate, Validators.required),
      'reason': new FormControl(this.reason, Validators.required),
      'location': new FormControl(this.location, Validators.required),
      'vetOpinion': new FormControl(this.vetOpinion, Validators.required)
    });
  }
}
