import { Actor } from '../types/Actor.class'
import { Product } from '../types/Product.class';
import { Location } from '../types/Location.class';
import * as _ from "lodash";

export class Club extends Actor {
    location: Location;
    favorite: boolean;

    constructor(id, name, products, pictureLink, location, favorite,  events?) {
        super(id, name, products, pictureLink, events);
        this.location = location;
        this.favorite = favorite;
    }

    public static fake(): Club {
        return new Club(
            'id-club',  
            'club-name', 
            _.times(1, _.constant(Product.fake())),
            'https://pbs.twimg.com/profile_images/883733518920146944/5_8m_2MK.jpg',
            Location.fake(), 
            true
        )
    }
}