import { Product } from './Product.class';
import { Actor } from '../types/Actor.class'
import { Event } from '../types/Event.class';
import { Location } from '../types/Location.class';
import * as _ from "lodash";

export class Club  {

    id: string;
    name: string;

    products: Product[];
    events?: Event[];

    pictureLink: string;

    location: Location;
    favorite: boolean;

    constructor(id, name, products, pictureLink, location, favorite,  events?) {
        
        this.id = id;
        this.name = name;
        this.products = products;
        this.pictureLink = pictureLink;
        if (events)
            this.events = events;

        this.location = location;
        this.favorite = favorite;
    }

    public static from(value) {
        console.log(value)
        return new Club(
            value.id,
            value.name,
            value.products ? value.products.map( prodObj => Product.from(prodObj)) : undefined,
            value.pictureLink,
            new Location(0, value.locationName, value.longitude, value.latitude),
            false,
            value.events ? value.events.map( eventObj => Event.from(eventObj)) : undefined
        )
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