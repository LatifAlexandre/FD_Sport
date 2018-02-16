import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from './../../types/User.class';
import { Component, OnInit } from '@angular/core';
import { Club } from '../../types/Club.class';
import { Tile } from '../../types/Tile.class';
import { SandboxService } from '../../services/sandbox.service';

@Component({
  selector: 'app-my-clubs',
  template: `

    <h2>Bonjour {{ user?.username}} </h2>
  
    <h3> Mes clubs favoris </h3>
    
    <app-tile-list [tiles]="tiles">
    </app-tile-list>

    <h3> Ma position </h3>


    {{ position | json }}

  `,
  styleUrls: ['./my-clubs.component.scss']
})
export class MyClubsComponent implements OnInit {

  user: User = this.sb.userLogged;
  tiles: Tile[];
  position = this.sb.getPosition();

  constructor(private sb: SandboxService) {
  }

  ngOnInit() {
    
    this.tiles = this.user.favoriteClubs.map( club => new Tile(club));
  }

}
