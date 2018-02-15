import { Component, OnInit, OnDestroy } from '@angular/core';
import { SandboxService } from '../../services/sandbox.service';
import { GoodDeals } from '../../types/GoodDeals.class';
import { Observable } from 'rxjs/Observable';
import { Ticket } from '../../types/Ticket.class';
import { Product } from '../../types/Product.class';

@Component({
  selector: 'app-good-deals-page',
  template: `

    <div class="content">
        <h2> Bonnes affaires </h2>
    
        <h3> Les tickets pour les évènements </h3>
          
        <app-ticket-item-list [tickets]="goodDeals?.tickets">
        </app-ticket-item-list>
    
        <h3> Les produits </h3>
    
        <app-product-item-list [products]="goodDeals?.products">
        </app-product-item-list>

    </div>

  `,
  styleUrls: ['./good-deals-page.component.scss']
})
export class GoodDealsPageComponent implements OnInit, OnDestroy {

  goodDeals: GoodDeals;
  tickets: any;

  constructor(private sb: SandboxService) {
    
    this.sb.getGoodDeals().subscribe( ([ticketsObject, productsObject]) => {
      let tickets: Ticket[] = ticketsObject.map( ticket => Ticket.from(ticket));
      let products: Ticket[] = productsObject.map( product => Product.from(product));

      this.goodDeals = new GoodDeals(tickets, products);
      
    })

  }
    


  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
