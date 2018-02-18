import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../../types/Tile.class';

@Component({
  selector: 'app-tile-list',
  template:`
    <app-tile *ngFor="let tile of tiles" [tile]="tile">
      chargement...
    </app-tile>
  `,
  styleUrls: ['./tile-list.component.scss']
})
export class TileListComponent implements OnInit {

  @Input() tiles: Tile[];

  constructor() { }

  ngOnInit() {
  }

}
