import {Location} from './Location.type';
import { Actor } from './Actor.type';

export interface Event {

    id: string;
    name: string;

    date: Date;
    location: Location;
    description: string;

    actors: Actor[];
}