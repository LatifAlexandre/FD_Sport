import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../types/Ticket.class';

@Component({
  selector: 'app-ticket-item',
  template: `
  <div class="ticket" [routerLink]="['/ticket', ticket.id]">
  
  <img src="../../../assets/ticket-logo.png" class="ticket-icon">
  
  <div class="infos">
    <div class="name">
    {{ ticket?.name }}
    </div>
    <div>
    plus que {{ ticket?.stock }} places <br>
    à partir de <span class="price"> {{ ticket?.price?.initialPrice }} € </span>
    </div>
  </div>
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
