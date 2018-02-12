import { Competition } from './Competition.class';
import { Event } from './Event.class';
import { Club } from './Club.class';
import { GoodDeals } from './GoodDeals.class';

export class Tile {
    data: Competition | Event | Club | GoodDeals;
    collapsed: boolean;

    constructor(data: Competition | Event | Club | GoodDeals, collapsed: boolean = true) {
        this.data = data;
        this.collapsed = collapsed
    }
}