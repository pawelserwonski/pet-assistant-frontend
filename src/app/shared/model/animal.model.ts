import {User} from './user.model';
import {Vaccine} from './vaccine.model';
import {Walk} from './walk.model';
import {Feed} from './feed.model';
import {Disease} from './disease.model';
import {VetVisit} from './vet-visit.model';

export class Animal {
  id: number;
  owner?: User;
  species: string;
  breed: string;
  birthDate: Date;
  name: string;
  photo: string;
  vaccines: Array<Vaccine> = [];
  walks: Array<Walk> = [];
  feeds: Array<Feed> = [];
  diseasesHistory: Array<Disease> = [];
  vetVisitsHistory: Array<VetVisit> = [];
}
