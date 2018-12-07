import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Walk} from '../model/walk.model';
import {Observable} from 'rxjs';

const walkControllerUrl = environment.apiEndpoint + '/walk';

@Injectable()
export class WalkService {
  constructor(private httpClient: HttpClient) {
  }

  public createWalk(walk: Walk): Observable<Walk> {
    return this.httpClient.post<Walk>(walkControllerUrl, walk);
  }

  public deleteWalk(id: number) {
    return this.httpClient.delete(walkControllerUrl + `/${id}`);
  }
}
