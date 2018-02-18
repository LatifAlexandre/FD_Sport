export class Profile {
    axes: {'name': string; 'value': number}[];
    id: string;
        
    constructor(axes, id) {
        this.axes = axes;
        this.id = id;
    }

    public static from(value): Profile {
        let axes = []
        for (let key in value) {
            if (key != 'id') {
                axes.push( {
                    'name': key,
                    'value': value[key]
                })
            }
        }
        return new Profile(axes, value['id'])
    }
}
