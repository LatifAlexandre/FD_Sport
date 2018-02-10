import { Component, OnInit, Input } from '@angular/core';
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
  
  <div class="panel-body">
    <app-ticket-item [ticket]="event.ticket" >
    </app-ticket-item>
  
    <app-product-item-list [products]="event.products"
                           [width]="300">
    </app-product-item-list>

    <button mat-raised-button color="primary" class="more-info-btn">
      Voir l'évenement  
    </button>

  </div>

</mat-expansion-panel>

  `,
  styleUrls: ['./tile-event.component.scss']
})
export class TileEventComponent implements OnInit {

  @Input() event: Event;

  constructor() {
  }

  ngOnInit() {
  }

}
