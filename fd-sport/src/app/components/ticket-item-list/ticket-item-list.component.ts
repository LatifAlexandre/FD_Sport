import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-item-list',
  template: `
    <app-ticket-item *ngFor="let ticket of tickets"
                     [ticket]="ticket">
    </app-ticket-item>
  `,
  styleUrls: ['./ticket-item-list.component.scss']
})
export class TicketItemListComponent implements OnInit {

  @Input() tickets;

  constructor() { }

  ngOnInit() {
  }

}
