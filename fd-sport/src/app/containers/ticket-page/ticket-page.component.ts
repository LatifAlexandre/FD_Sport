import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SandboxService } from '../../services/sandbox.service';
import { Ticket } from '../../types/Ticket.class';

@Component({
  selector: 'app-ticket-page',
  template: `
  <h2> <i class="material-icons">bookmark_border</i> {{ ticket.name }} </h2>
  
      <div class="picture-and-price">
  
        <img [src]="ticket.event.pictureLink" class="ticket-picture">
  
        <div class="right">
          <div class="prices">
            <div class="initial-price">
              {{ ticket.price.initialPrice }} €
            </div>
            <div class="price">
              {{ ticket.price.getReducedPrice() }} €
            </div>
          </div>
        </div>
  
      </div>
  
      <div class="messages">
        Il ne reste plus que {{ ticket.stock }} places ! <br>
      </div>
  
      <button mat-raised-button class="buy-btn"> 
        <i class="material-icons">add_shopping_cart</i>
        ajouter au panier </button>
      <div class="description">
        <h3>description</h3>
        <p>
          {{ ticket.description}}
        </p>
      </div>
  
      <h3> produits accociés </h3>
  
      <app-product-item-list [products]="ticket.relatedProducts">
      </app-product-item-list>
  
      <app-ticket-item-list [tickets]="ticket.relatedTickets">
      </app-ticket-item-list>
  
      <div class="comments">
        comentaires
      </div>
  
      <div class="questions">
        questions
      </div>

`,
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {

  id: string;
  private sub: any;

  ticket: Ticket;

  constructor(private route: ActivatedRoute,
              private sb: SandboxService) {
    this.ticket = sb.getTicket(this.id);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
