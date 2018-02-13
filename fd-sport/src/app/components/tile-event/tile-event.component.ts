import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../types/Event.class';
import * as _ from "lodash";

@Component({
  selector: 'app-tile-event',
  template:`
  <mat-expansion-panel [expanded]="expanded">

  <mat-expansion-panel-header collapsedHeight="80px" expandedHeight="80px" >

    <mat-panel-title>
      <div class="picture">
        <img [src]="event.pictureLink" alt="" class="header-picture">
      </div>
      <div class="info">
        <div class="title"> {{ event.name }} </div>
        <div class="date-place">
          le {{ event.date | date:'shortDate' }} à {{ event.location.name }}
        </div>
      </div>
    </mat-panel-title>
  </mat-expansion-panel-header>
  
  <div class="panel-body">

    <app-ticket-item-list [tickets]="event.tickets">
    </app-ticket-item-list>

    <app-product-item-list *ngFor="let actor of event.actors"
                           [products]="actor.products">
    </app-product-item-list>

  <button mat-raised-button class="more-info-btn" [routerLink]="['/event', event.id]">
    <i class="material-icons">find_in_page</i>
    Voir l'évenement
  </button>

  </div>

</mat-expansion-panel>

  `,
  styleUrls: ['./tile-event.component.scss']
})
export class TileEventComponent implements OnInit {

  @Input() event: Event;
  @Input() expanded: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

}
