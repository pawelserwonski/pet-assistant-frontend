import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {TokenStorage} from './token-storage';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {User} from '../shared/model/user.model';

const loginControllerUrl = environment.apiEndpoint + '/signin';
const userControllerUrl = environment.apiEndpoint + '/user';

export interface JwtToken {
  token: string;
  type: string;
}

@Injectable()
export class AuthService {
  jwtService: JwtHelperService;
  permissionChanged: ReplaySubject<boolean>;
  sub: Subscription;

  constructor(private storage: TokenStorage, private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.jwtService = new JwtHelperService();
    this.permissionChanged = new ReplaySubject<boolean>();
  }

  isUserLogged(): boolean {
    const token = this.storage.getToken();
    return token != null && !this.jwtService.isTokenExpired(token);
  }

  login(body: Object): Observable<any> {
    return this.httpClient.post(loginControllerUrl, body);
  }

  storeToken(token: JwtToken) {
    console.log('store token');
    console.log(token.token);
    this.storage.saveToken(token.token);
  }

  logout() {
    this.storage.signOut();
    localStorage.removeItem('profile');
    this.sub.unsubscribe();
    this.router.navigate(['']);
  }

  fetchUserName() {
    this.sub = this.getLoggedUser().subscribe(
      user => localStorage.setItem('user', JSON.stringify(user)),
      error => console.log(error)
    );
  }

  refreshPermissions() {
    this.permissionChanged.next(true);
  }

  public getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  private getLoggedUser(): Observable<User> {
    return this.httpClient.get<User>(userControllerUrl);
  }

}
