import { Interest } from './../../types/Interest.class';
import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../../types/Tile.class';

import { Club } from '../../types/Club.class';
import { Event } from '../../types/Event.class';
import { Competition } from '../../types/Competition.class';
import { GoodDeals } from '../../types/GoodDeals.class';

@Component({
  selector: 'app-tile',
  template: `
    <app-tile-club [expanded]="tile.expanded" *ngIf="isClub()" [club]="tile.data">
      chargement...
    </app-tile-club>

    <app-tile-competition [expanded]="tile.expanded" *ngIf="isCompetition()" [competition]="tile.data">
      chargement...  
    </app-tile-competition>

    <app-tile-event [expanded]="tile.expanded" *ngIf="isEvent()" [event]="tile.data">
      chargement...  
    </app-tile-event>

    <app-tile-good-deals [expanded]="tile.expanded" *ngIf="isGoodDeals()" [goodDeals]="tile.data">
      chargement...
    </app-tile-good-deals>

    <app-tile-interest [expanded]="tile.expanded" *ngIf="isInterest()" [interest]="tile.data">
      chargement...
    </app-tile-interest>
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
  isInterest() {
    return this.tile.data instanceof Interest
  }

}
