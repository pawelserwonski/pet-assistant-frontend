import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {VaccineService} from '../../shared/service/vaccine.service';

@Component({
  selector: 'app-new-vaccine',
  templateUrl: './new-vaccine.component.html',
  styleUrls: ['./new-vaccine.component.css']
})
export class NewVaccineComponent implements OnInit {
  vaccineForm: FormGroup;
  animalId: number;
  vaccineId: number;
  editMode: boolean;

  visitDate = new Date;
  sicknessType = '';
  location = '';

  constructor(private route: ActivatedRoute, private router: Router, private vaccineService: VaccineService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animalId = +params['id'];
      this.vaccineId = +params['vaccineId'];
      this.editMode = params['vaccineId'] != null;
      this.initForm();
    });

  }

  onSubmit() {
    if (this.editMode) {
      this.vaccineService.updateVaccine(this.vaccineForm.value, this.vaccineId).subscribe(value => {
        this.router.navigate(['pets', this.animalId]);
      });
    } else {
      this.vaccineForm.get('vaccinatedAnimal').setValue({id: this.animalId});
      this.vaccineService.createVaccine(this.vaccineForm.value).subscribe(value => {
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
    const vaccine = await this.vaccineService.getVaccine(this.vaccineId).toPromise();
    this.visitDate = vaccine.visitDate;
    this.sicknessType = vaccine.sicknessType;
    this.location = vaccine.location;

    this.createFormGroup();
  }

  private createFormGroup() {
    this.vaccineForm = new FormGroup({
      'vaccinatedAnimal': new FormControl(),
      'visitDate': new FormControl(this.visitDate, Validators.required),
      'sicknessType': new FormControl(this.sicknessType, Validators.required),
      'location': new FormControl(this.location, Validators.required)
    });
  }
}
