import { Product } from '../types/Product.class';
import { Event } from '../types/Event.class';
import { Price } from './Price.class';

export class Ticket {

    id: string;
    name: string;
    price: Price;
    stock: number;
    description: string;
    pictureLink: string;

    relatedProducts?: Product[];
    relatedTickets?: Ticket[];

    event?: Event;

    constructor(id, name, price, stock, description, pictureLink, event?, relatedProducts?, relatedTickets?){
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.pictureLink = pictureLink;
        this.relatedProducts = relatedProducts;
        this.relatedTickets = relatedTickets;
        this.event = event;
    }

    public static from(value): Ticket {


        return new Ticket(
            value.id,
            value.name,
            new Price(value.price, value.reduction),
            value.stock,
            value.description,
            value.pictureLink,
            value.event ? Event.from(value.event) : undefined,
            value.relatedProducts ? value.relatedProducts.map( product => Product.from(product)) : undefined,
            value.relatedTickets ? value.relatedTickets.map( ticket => Ticket.from(ticket)) : undefined,
        )
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