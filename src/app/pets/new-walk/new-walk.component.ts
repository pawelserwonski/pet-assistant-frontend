import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WalkService} from '../../shared/service/walk.service';
import {WeekDay} from '@angular/common';
import {WalkUnit} from '../../shared/enum/walk-unit.enum';
import index from '@angular/cli/lib/cli';

@Component({
  selector: 'app-new-walk',
  templateUrl: './new-walk.component.html',
  styleUrls: ['./new-walk.component.css']
})
export class NewWalkComponent implements OnInit {
  walkForm: FormGroup;
  daysOfWeekForm: FormGroup;
  animalId: number;
  lengthUnitKeys = Object.keys(WalkUnit);
  weekDaysKeys = Object.keys(WeekDay).slice(Object.keys(WeekDay).length / 2);

  constructor(private route: ActivatedRoute, private router: Router, private walkService: WalkService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animalId = +params['id'];
    });
    this.walkForm = new FormGroup({
      'walkedOutAnimal': new FormControl(),
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
      'startTime': new FormControl('', Validators.required),
      'daysOfWeek': new FormControl(),
      'walkLength': new FormControl('', Validators.required),
      'walkLengthUnit': new FormControl('', Validators.required)
    });
    this.daysOfWeekForm = new FormGroup({});
    this.weekDaysKeys.forEach(day => {
      this.daysOfWeekForm.addControl(day, new FormControl(false));
    });
  }


  onSubmit() {
    console.log(this.daysOfWeekForm.value);
    let selectedDays = [];
    Object.values(this.daysOfWeekForm.value).forEach((item, index) => {
      if (item == true) {
        selectedDays.push(this.weekDaysKeys[index].toUpperCase());
      }
    });
    this.walkForm.get('walkedOutAnimal').setValue({id: this.animalId});
    this.walkForm.get('daysOfWeek').setValue(selectedDays);
    console.log(this.walkForm.value);
    this.walkService.createWalk(this.walkForm.value).subscribe(value => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }
}
