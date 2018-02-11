import {Location} from './Location.class';
import { Actor } from './Actor.class';
import { Club } from './Club.class';
import { Ticket } from './Ticket.class';
import * as _ from "lodash";

export class Event {
    id: string;
    name: string;

    date: Date;
    location: Location;
    description: string;

    actors: Actor[];
    tickets?: Ticket[];

    pictureLink: string;

    constructor(id: string, name: string, date: Date, 
        location: Location, description: string, actors: Actor[], 
          pictureLink: string, tickets?: Ticket[],) {
            this.id = id;
            this.name = name;
            this.date = date;
            this.location = location;
            this.description = description;
            this.actors = actors;
            this.tickets = tickets;
            this.pictureLink = pictureLink;
    }

    public static fake(withTickets = true): Event {

        if (withTickets) {
            return new Event(
                'id-event', 
                'event-name', 
                new Date(),  
                Location.fake(),  
                'description of the event', 
                _.times(2, _.constant(Club.fake())),  
                'https://steamuserimages-a.akamaihd.net/ugc/37493678745406690/DCF9081F4EEB735FE747DDB76940D7E448A9EAFB/',
                _.times(2, _.constant(Ticket.fake()))
            ) 
        } else {
            return new Event(
                'id-event', 
                'event-name', 
                new Date(),  
                Location.fake(),  
                'description of the event', 
                _.times(2, _.constant(Club.fake())),  
                'https://steamuserimages-a.akamaihd.net/ugc/37493678745406690/DCF9081F4EEB735FE747DDB76940D7E448A9EAFB/',
            ) 
        }
        
    }
}