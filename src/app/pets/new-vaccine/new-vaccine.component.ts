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

  constructor(private route: ActivatedRoute, private router: Router, private vaccineService: VaccineService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animalId = +params['id'];
    });
    this.vaccineForm = new FormGroup({
      'vaccinatedAnimal': new FormControl(),
      'visitDate': new FormControl('', Validators.required),
      'sicknessType': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.vaccineForm.get('vaccinatedAnimal').setValue({id: this.animalId});
    this.vaccineService.createVaccine(this.vaccineForm.value).subscribe(value => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }
}
