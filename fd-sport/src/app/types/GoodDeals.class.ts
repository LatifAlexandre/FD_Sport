import { Ticket } from './Ticket.class';
import { Product } from './Product.class';
import * as _ from 'lodash';

export class GoodDeals {

    tickets: Ticket[];
    products: Product[];

    constructor( tickets: Ticket[], products: Product[]) {
        this.tickets = tickets;
        this.products = products;
    }

    public static fake(): GoodDeals {
        return new GoodDeals(
            _.times(5, _.constant(Ticket.fake())),
            _.times(5, _.constant( Product.fake())),
        )
    }
}