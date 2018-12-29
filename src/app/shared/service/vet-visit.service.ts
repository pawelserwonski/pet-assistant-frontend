import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {VetVisit} from '../model/vet-visit.model';
import {Observable} from 'rxjs';

const vetVisitControllerUrl = environment.apiEndpoint + '/vet';

@Injectable()
export class VetVisitService {
  constructor(private httpClient: HttpClient) {
  }

  public createVetVisit(vetVisit: VetVisit): Observable<VetVisit> {
    return this.httpClient.post<VetVisit>(vetVisitControllerUrl, vetVisit);
  }

  public deleteVetVisit(id: number) {
    return this.httpClient.delete(vetVisitControllerUrl + `/${id}`);
  }

  public getVetVisit(id: number): Observable<VetVisit> {
    return this.httpClient.get<VetVisit>(vetVisitControllerUrl + `/${id}`);
  }

  public updateVetVisit(vetVisit: VetVisit, id: number) {
    return this.httpClient.put(vetVisitControllerUrl + `/${id}`, vetVisit);
  }
}
