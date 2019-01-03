import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedService} from '../../shared/service/feed.service';
import {FodderUnit} from '../../shared/enum/fodder-unit.enum';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css'],
})
export class NewFeedComponent implements OnInit {
  feedForm: FormGroup;
  animalId: number;
  feedId: number;
  editMode: boolean;

  fodderType = '';
  portionSize: number;
  portionSizeUnit = '';
  time = new Date();

  constructor(private route: ActivatedRoute, private router: Router, private feedService: FeedService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.animalId = +params['id'];
      this.feedId = +params['feedId'];
      this.editMode = params['feedId'] != null;
      this.initForm();
    });
  }

  fodderUnitKeys(): Array<string> {
    const keys = Object.keys(FodderUnit);
    return keys;
  }

  onSubmit() {
    if (this.editMode) {
      this.feedService.updateFeed(this.feedForm.value, this.feedId).subscribe(value => {
        this.router.navigate(['pets', this.animalId]);
      });
    } else {
      this.feedForm.get('fedAnimal').setValue({id: this.animalId});
      console.log(this.feedForm);
      this.feedService.createFeed(this.feedForm.value).subscribe(value => {
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
    const feed = await this.feedService.getFeed(this.feedId).toPromise();
    this.fodderType = feed.fodderType;
    this.portionSize = feed.portionSize;
    this.portionSizeUnit = feed.portionSizeUnit;
    this.time = feed.time;

    this.createFormGroup();
  }

  private createFormGroup() {
    this.feedForm = new FormGroup({
      'fedAnimal': new FormControl(),
      'fodderType': new FormControl(this.fodderType, Validators.required),
      'portionSize': new FormControl(this.portionSize, Validators.required),
      'portionSizeUnit': new FormControl(this.portionSizeUnit, Validators.required),
      'time': new FormControl(this.time, Validators.required)
    });
  }
}
