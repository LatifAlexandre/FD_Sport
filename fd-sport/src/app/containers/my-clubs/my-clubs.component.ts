import { Component, OnInit } from '@angular/core';
import { Club } from '../../types/Club.class';
import { Tile } from '../../types/Tile.class';
import { SandboxService } from '../../services/sandbox.service';

@Component({
  selector: 'app-my-clubs',
  template: `
    <h2> Mes clubs favoris </h2>

    <app-tile-list [tiles]="tiles">
    </app-tile-list>
  `,
  styleUrls: ['./my-clubs.component.scss']
})
export class MyClubsComponent implements OnInit {

  tiles: Tile[] = [];

  constructor(sb: SandboxService) {
    sb.getMyClubs().forEach( (club) => {
      this.tiles.push(new Tile(club))
    })

  }

  ngOnInit() {
  }

}
