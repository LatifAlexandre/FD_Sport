import { Interest } from './Interest.class';
import { Competition } from './Competition.class';
import { Event } from './Event.class';
import { Club } from './Club.class';
import { GoodDeals } from './GoodDeals.class';

export class Tile {
    data: Competition | Event | Club | GoodDeals | Interest;
    expanded: boolean;

    constructor(data: Competition | Event | Club | GoodDeals | Interest, expanded: boolean = false) {
        this.data = data;
        this.expanded = expanded; //Math.random() >= 0.5;
    }

    getTile(expanded) {
        return new Tile(this.data, expanded);
    }
}