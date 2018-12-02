import {Animal} from './animal.model';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
  password: string;
  animals: Array<Animal> = [];
}
