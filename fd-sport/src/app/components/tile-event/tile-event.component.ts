import { Component, OnInit } from '@angular/core';
import { Event } from '../../types/Event.class';
import * as _ from "lodash";

@Component({
  selector: 'app-tile-event',
  template:`
  <mat-expansion-panel expanded="true">

  <mat-expansion-panel-header collapsedHeight="80px" expandedHeight="80px" >

    <mat-panel-title>
      <div class="title"> {{ event.name }} </div>
      <div class="date-place">
        le {{ event.date | date:'shortDate' }} à {{ event.location.name }}
      </div>
    </mat-panel-title>
  </mat-expansion-panel-header>
  
  
  <app-ticket-item *ngFor="let ticket of event.tickets"
               [ticket]="ticket" >
  </app-ticket-item>

  <div class="products">
      <app-product-item *ngFor="let product of event.products"
                         [product]="product">
      </app-product-item>
  </div>

</mat-expansion-panel>

  `,
  styleUrls: ['./tile-event.component.scss']
})
export class TileEventComponent implements OnInit {

  event: Event = Event.fake();

  constructor() {
    console.log(this.event)
  }

  ngOnInit() {
  }

}
