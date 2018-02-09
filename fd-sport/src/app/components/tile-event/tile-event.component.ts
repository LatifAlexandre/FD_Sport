import { Component, OnInit } from '@angular/core';
import { Event } from '../../types/Event.class';
import * as _ from "lodash";

@Component({
  selector: 'app-tile-event',
  template:`
  <mat-expansion-panel>

  <mat-expansion-panel-header>

    <mat-panel-title>
      This is the expansion title
    </mat-panel-title>

    <mat-panel-description>

      This is a summary of the content
    
    </mat-panel-description>

  </mat-expansion-panel-header>

  <p>
    This is the primary content of the panel.
  </p>

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
