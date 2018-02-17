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

    pictureLink: string;

    constructor(id, name, startDate, endDate, products, events, pictureLink) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.products = products;
        this.events = events;
        this.pictureLink = pictureLink;
    }

    public static from( value ) {
        return new Competition(
            value.id,
            value.name,
            value.startDate,
            value.endDate,
            value.products ? value.products.map( prodObj => Product.from(prodObj)) : undefined,
            value.events ? value.events.map( eventObj => Event.from(eventObj)) : undefined,
            value.pictureLink
        )
    }

    public static fake(): Competition {

        return new Competition('id', 
            'competition-name', 
            new Date(), 
            new Date(), 
            _.times(3,_.constant(Product.fake())),  
            _.times(3, _.constant(Event.fake())),
            'https://upload.wikimedia.org/wikipedia/fr/f/f7/FIFA_World_Cup_2018_Logo.png'
        )
    }
}