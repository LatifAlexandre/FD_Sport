import { Product } from './Product.type'

export interface Competition {
    
    id: string;
    name: string;

    startDate: Date;
    endDate: Date;
    
    products: Product[];
    events: Event[];
}