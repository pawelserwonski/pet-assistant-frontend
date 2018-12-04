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

  constructor(private route: ActivatedRoute, private router: Router, private feedService: FeedService) {
  }

  ngOnInit() {
    this.feedForm = new FormGroup({
      'fedAnimal': new FormControl(),
      'fodderType': new FormControl('', Validators.required),
      'portionSize': new FormControl('', Validators.required),
      'portionSizeUnit': new FormControl('', Validators.required),
      'time': new FormControl('', Validators.required)
    });
    this.route.params.subscribe(params => {
      this.animalId = +params['id'];
    });
  }

  fodderUnitKeys(): Array<string> {
    const keys = Object.keys(FodderUnit);
    return keys;
  }

  onSubmit() {
    this.feedForm.get('fedAnimal').setValue({id: this.animalId});
    console.log(this.feedForm);
    this.feedService.createFeed(this.feedForm.value).subscribe(value => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }
}
