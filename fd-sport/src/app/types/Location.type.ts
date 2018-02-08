export interface Location {
    id: string;
    name: string;
    
    coo: {
        long: number;
        lat: number;
    }
}