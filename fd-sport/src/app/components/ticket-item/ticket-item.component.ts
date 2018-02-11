import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../types/Ticket.class';

@Component({
  selector: 'app-ticket-item',
  template: `

  <div class="ticket" [routerLink]="['/ticket', ticket.id]">
  
  <i class="material-icons">bookmark_border</i>
  
  <div class="infos">
    <div class="name">
    {{ ticket.event.name }}
    </div>
    <div>
    plus que {{ ticket.stock }} places <br>
    à partir de <span class="price"> {{ ticket.price.initialPrice }} € </span>
    </div>
   
  </div>

  <button mat-icon-button class="btn-eye">
    <i class="material-icons">remove_red_eye</i>
  </button>

  </div>
    
    
    
  `,
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

  @Input() ticket: Ticket;

  constructor() {
    
  }

  ngOnInit() {
  }

}
