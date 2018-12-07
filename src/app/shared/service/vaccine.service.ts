import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vaccine} from '../model/vaccine.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const vaccineControlllerUrl = environment.apiEndpoint + '/vaccine';

@Injectable()
export class VaccineService {
  constructor(private httpClient: HttpClient) {

  }

  public createVaccine(vaccine: Vaccine): Observable<Vaccine> {
    return this.httpClient.post<Vaccine>(vaccineControlllerUrl, vaccine);
  }

  public deleteVaccine(id: number) {
    return this.httpClient.delete(vaccineControlllerUrl + `/${id}`);
  }
}
