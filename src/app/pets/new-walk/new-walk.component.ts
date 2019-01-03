import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WalkService} from '../../shared/service/walk.service';
import {WeekDay} from '@angular/common';
import {WalkUnit} from '../../shared/enum/walk-unit.enum';

@Component({
  selector: 'app-new-walk',
  templateUrl: './new-walk.component.html',
  styleUrls: ['./new-walk.component.css']
})
export class NewWalkComponent implements OnInit {
  walkForm: FormGroup;
  daysOfWeekForm: FormGroup;
  animalId: number;
  walkId: number;
  editMode: boolean;
  lengthUnitKeys = Object.keys(WalkUnit);
  weekDaysKeys = Object.keys(WeekDay).slice(Object.keys(WeekDay).length / 2);

  startDate = new Date();
  endDate = new Date();
  startTime = new Date();
  walkLength: number;
  walkLengthUnit = '';

  constructor(private route: ActivatedRoute, private router: Router, private walkService: WalkService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animalId = +params['id'];
      this.walkId = +params['walkId'];
      this.editMode = params['walkId'] != null;
      this.initForm();
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
    this.walkForm.get('daysOfWeek').setValue(selectedDays);
    if (this.editMode) {
      this.walkService.updateWalk(this.walkForm.value, this.walkId).subscribe(value => {
        this.router.navigate(['pets', this.animalId]);
      });
    } else {
      this.walkForm.get('walkedOutAnimal').setValue({id: this.animalId});
      console.log(this.walkForm.value);
      this.walkService.createWalk(this.walkForm.value).subscribe(value => {
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
    const walk = await this.walkService.getWalk(this.walkId).toPromise();
    this.startDate = walk.startDate;
    this.endDate = walk.endDate;
    this.startTime = walk.startTime;
    this.walkLength = walk.walkLength;
    this.walkLengthUnit = walk.walkLengthUnit;

    this.createFormGroup();
  }

  private createFormGroup() {
    this.walkForm = new FormGroup({
      'walkedOutAnimal': new FormControl(),
      'startDate': new FormControl(this.startDate, Validators.required),
      'endDate': new FormControl(this.endDate, Validators.required),
      'startTime': new FormControl(this.startTime, Validators.required),
      'daysOfWeek': new FormControl(),
      'walkLength': new FormControl(this.walkLength, Validators.required),
      'walkLengthUnit': new FormControl(this.walkLengthUnit, Validators.required)
    });
  }
}
