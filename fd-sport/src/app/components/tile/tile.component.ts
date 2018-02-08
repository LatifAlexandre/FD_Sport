import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../../types/Tile.type';

@Component({
  selector: 'app-tile',
  template:`
  <mat-expansion-panel>

    <mat-expansion-panel-header expandedHeight="100px" collapsedHeight="100px">
     
      <mat-panel-title>
        <div class="title"> {{ value.title }} </div>
        <div class="date-lieu"> le {{ value.date | date:'shortDate' }} a {{ value.lieu }} </div>
      </mat-panel-title>
    </mat-expansion-panel-header>

    <p>This is the primary content of the panel.</p>

  </mat-expansion-panel>

  {{ date }}

  `,
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() value: Tile;

  constructor() { }

  ngOnInit() {
  }
}
