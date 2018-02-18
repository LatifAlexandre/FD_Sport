import { Club } from './Club.class';

export class User {
    id: string;
    username: string;
    password: string;
    favoriteClubs: Club[];

    public static from( value ) {
        return new User(
            value.id,
            value.username,
            value.password,
            value.favoriteclubs ? value.favoriteclubs.map( clubObject => Club.from(clubObject)) : undefined
        )
    }

    constructor(id, username, password, favoriteClubs?) {
        this.id = id,
        this.username = username,
        this.password = password,
        this.favoriteClubs = favoriteClubs
    }
}