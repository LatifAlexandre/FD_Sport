import { Injectable } from '@angular/core';
import { Event } from '../types/Event.class';
import { Club } from '../types/Club.class';
import { Competition } from '../types/Competition.class';

// class used to give datas
@Injectable()
export class SandboxService {

  public getEvent() {
    return Event.fake();
  }

  public getClub() {
    return Club.fake();
  }

  public getCompetition()  {
    return Competition.fake();
  }
  
  
}
