import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../types/Ticket.class';

@Component({
  selector: 'app-ticket-item',
  template: `
    
    <div class="left">
      {{ ticket.event.name }} <br>
      {{ ticket.stock }} places restantes 
      à partir de {{ ticket.price.initialPrice }} €
    </div>
    <button mat-raised-button color="warn" [routerLink]="['/ticket', ticket.id]">
     Acheter  
    </button>
    
  `,
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

  @Input() ticket: Ticket;

  constructor() {
    
  }

  ngOnInit() {
    console.log(this.ticket)
  }

}
