import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, JwtToken} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });

    this.authService.logout();
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((response: JwtToken) => {
        this.authService.storeToken(response);
        this.router.navigate(['/pets']);
        this.authService.refreshPermissions();
        this.authService.fetchUserName();
      },
      error => console.log(error)
    );
  }
}
