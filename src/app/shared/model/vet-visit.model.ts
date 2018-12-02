import {Animal} from './animal.model';

export class VetVisit {
    id: number;
    animal?: Animal;
    visitDate: Date;
    reason: string;
    location: string;
    vetOpinion: string;
}
