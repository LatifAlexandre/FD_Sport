import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../types/Ticket.class';

@Component({
  selector: 'app-ticket-item',
  template: `
    <div class="left">
      {{ ticket.stock }} places restantes <br>
      à partir de {{ ticket.price.initialPrice }} €
    </div>
    <button mat-raised-button color="warn">
     Acheter  
    </button>
    
  `,
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

  @Input() ticket: Ticket;

  constructor() {
    console.log(this.ticket)
  }

  ngOnInit() {
  }

}
