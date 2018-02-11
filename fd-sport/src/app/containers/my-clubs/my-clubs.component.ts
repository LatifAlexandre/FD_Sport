import { Component, OnInit } from '@angular/core';
import { Club } from '../../types/Club.class';
import { SandboxService } from '../../services/sandbox.service';

@Component({
  selector: 'app-my-clubs',
  template: `
    <h2> Mes clubs favoris </h2>

    <app-tile-club *ngFor="let club of clubs" [club]="club">
    </app-tile-club>
  `,
  styleUrls: ['./my-clubs.component.scss']
})
export class MyClubsComponent implements OnInit {

  clubs: Club[];

  constructor(sb: SandboxService) {
    this.clubs = sb.getMyClubs();
  }

  ngOnInit() {
  }

}
