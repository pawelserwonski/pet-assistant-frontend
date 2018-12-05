import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';
import {Observable} from 'rxjs';

const userControllerUrl = environment.apiEndpoint + '/user';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(userControllerUrl, user);
  }

}
