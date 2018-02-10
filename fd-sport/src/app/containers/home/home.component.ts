import { Component, OnInit } from '@angular/core';
import { Event } from '../../types/Event.class';
import { Club } from '../../types/Club.class';
import { Competition } from '../../types/Competition.class';
import { SandboxService } from '../../services/sandbox.service';

@Component({
  selector: 'app-home',
  template:`
    <app-tile-competition [competition]="competition">
    </app-tile-competition>

    <app-tile-event [event]="event">
    </app-tile-event>

    <app-tile-club [club]="club">
    </app-tile-club>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  event: Event;
  club: Club;
  competition: Competition;

  constructor(private sb: SandboxService) { }

  ngOnInit() {
    this.event = this.sb.getEvent();
    this.club = this.sb.getClub();
    this.competition = this.sb.getCompetition();
  }

}
