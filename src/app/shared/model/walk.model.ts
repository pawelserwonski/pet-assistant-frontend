import {Animal} from './animal.model';
import {WeekDay} from '@angular/common';
import {WalkUnit} from '../enum/walk-unit.enum';

export class Walk {
    id: number;
    walkedOutAnimal?: Animal;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    daysOfWeek: Array<WeekDay> = [];
    walkLength: number;
    walkLengthUnit: WalkUnit;
}
