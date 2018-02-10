import {Location} from './Location.class';
import { Actor } from './Actor.class';
import { Club } from './Club.class';
import { Product } from './Product.class';
import { Ticket } from './Ticket.class';
import * as _ from "lodash";

export class Event {
    id: string;
    name: string;

    date: Date;
    location: Location;
    description: string;

    actors: Actor[];
    products: Product[];
    ticket: Ticket;

    constructor(id: string, name: string, date: Date, 
        location: Location, description: string, actors: Actor[], 
        products: Product[], ticket: Ticket) {
            this.id = id;
            this.name = name;
            this.date = date;
            this.location = location;
            this.description = description;
            this.actors = actors;
            this.products = products;
            this.ticket = ticket;

    }

    public static fake(): Event {
        return new Event(
            'id-event', 
            'event-name', 
            new Date(),  
            Location.fake(),  
            'description of the event', 
            _.times(2, _.constant(Club.fake())),  
            _.times(5, _.constant(Product.fake())), 
            Ticket.fake()
        ) 
    }
}