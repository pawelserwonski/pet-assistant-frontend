import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimalService} from '../../shared/service/animal.service';
import {PetsListComponent} from '../pets-list/pets-list.component';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {
  petForm: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private route: ActivatedRoute,
              private animalService: AnimalService,
              private router: Router) {
  }

  ngOnInit() {
    this.petForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'birthDate': new FormControl('', Validators.required),
      'breed': new FormControl('', Validators.required),
      'species': new FormControl('', Validators.required),
      'photo': new FormControl()
    });
  }

  onSubmit() {
    console.log(this.petForm.value);
    this.animalService.createAnimal(this.petForm.value).subscribe(value => {
      this.router.navigate(['../', value.id], {relativeTo: this.route});
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log(reader);
      reader.onload = () => {
        this.petForm.get('photo').setValue(reader.result.split(',')[1]); // splits after comma to remove data:image...
      };
    }
  }
}
