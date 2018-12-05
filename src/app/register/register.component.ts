import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../shared/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'photo': new FormControl()
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log(reader);
      reader.onload = () => {
        this.registerForm.get('photo').setValue(reader.result.split(',')[1]); // splits after comma to remove data:image...
      };
    }
  }

  onSubmit() {
    this.userService.createUser(this.registerForm.value).subscribe(value => {
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
    });
  }
}
