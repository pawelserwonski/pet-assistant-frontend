import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Animal} from '../model/animal.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const animalControllerUrl = environment.apiEndpoint + '/animal';

@Injectable()
export class AnimalService {
  constructor(private httpClient: HttpClient) {
  }

  // post request
  public createAnimal(animal: Animal): Observable<Animal> {
    return this.httpClient.post<Animal>(animalControllerUrl, animal);
  }

  public getAnimals(): Observable<Animal[]> {
    return this.httpClient.get<Animal[]>(animalControllerUrl);
  }

  public getAnimal(id: number): Observable<Animal> {
    return this.httpClient.get<Animal>(animalControllerUrl + `/${id}`);
  }

  public deleteAnimal(id: number) {
    return this.httpClient.delete(animalControllerUrl + `/${id}`);
  }

  public updateAnimal(animal: Animal, animalId: number) {
    return this.httpClient.put<Animal>(animalControllerUrl + `/${animalId}`, animal);
  }
}
