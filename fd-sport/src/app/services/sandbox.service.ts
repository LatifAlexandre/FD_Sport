import { Competition } from './../types/Competition.class';
import { GoodDeals } from './../types/GoodDeals.class';
import { Injectable } from '@angular/core';
import { Event } from '../types/Event.class';
import { Product } from '../types/Product.class';
import { Club } from '../types/Club.class';
import { Ticket } from '../types/Ticket.class';
import { Tile } from '../types/Tile.class';
import { User } from '../types/User.class';
import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import  'rxjs/add/observable/combineLatest';
import  'rxjs/add/operator/map';

// class used to give datas
@Injectable()
export class SandboxService {

  private userLogged$: Subject<User> = new Subject();
  public userLogged: User;

  lat: number;
  lon: number;
  

  constructor(private http: HttpClient) {
    this.userLogged$.subscribe( val => {
      this.userLogged = val;
    });

    navigator.geolocation.getCurrentPosition((position) => { 
        this.lat = position.coords.latitude,
        this.lon = position.coords.longitude
     });
  }

  public getClub(id: string) {
    return Club.fake();
  }

  public getMyClubs() {
    return _.times(3, _.constant(Club.fake()));
  }


  public getGoodDeals(): Observable<GoodDeals>  {
    //return GoodDeals.fake();
    return Observable.combineLatest(
      this.http.get<any[]>('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/ticket/read/getGoodDeals.php'),
      this.http.get<any[]>('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/product/read/getGoodDeals.php')
    )
    .map( ([ticketsObject, productsObject]) => {
      let tickets: Ticket[] = ticketsObject.map( ticket => Ticket.from(ticket));
      let products: Ticket[] = productsObject.map( product => Product.from(product));
      return new GoodDeals(tickets, products);
    })
  }

  public getAllEvents(){
    return this.http.get<any[]>('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/event/read/getAll.php')
  }

  public getProduct(id: string): Observable<Product> {
    // return Product.fake()
    return this.http.get<any>('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/product/read/getById.php?id='+id)
      .map( productObject => Product.from(productObject))
  }

  public getTicket(id: string): Observable<Ticket> {
    return this.http.get<any>('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/ticket/read/getById.php?id='+id)
      .map( ticketObject => Ticket.from(ticketObject))
  }

  // https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/user/read/getAll.php
  public getAllUsers(): Observable<User[]> {
    return this.http.get<any[]>('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/user/read/getAll.php')
        .map( (userObjects: any[]) => {
          return userObjects.map( userObj => User.from(userObj))
        })
  }


  

  getMostRelevantEvents() {
    // url construtcion
    let url: string = 'https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/event/read/getRelevant.php?';
    if (this.userLogged) {
      url += `userId=${this.userLogged.id}`
    }
    if (this.userLogged && this.lat && this.lon) {
      url += `&`
    }
    if (this.lat && this.lon) {
      url += `lon=${this.lon}&lat=${this.lat}`;
    }
    return this.http.get<any[]>(url).map( eventsObj => eventsObj.map( eventObj => Event.from(eventObj)));
  }

  getMostRelevantClubs(): Observable<Club[]> {
    // url construtcion
    let url: string = 'https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/actor/read/getRelevant.php?';
    if (this.lat && this.lon) {
      url += `&lon=${this.lon}&lat=${this.lat}`;
    }
    console.log(url)
    return this.http.get<any[]>(url).map( clubsObj => clubsObj.map( clubObj => Club.from(clubObj)));
  }

  getMostRelevantCompetitions(): Observable<Competition[]> {
    // url construtcion
    let url: string = 'https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/competition/read/getRelevant.php?';
    if (this.lat && this.lon) {
      url += `&lon=${this.lon}&lat=${this.lat}`;
    }
    console.log(url)
    return this.http.get<any[]>(url).map( compsObj => compsObj.map( compObj => Competition.from(compObj)));
  }

  
  public getMostReleventTiles(): Observable<Tile[]> {
   return Observable.combineLatest(this.getMostRelevantEvents(), 
                                   this.getMostRelevantClubs(),
                                   this.getMostRelevantCompetitions())
          .map( ([events, clubs, competitions]) => {
      let tileEvents = events.map( event =>new Tile(event));
      let tileClubs = clubs.map( club =>new Tile(club));
      let tileCompetitions = competitions.map( competition =>new Tile(competition));
      return [...tileEvents, ...tileClubs, ...tileCompetitions];
   })
  }
  
  public login(user: User) {
    this.userLogged$.next(user);
  }

  public getUserLogged() {
    return this.userLogged$;
  }

  getPosition() {
    
    return {
      lat: this.lat,
      lon: this.lon
    };
  }


  
}
