import { Product } from './Product.class'
import { Event } from './Event.class'
import * as _ from "lodash";

export class Actor {

    id: string;
    name: string;

    products: Product[];
    events?: Event[];

    constructor(id, name, products, events?) {
        this.id = id
        this.name = name
        this.products = products
        if (events)
            this.events = events
    }
    
    public static fake(): Actor {
        return new Actor('id-actor', 
                        'actor-name', 
                        _.times(5, _.constant(Product.fake()))
                    )
    }
    
}