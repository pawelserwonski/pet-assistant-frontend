import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AnimalService} from '../../shared/service/animal.service';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {
  animalId: number;
  editMode = false;

  name = '';
  birthDate = new Date();
  breed = '';
  species = '';
  photo: string;
  petForm: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private route: ActivatedRoute,
              private animalService: AnimalService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.animalId = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.petForm.value);
    this.petForm.get('photo').setValue(this.photo);
    this.editMode
      ? this.animalService.updateAnimal(this.petForm.value, this.animalId).subscribe(value => {
        this.animalService.animalsCollectionChanged.next();
        this.router.navigate(['../../', value.id], {relativeTo: this.route});
      })
      : this.animalService.createAnimal(this.petForm.value).subscribe(value => {
        this.animalService.animalsCollectionChanged.next();
        this.router.navigate(['../', value.id], {relativeTo: this.route});
      });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log(reader);
      reader.onload = () => {
        this.photo = reader.result.split(',')[1]; // splits after comma to remove data:image...
      };
    }
  }

  private async initForm() {
    this.createFormGroup();
    if (this.editMode) {
      const animal = await this.animalService.getAnimal(this.animalId).toPromise();
      this.name = animal.name;
      this.breed = animal.breed;
      this.birthDate = animal.birthDate;
      this.species = animal.species;
      this.photo = animal.photo;

      this.createFormGroup();
    }
  }

  private createFormGroup() {
    this.petForm = new FormGroup({
      'name': new FormControl(this.name, Validators.required),
      'birthDate': new FormControl(this.birthDate, Validators.required),
      'breed': new FormControl(this.breed, Validators.required),
      'species': new FormControl(this.species, Validators.required),
      'photo': new FormControl()
    });
  }
}
