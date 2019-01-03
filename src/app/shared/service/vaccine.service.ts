import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vaccine} from '../model/vaccine.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const vaccineControllerUrl = environment.apiEndpoint + '/vaccine';

@Injectable()
export class VaccineService {
  constructor(private httpClient: HttpClient) {

  }

  public createVaccine(vaccine: Vaccine): Observable<Vaccine> {
    return this.httpClient.post<Vaccine>(vaccineControllerUrl, vaccine);
  }

  public deleteVaccine(id: number) {
    return this.httpClient.delete(vaccineControllerUrl + `/${id}`);
  }

  public getVaccine(id: number): Observable<Vaccine> {
    return this.httpClient.get<Vaccine>(vaccineControllerUrl + `/${id}`);
  }

  public updateVaccine(vaccine: Vaccine, id: number) {
    return this.httpClient.put(vaccineControllerUrl + `/${id}`, vaccine);
  }
}
