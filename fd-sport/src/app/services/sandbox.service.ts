import { Injectable } from '@angular/core';
import { Event } from '../types/Event.class';
import { Product } from '../types/Product.class';
import { Club } from '../types/Club.class';
import { Competition } from '../types/Competition.class';
import { GoodDeals } from '../types/GoodDeals.class';
import { Ticket } from '../types/Ticket.class';
import * as _ from 'lodash';

// class used to give datas
@Injectable()
export class SandboxService {

  public getEvent() {
    return Event.fake();
  }

  public getClub(id: string) {
    return Club.fake();
  }

  public getMyClubs() {
    return _.times(3, _.constant(Club.fake()));
  }

  public getCompetition()  {
    return Competition.fake();
  }

  public getGoodDeals()  {
    return GoodDeals.fake();
  }

  public getProduct(id: string) {
    return Product.fake()
  }

  public getTicket(id: string) {
    return Ticket.fake();
  }

  // get information related to an event from its id
  // get information related to a product from its id
  // get information related to a competition from its id
  // get information related to a actor from its id

  // research ?

  // return a set of n tiles according to :
  //   - geolocalisation
  
  // return my favorite clubs
  
}
