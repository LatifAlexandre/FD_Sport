import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SandboxService } from '../../services/sandbox.service';
import { Ticket } from '../../types/Ticket.class';

@Component({
  selector: 'app-ticket-page',
  template: `
  <div class="content">
  
        <h2> {{ ticket.name }} </h2>
        
        <div class="header">
          <div class="picture-header">
            <div class="reduction">
              {{ ticket.price.reduction * 100 }} %
            </div>
            <img [src]="ticket.event.pictureLink" style='height: 100%; width: 100%; object-fit: contain'/> 
           
          </div>
        
          <div class="info-header">
            <div class="prices">
              <div class="initialPrice">
               {{ ticket.price.initialPrice }} €
              </div>  
              <div class="price">
                {{ ticket.price.getReducedPrice() }} €
              </div>
            </div>
  
            <div class="note">
              <i class="material-icons">star_rate</i>
              <i class="material-icons">star_rate</i>
              <i class="material-icons">star_rate</i>
              <i class="material-icons">star_rate</i>
              <i class="material-icons">star_rate</i>
            </div>
      
            <button mat-raised-button class="buy-btn"> 
              <i class="material-icons">add_shopping_cart</i>
              ajouter au panier
            </button>
  
          </div>
        </div>
        
  
        <div class="related-items">
          <h3> Related items </h3> 
          <app-ticket-item-list [tickets]="ticket.relatedTickets">
          </app-ticket-item-list>
  
          <app-product-item-list [products]="ticket.relatedProducts">
          </app-product-item-list>
        </div>
  
          
        <div class="comments">
          <h3> comments </h3>  
        </div>
  
        <div class="description">
          <h3> description </h3> 
  
          <p>
            {{ product.description }}
          </p>
        </div>
  
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
