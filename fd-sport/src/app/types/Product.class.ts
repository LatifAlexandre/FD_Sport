import { Price } from './Price.class';

export class Product {

    id: string;
    name: string;
    price: Price;
    stock: number;
    description: string;
    pictureLink: string;

    constructor(id, name, price, stock, description, pictureLink) {

        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
        this.pictureLink = pictureLink;

    }

    public static fake(): Product {
        return new Product('id', 
        'product name', 
        Price.fake(), 
        10, 
        'description', 
        'https://ol-boutique-cdn-2.azureedge.net/9258-large_default/maillot-ol-training-bleu-2017-18.jpg'
        )
    } 

}