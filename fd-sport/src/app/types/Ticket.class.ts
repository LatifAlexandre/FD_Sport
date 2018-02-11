import { Product } from '../types/Product.class';
import { Event } from '../types/Event.class';
import { Price } from './Price.class';

export class Ticket extends Product {

    event: Event;

    constructor(id, name, price, stock, description, pictureLink, event){
        super(id, name, price, stock, description, pictureLink);
        this.event = event;
    }

    public static fake(): Ticket {
        return new Ticket(
            'id-ticket', 
            'ticket-name',
            Price.fake(), 
            10, 
            'description', 
            'url',
            Event.fake(false) );
    } 
}