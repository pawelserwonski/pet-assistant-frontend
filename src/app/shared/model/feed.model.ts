import {Animal} from './animal.model';
import {FodderUnit} from '../enum/fodder-unit.enum';

export class Feed {
  id: number;
  fedAnimal?: Animal;
  fodderType: string;
  portionSize: number;
  portionSizeUnit: FodderUnit;
  time: Date;
}
