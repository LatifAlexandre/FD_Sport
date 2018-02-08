import { Component } from '@angular/core';
import { Tile } from './types/Tile.type';

@Component({
  selector: 'app-root',
  template: `
    <app-tile *ngFor="let tile of tiles"
              [value]="tile">
    </app-tile>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tiles: Tile[] = [];

  constructor() {
    for (let i = 0; i < 10; i++){
      this.tiles.push({
        title: `title n${i}`,
        date: new Date(),
        lieu: `lieu n${i}`,
        visible: false
      });
    }
    
    console.log(this.tiles)

  }
}

