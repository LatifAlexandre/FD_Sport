import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../../types/Tile.class';

import { Club } from '../../types/Club.class';
import { Event } from '../../types/Event.class';
import { Competition } from '../../types/Competition.class';
import { GoodDeals } from '../../types/GoodDeals.class';

@Component({
  selector: 'app-tile',
  template: `
 
    <app-tile-club *ngIf="isClub()" [club]="tile.data">
    </app-tile-club>

    <app-tile-competition *ngIf="isCompetition()" [competition]="tile.data">
    </app-tile-competition>

    <app-tile-event *ngIf="isEvent()" [event]="tile.data">
    </app-tile-event>

    <app-tile-good-deals *ngIf="isGoodDeals()" [goodDeals]="tile.data">
    </app-tile-good-deals>
  `,
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() tile: Tile;

  constructor() { }

  ngOnInit() {
  }

  isClub() {
    return this.tile.data instanceof Club
  }
  isEvent() {
    return this.tile.data instanceof Event
  }
  isCompetition() {
    return this.tile.data instanceof Competition
  }
  isGoodDeals() {
    return this.tile.data instanceof GoodDeals
  }

}
