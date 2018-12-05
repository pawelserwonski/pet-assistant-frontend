import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
  }

  onLogout() {
    this._authService.logout();
  }


  get authService(): AuthService {
    return this._authService;
  }
}
