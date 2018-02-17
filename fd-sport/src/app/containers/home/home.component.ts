import { Component, OnInit } from '@angular/core';
import { Event } from '../../types/Event.class';
import { Club } from '../../types/Club.class';
import { Competition } from '../../types/Competition.class';
import { GoodDeals } from '../../types/GoodDeals.class';
import { Tile } from '../../types/Tile.class';
import { SandboxService } from '../../services/sandbox.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  template:`
    <div class="welcome">
      <h2>
        Bienvenue sur FD sports  
      </h2>
      <h3> Une sélection d'évènements sportifs et de produits dérivés </h3>
    </div>

    <div class="columns">
      <div *ngFor="let column of columns"
          [style.width.px]="columnWidth">
        <app-tile-list [tiles]="column">
          Chargement en cours...
        </app-tile-list>
      </div>
    </div>

    {{ columns }}
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  columns: Tile[][] = [];
  columnNumber = 3;
  columnWidth = 1280 / this.columnNumber;
  

  constructor(private sb: SandboxService) {

    this.sb.getMostReleventTiles().subscribe( tiles => {
      this.constructColumns(tiles);
    })    
  }

  ngOnInit() {
  }

  constructColumns(tiles) {
    
    for(let i = 0; i < this.columnNumber; i++) {
      this.columns.push([]);
    }  
    for (let i = 0; i < tiles.length; i++) {
      this.columns[i % this.columnNumber].push(tiles[i]);
    }
  }

}
