import { Actor } from '../types/Actor.class'
import { Product } from '../types/Product.class';
import { Location } from '../types/Location.class';
import * as _ from "lodash";

export class Club extends Actor {
    location: Location;
    favorite: boolean;

    constructor(id, name, products, location, favorite, events?) {
        console.log(events)
            super(id, name, products, events);

        this.location = location;
        this.favorite = favorite;
    }

    public static fake(): Club {
        return new Club(
            'id-club',  
            'club-name', 
            _.times(5, _.constant(Product.fake())), 
            Location.fake(), 
            true
        )
    }
}