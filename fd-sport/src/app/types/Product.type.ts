export interface Product {

    id: string;
    name: string;

    price: number;
    reduction?: number; // percentage of reduction on the price, between 0 and 1
    stock: number;

    description: string;

    pictureLink: string;
}