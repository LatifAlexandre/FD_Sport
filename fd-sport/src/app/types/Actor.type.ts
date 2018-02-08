import { Product } from './Product.type';
import { Event } from './Event.type';

export interface Actor {

    id: string;
    name: string;

    products: Product[];
    events: Event[];
}