import { Actor } from './Actor.type';

export interface Club extends Actor {
    location: Location;
    favorite: boolean;
}