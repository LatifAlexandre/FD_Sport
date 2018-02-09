import { Product } from './Product.class'
import { Event } from './Event.class'
import * as _ from 'lodash';

export class Competition {
    
    id: string;
    name: string;

    startDate: Date;
    endDate: Date;
    
    products: Product[];
    events: Event[];

    constructor(id, name, startDate, endDate, products, events) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.products = products;
        this.events = events;
    }

    public static fake(): Competition {

        return new Competition('id', 
            'competition-name', 
            new Date(), 
            new Date(), 
            _.times(5,
            _.constant(Product.fake())),  
            _.times(5, _.constant(Event.fake()))
        )
    }
}