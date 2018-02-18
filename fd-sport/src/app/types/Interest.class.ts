import { Ticket } from './Ticket.class';
import { Product } from './Product.class';
import * as _ from 'lodash';

export class Interest {

    tickets: Ticket[];
    products: Product[];

    constructor( tickets: Ticket[], products: Product[]) {
        this.tickets = tickets;
        this.products = products;
    }

    public static fake(): Interest {
        return new Interest(
            _.times(5, _.constant(Ticket.fake())),
            _.times(5, _.constant( Product.fake())),
        )
    }

    isEmpty() {
        console.log(this.tickets.length + this.products.length)
        return this.tickets.length + this.products.length !== 0;
    }
}