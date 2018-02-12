import { Injectable } from '@angular/core';
import { Event } from '../types/Event.class';
import { Product } from '../types/Product.class';
import { Club } from '../types/Club.class';
import { Competition } from '../types/Competition.class';
import { GoodDeals } from '../types/GoodDeals.class';
import { Ticket } from '../types/Ticket.class';
import { Tile } from '../types/Tile.class';
import * as _ from 'lodash';

// class used to give datas
@Injectable()
export class SandboxService {


  public getClub(id: string) {
    return Club.fake();
  }

  public getMyClubs() {
    return _.times(3, _.constant(Club.fake()));
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

  public getMostRelevantTiles(): Tile[] {
    return [
      new Tile(Competition.fake()),
      //new Tile(Competition.fake()),
      new Tile(Club.fake()),
      new Tile(Event.fake()),
      new Tile(GoodDeals.fake())
    ]
  }

  
}
