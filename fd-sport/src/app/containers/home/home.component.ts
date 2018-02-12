import { Component, OnInit } from '@angular/core';
import { Event } from '../../types/Event.class';
import { Club } from '../../types/Club.class';
import { Competition } from '../../types/Competition.class';
import { GoodDeals } from '../../types/GoodDeals.class';
import { Tile } from '../../types/Tile.class';
import { SandboxService } from '../../services/sandbox.service';

@Component({
  selector: 'app-home',
  template:`
    <div class="welcome">
      <h2>
        Bienvenue sur FD sports  
      </h2>
    </div>

    <div class="columns">
      <div *ngFor="let column of columns"
          [style.width.px]="columnWidth">
        <app-tile-list [tiles]="column">
        </app-tile-list>
      </div>
    </div>
    
    
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  columns: Tile[][] = [];
  columnNumber = 3;
  columnWidth = 1280 / this.columnNumber;

  constructor(private sb: SandboxService) {
    for (let i = 0; i < this.columnNumber; i++) {
      this.columns.push(
        this.sb.getMostRelevantTiles()
      )
    }
  }

  ngOnInit() {
  }

}
