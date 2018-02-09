export class Location {
    id: string;
    name: string;
    
    coo: {
        long: number;
        lat: number;
    };
    
    constructor(id, name, long, lat) {
        this.id = id;
        this.name = name;
        this.coo = {
            long: long,
            lat: lat
        }
    }

    public static fake(): Location {
        return new Location('id', 'location-name', 0,0);
    }
}