import {Animal} from './animal.model';

export class Disease {
  id: number;
  sickAnimal?: Animal;
  startDate: Date;
  endDate: Date;
  type: string;
  description: string;
}
