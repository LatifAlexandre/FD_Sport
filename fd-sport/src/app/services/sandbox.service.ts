import { Injectable } from '@angular/core';
import { Event } from '../types/Event.class';
import { Product } from '../types/Product.class';
import { Club } from '../types/Club.class';
import { Competition } from '../types/Competition.class';
import { GoodDeals } from '../types/GoodDeals.class';
import { Ticket } from '../types/Ticket.class';
import { Tile } from '../types/Tile.class';
import * as _ from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/observable/combineLatest';
// import  'rxjs/add/operator/map';

// class used to give datas
@Injectable()
export class SandboxService {

  constructor(private http: HttpClient) {
  }



  public getClub(id: string) {
    return Club.fake();
  }

  public getMyClubs() {
    return _.times(3, _.constant(Club.fake()));
  }


  public getGoodDeals()  {
    //return GoodDeals.fake();
    return Observable.combineLatest(
      this.http.get<any[]>('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/ticket/read/getGoodDeals.php'),
      this.http.get<any[]>('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/product/read/getGoodDeals.php')
    )
      
  }

  public getAllEvents(){
    return this.http.get<any[]>('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/event/read/getAll.php')
  }

  public getProduct(id: string) {
    // return Product.fake()
    let str = 'https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/product/read/getById.php?id='+id;
    return this.http.get<any>(str)
  }

  public getTicket(id: string) {
    let str = 'https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/ticket/read/getById.php?id='+id;
    return this.http.get<any>(str)
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

  
}
