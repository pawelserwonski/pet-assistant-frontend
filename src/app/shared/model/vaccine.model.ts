import {Animal} from './animal.model';

export class Vaccine {
  id: number;
  vaccinatedAnimal?: Animal;
  visitDate: Date;
  sicknessType: string;
  location: string;
}
