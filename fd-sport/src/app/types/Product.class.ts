import { Price } from './Price.class';
import { Ticket } from './Ticket.class';
import * as _ from 'lodash';

export class Product {

    id: string;
    name: string;
    price: Price;
    stock: number;
    description: string;
    pictureLink: string;

    relatedProducts?: Product[];
    relatedTickets?: Ticket[];

    constructor(id, name, price, stock, description, pictureLink, relatedProducts?, relatedTickets?) {

        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.pictureLink = pictureLink;
        this.relatedProducts = relatedProducts;
        this.relatedTickets = relatedTickets
    }

    public static fake(withRelated = true): Product {
        if (withRelated) {
            return new Product('id', 
            'product name', 
            Price.fake(), 
            10, 
            'lorem ipsum dorlor sit amet lorem ipsum dorlor sit amet lorem ipsum dorlor sit amet lorem ipsum dorlor sit amet ', 
            'https://ol-boutique-cdn-2.azureedge.net/9258-large_default/maillot-ol-training-bleu-2017-18.jpg',
            _.times(3, _.constant(Product.fake(false)))
            //_.times(5, _.constant(Ticket.fake())),
            )
            
        } else {
            return new Product('id', 
                'product name', 
                Price.fake(), 
                10, 
                'description', 
                'https://ol-boutique-cdn-2.azureedge.net/9258-large_default/maillot-ol-training-bleu-2017-18.jpg'
            )
        }
        
    } 

}