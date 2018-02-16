import { GoodDeals } from './../types/GoodDeals.class';
import { Injectable } from '@angular/core';
import { Event } from '../types/Event.class';
import { Product } from '../types/Product.class';
import { Club } from '../types/Club.class';
import { Competition } from '../types/Competition.class';
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
      this.lat = position.coords.latitude; 
      this.lon = position.coords.longitude;
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

  public getMostRelevantEvents() {
    /*
    return [
      new Tile(Competition.fake()),
      new Tile(Event.fake()),
      new Tile(Club.fake()),
      new Tile(Competition.fake()),
      new Tile(Club.fake()),
      new Tile(Event.fake()),
      new Tile(GoodDeals.fake())
    ]*/
    return this.getAllEvents();
  }
  
  public login(user: User) {
    this.userLogged$.next(user);
  }

  public getUserLogged() {
    return this.userLogged$;
  }

  getPosition() {
    return { 'lat': this.lat,
             'lon': this.lon
           }
  }


  
}
