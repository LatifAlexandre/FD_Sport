import { Product } from '../types/Product.class';
import { Price } from './Price.class';

export class Ticket extends Product {
    // for now, a ticket is similar to a product ?

    constructor(id, name, price, stock, description, pictureLink){
        super(id, name, price, stock, description, pictureLink);
    }

    public static fake(): Product {
        return new Product('id-ticket', 'ticket-name', Price.fake(), 10, 'description', 'url');
    } 
}