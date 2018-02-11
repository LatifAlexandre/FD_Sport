import { Product } from './Product.class'
import { Event } from './Event.class'
import * as _ from "lodash";

export class Actor {

    id: string;
    name: string;

    products: Product[];
    events?: Event[];

    pictureLink: string;

    constructor(id, name, products, pictureLink, events?) {
        this.id = id;
        this.name = name;
        this.products = products;
        this.pictureLink = pictureLink;
        if (events)
            this.events = events
    }
    
    public static fake(): Actor {
        return new Actor(
            'id-actor', 
            'actor-name', 
             _.times(5, _.constant(Product.fake(false))),
             'https://pbs.twimg.com/profile_images/883733518920146944/5_8m_2MK.jpg'

        )
    }
    
}