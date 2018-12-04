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
  vetVisitForm: FormGroup;
  animalId: number;

  constructor(private route: ActivatedRoute, private router: Router, private vetVisitService: VetVisitService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animalId = +params['id'];
    });
    this.vetVisitForm = new FormGroup({
      'animal': new FormControl(),
      'visitDate': new FormControl('', Validators.required),
      'reason': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'vetOpinion': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.vetVisitForm.get('animal').setValue({id: this.animalId});
    console.log(this.vetVisitForm.value);
    this.vetVisitService.createVetVisit(this.vetVisitForm.value).subscribe(value => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }
}
